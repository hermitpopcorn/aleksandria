import { Collection } from "@prisma/client";
import { encodeId } from "app/api/hashids";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  collection: Collection;
};

export default async function CollectionsListItem({ collection }: Props) {
  return (
    <Link href={`/dashboard/collections/${encodeId(collection.id)}`}>
      <div className="border-2 p-4 mb-3 flex justify-between items-center">
        <h2 className="text-lg">{collection.name}</h2>
        <FaChevronRight />
      </div>
    </Link>
  );
}
