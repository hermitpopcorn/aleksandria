import Link from "next/link";

const links = [{ href: "/dashboard/collections", text: "Collections" }];

const linkElements = links.map((i) => (
  <Link href={i.href} key={i.href}>
    <li className="px-4 py-2 hover:bg-gray-200">{i.text}</li>
  </Link>
));

export default function SiderbarLinks() {
  return (
    <nav>
      <ul>{linkElements}</ul>
    </nav>
  );
}
