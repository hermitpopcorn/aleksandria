import { Metadata } from "next";
import LoginButton from "./login-btn";
import { auth } from "@auth/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Aleksandria",
  icons: "/favicon.ico",
};

export default async function Page() {
  const session = await auth();
  return (
    <article className="p-4">
      <LoginButton session={session} />
    </article>
  );
}
