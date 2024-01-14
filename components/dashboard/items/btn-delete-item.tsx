"use client";

import { encodeCollectionId } from "app/api/hashids";
import { deleteItem } from "app/dashboard/items/actions";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  itemHashid: string;
};

export default function DeleteItemButton({ itemHashid }: Props) {
  const router = useRouter();

  const confirmDelete = async function () {
    const c = confirm("Are you sure?");
    if (!c) {
      return;
    }

    const item = await deleteItem(itemHashid);
    router.replace(`/dashboard/collections/${encodeCollectionId(item.collectionId)}`);
    router.refresh();
  };

  return (
    <BaseButton
      className="bg-red-500 hover:bg-red-700 text-white"
      onClick={confirmDelete}
    >
      <FaTrash aria-hidden />
      <span>Delete this item</span>
    </BaseButton>
  );
}
