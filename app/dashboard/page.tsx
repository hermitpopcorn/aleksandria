"use client";

import SidebarUserInfo from "@components/sidebar-user-info";
import { useSession } from "next-auth/react";

export default function Page() {
  useSession({
    required: true,
  });

  return (
    <div>
      <aside>
        <p>(sidebar)</p>
        <SidebarUserInfo />
      </aside>
      <main>
        <p>(content)</p>
      </main>
    </div>
  );
}
