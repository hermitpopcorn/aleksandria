import classNames from "classnames";
import { Kreon } from "next/font/google";
import OpenButton from "./open-button";
import { auth } from "@auth/auth";

const kreonFont = Kreon({
  subsets: ["latin"],
});

export default async function Page() {
  const session = await auth();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <main className="py-20 flex flex-col justify-center items-center">
        <h1 className={classNames(kreonFont.className, "text-3xl")}>Aleksandria</h1>
        <div className="my-3 pb-9">
          <OpenButton session={session} />
        </div>
      </main>
    </div>
  );
}
