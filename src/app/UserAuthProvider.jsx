"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "@/utils/slices/authApiSlice";
import {
  setCredentials,
  logout,
  setAuthChecked,
} from "@/utils/slices/authSlice";
import GlobalLoader from "@/components/GlobalLoader";
import { useRouter, usePathname } from "next/navigation";
import { useGetOrganizationMeQuery } from "@/utils/slices/organizationApiSlice";

export default function UserAuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const authChecked = useSelector((state) => state.auth.authChecked);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const {
    data: userData,
    error: userError,
    isFetching: userFetching,
  } = useGetMeQuery();

  const {
    data: orgData,
    error: orgError,
    isFetching: orgFetching,
  } = useGetOrganizationMeQuery();


  /* ---------------------------
     EXISTING AUTH CHECK (UNCHANGED)
  ---------------------------- */
  useEffect(() => {
    if (userFetching || orgFetching) return;

    // ✅ If user session exists
    if (userData?.data) {
      dispatch(
        setCredentials({
          ...userData.data,
          type: "user",
        })
      );
    }

    // ✅ If organization session exists
    else if (orgData?.data) {
      dispatch(
        setCredentials({
          ...orgData.data,
          type: "organization",
        })
      );
    }

    // ❌ No valid session
    else if (
      userError?.status === 401 &&
      orgError?.status === 401
    ) {
      dispatch(logout());
    }

    dispatch(setAuthChecked());

  }, [
    userFetching,
    orgFetching,
    userData,
    orgData,
    userError,
    orgError,
    dispatch,
  ]);


  /* ---------------------------
     PROFILE COMPLETION (USER ONLY)
  ---------------------------- */
  useEffect(() => {
    if (authChecked && userInfo && userInfo.type === "user") {
      const isIncomplete = !userInfo.fullName || !userInfo.email;
      const isSignupPage = pathname === "/signup";

      if (isIncomplete && !isSignupPage) {
        router.push("/signup");
      }
    }
  }, [authChecked, userInfo, pathname, router]);

  /* ---------------------------
     ROLE-BASED ROUTE PROTECTION
  ---------------------------- */
  useEffect(() => {
    if (!authChecked) return;

    // Define route groups
    const organizationRoutes = [
      // "/organization",
      "/org-dashboard",
      "/dashboard",
    ];

    const userRoutes = [
      "/profile",
      "/wishlist",
      "/donate",
      "/my-applications",
    ];

    const isOrgRoute = organizationRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isUserRoute = userRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // 🔒 Protect organization routes
    if (isOrgRoute) {
      if (!userInfo || userInfo.type !== "organization") {
        router.push("/");
      }
    }

    // 🔒 Protect user routes
    if (isUserRoute) {
      if (!userInfo || userInfo.type !== "user") {
        router.push("/");
      }
    }

  }, [authChecked, pathname, userInfo, router]);

  /* ---------------------------
     BLOCK APP UNTIL AUTH RESOLVED
  ---------------------------- */
  if (!authChecked) {
    return <GlobalLoader />;
  }

  return children;
}
