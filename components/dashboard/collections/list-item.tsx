import { Collection } from "@prisma/client";
import { encodeId } from "app/api/hashids";
import { CollectionType } from "app/types";
import Link from "next/link";
import { FaBook, FaChevronRight } from "react-icons/fa6";
import { MdPublic, MdPublicOff } from "react-icons/md";

type Props = {
  collection: Collection;
};

export default async function CollectionsListItem({ collection }: Props) {
  return (
    <Link href={`/dashboard/collections/${encodeId(collection.id)}`}>
      <div className="border-2 p-4 mb-3 flex justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <h2 className="text-lg">{collection.name}</h2>
          {renderIcons(collection)}
        </div>
        <FaChevronRight />
      </div>
    </Link>
  );
}

function renderIcons(collection: Collection): JSX.Element {
  const icons: JSX.Element[] = [];

  if (collection.type === CollectionType.Book) {
    icons.push(<FaBook aria-label="Books" title="Books" />);
  }

  if (collection.public) {
    icons.push(<MdPublic aria-label="Public" title="Public" />);
  } else {
    icons.push(<MdPublicOff aria-label="Private" title="Private" />);
  }

  return <div className="flex flex-row gap-1">{icons.map((i) => i)}</div>;
}
