"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({ children }) {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {children}
    </button>
  );
}
