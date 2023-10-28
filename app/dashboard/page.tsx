"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  useSession({
    required: true,
  });

  return <p>(content)</p>;
}
