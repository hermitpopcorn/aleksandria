import Link from "next/link";
import { FaChevronUp } from "react-icons/fa6";

type Props = {
  collectionHashid: string;
};

export default function ReturnToCollectionButton({ collectionHashid }: Props) {
  let linkHref = `/dashboard/collections/${collectionHashid}`;

  return (
    <Link href={linkHref}>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2">
        <FaChevronUp />
        <span>Return to Collection</span>
      </button>
    </Link>
  );
}
