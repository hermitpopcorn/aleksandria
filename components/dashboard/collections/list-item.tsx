import { Collection } from "@prisma/client";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  collection: Collection;
};

export default async function CollectionsListItem({ collection }: Props) {
  return (
    <div className="border-2 p-4 mb-3 flex justify-between items-center">
      <h2 className="text-lg">{collection.name}</h2>
      <FaChevronRight />
    </div>
  );
}
