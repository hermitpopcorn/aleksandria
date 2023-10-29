import { encodeId } from "app/api/hashids";
import Link from "next/link";
import { FaRegSquarePlus } from "react-icons/fa6";

type Props = {
  collectionId?: number;
};

export default function AddNewItemButton({ collectionId }: Props) {
  let linkHref = "/dashboard/items/add";
  if (collectionId) {
    linkHref += "?collection=" + encodeId(collectionId);
  }

  return (
    <Link href={linkHref}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2">
        <FaRegSquarePlus />
        <span>Add new Item</span>
      </button>
    </Link>
  );
}
