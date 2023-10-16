import { Metadata } from "next";
import classNames from "classnames";
import { Kreon } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aleksandria",
  icons: "/favicon.ico",
};

const kreonFont = Kreon({
  subsets: ["latin"],
});

export default async function Page() {
  return (
    <div className="container">
      <main>
        <h1 className={classNames(kreonFont.className, "text-3xl")}>
          Aleksandria
        </h1>
        <p className="my-3 pb-9">
          <Link href="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </p>
      </main>
    </div>
  );
}
