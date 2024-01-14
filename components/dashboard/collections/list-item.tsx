import { Collection } from "@prisma/client";
import { encodeCollectionId } from "app/api/hashids";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { MdPublic, MdPublicOff } from "react-icons/md";
import CollectionIcon from "./collection-icon";

type Props = {
  collection: Collection;
};

export default async function CollectionsListItem({ collection }: Props) {
  return (
    <Link href={`/dashboard/collections/${encodeCollectionId(collection.id)}`}>
      <div className="border-2 p-4 mb-3 flex justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <h2 className="text-lg">{collection.name}</h2>
          {renderIcons(collection)}
        </div>
        <FaChevronRight aria-hidden />
      </div>
    </Link>
  );
}

function renderIcons(collection: Collection): JSX.Element {
  const icons: JSX.Element[] = [];

  icons.push(<CollectionIcon type={collection.type} key={icons.length} />);

  if (collection.public) {
    icons.push(<MdPublic aria-label="Public" title="Public" key={icons.length} />);
  } else {
    icons.push(<MdPublicOff aria-label="Private" title="Private" key={icons.length} />);
  }

  return <div className="flex flex-row gap-1">{icons.map((i) => i)}</div>;
}
