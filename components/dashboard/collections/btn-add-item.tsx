import { encodeCollectionId } from "app/api/hashids";
import { FaRegSquarePlus } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  collectionId?: number;
};

export default function AddNewItemButton({ collectionId }: Props) {
  let linkHref = "/dashboard/items/add";
  if (collectionId) {
    linkHref += "?collection=" + encodeCollectionId(collectionId);
  }

  return (
    <BaseButton href={linkHref} className="bg-blue-500 hover:bg-blue-700 text-white">
      <FaRegSquarePlus aria-hidden />
      <span>Add new Item</span>
    </BaseButton>
  );
}
