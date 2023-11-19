"use client";

import { encodeId } from "app/api/hashids";
import { deleteItem } from "app/dashboard/items/actions";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";

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
    router.replace(`/dashboard/collections/${encodeId(item.collectionId)}`);
    router.refresh();
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2"
      onClick={confirmDelete}
    >
      <FaTrash />
      <span>Delete this item</span>
    </button>
  );
}
