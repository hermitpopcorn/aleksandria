import { encodeId } from "app/api/hashids";
import Link from "next/link";
import { FaRegSquarePlus } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

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
      <BaseButton className="bg-blue-500 hover:bg-blue-700 text-white">
        <FaRegSquarePlus />
        <span>Add new Item</span>
      </BaseButton>
    </Link>
  );
}
