import NextAuthProvider from "@auth/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  icons: "/favicon.ico",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
