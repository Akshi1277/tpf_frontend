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

export default function UserAuthProvider({ children }) {
  const dispatch = useDispatch();
  const authChecked = useSelector((state) => state.auth.authChecked);

  const { data, error, isFetching } = useGetMeQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setCredentials(data.data));
    }

    if (error?.status === 401) {
      dispatch(logout());
    }

    if (!isFetching) {
      dispatch(setAuthChecked());
    }
  }, [data, error, isFetching, dispatch]);

  // 🔒 BLOCK ENTIRE APP UNTIL AUTH IS RESOLVED
  if (!authChecked) {
    return <GlobalLoader />;
  }

  return children;
}
