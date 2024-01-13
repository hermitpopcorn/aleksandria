import NextAuthProvider from "@auth/provider";
import Sidebar from "@components/dashboard/sidebar/sidebar";
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
        <body>
          <div className="min-h-screen flex flex-row">
            <aside className="w-2/12 h-screen overflow-clip sticky top-0">
              <Sidebar />
            </aside>
            <main className="w-full">{children}</main>
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
