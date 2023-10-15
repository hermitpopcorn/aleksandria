import { Metadata } from "next";
import HomePage from "./home-page";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Welcome to Next.js",
  icons: "/favicon.ico",
};

export default async function Page() {
  return <HomePage />;
}
