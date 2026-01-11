"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function ProfileLayout({ children }) {
 const { userInfo, authChecked } = useSelector((state) => state.auth);

// ⛔ Wait until auth state is resolved
if (!authChecked) return null;

if (!userInfo) {
  redirect("/login");
}

return children;

}
