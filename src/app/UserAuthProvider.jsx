'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "@/utils/slices/authApiSlice";
import { setCredentials, logout } from "@/utils/slices/authSlice";

export default function UserAuthProvider({ children }) {
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetMeQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setCredentials(data.data));
    }

    if (error?.status === 401) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  if (isFetching) return null;

  return children;
}
