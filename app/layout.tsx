import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aleksandria",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
