"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function OpenButton({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div className="flex flex-col gap-2">
        <p>Signed in as {session.user?.email}</p>
        <div className="flex place-content-center content-center gap-4">
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
