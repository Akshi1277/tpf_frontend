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

export default function UserAuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const authChecked = useSelector((state) => state.auth.authChecked);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, error, isFetching } = useGetMeQuery();

  useEffect(() => {
    if (isFetching) return;

    if (data?.data) {
      dispatch(setCredentials(data.data));
    } else if (error?.status === 401) {
      dispatch(logout());
    }

    // ✅ mark auth resolved only AFTER handling data/error
    dispatch(setAuthChecked());
  }, [isFetching, data, error, dispatch]);

  // Profile Completion Guard
  useEffect(() => {
    if (authChecked && userInfo) {
      const isIncomplete = !userInfo.fullName || !userInfo.email;
      const isSignupPage = pathname === "/signup";

      if (isIncomplete && !isSignupPage) {
        router.push("/signup");
      }
    }
  }, [authChecked, userInfo, pathname, router]);


  // 🔒 BLOCK ENTIRE APP UNTIL AUTH IS RESOLVED
  if (!authChecked) {
    return <GlobalLoader />;
  }

  return children;
}
