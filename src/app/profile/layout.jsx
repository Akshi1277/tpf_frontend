"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.replace("/login");
    }
  }, [userInfo]);

  if (!userInfo) return null;

  return children;
}
