import { Kreon } from "next/font/google";
import classNames from "classnames";
import SidebarUserInfo from "./user-info";
import SiderbarLinks from "./nav-links";

const kreonFont = Kreon({
  subsets: ["latin"],
});

export default function Sidebar() {
  return (
    <div className="py-4 bg-gray-100 w-full h-full flex flex-col place-content-between">
      <div>
        <header className="px-4 border-b-2 py-2 mb-4">
          <h1 className={classNames(kreonFont.className, "text-2xl")}>Aleksandria</h1>
        </header>

        <SiderbarLinks />
      </div>

      <div>
        <SidebarUserInfo />
      </div>
    </div>
  );
}
