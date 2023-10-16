"use client";

import { useSession } from "next-auth/react";

export default function SidebarUserInfo() {
  const session = useSession();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return <p>Logged in as {session.data?.user?.email}</p>;
}
