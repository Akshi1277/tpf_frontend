"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function ProfileLayout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);

  // Auth is GUARANTEED resolved by UserAuthProvider
  if (!userInfo) {
    redirect("/login");
  }

  return children;
}
