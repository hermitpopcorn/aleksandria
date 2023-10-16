"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function LoginButton({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div className="flex flex-col gap-2">
        <p>Signed in as {session.user?.email}</p>
        <p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <p>Not signed in</p>
      <p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
