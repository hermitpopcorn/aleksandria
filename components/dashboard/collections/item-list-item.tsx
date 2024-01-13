import { Item } from "@prisma/client";
import { encodeItemId } from "app/api/hashids";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  item: Item;
};

export default async function ItemsListItem({ item }: Props) {
  return (
    <Link href={`/dashboard/items/${encodeItemId(item.id)}`}>
      <div className="border-2 p-4 mb-3 flex justify-between items-center">
        <h2 className="text-lg">{item.title}</h2>
        <FaChevronRight />
      </div>
    </Link>
  );
}
