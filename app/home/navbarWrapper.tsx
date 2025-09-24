"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/account/dashboard");

  if (isDashboard) return null; 

  return <Navbar />;
}
