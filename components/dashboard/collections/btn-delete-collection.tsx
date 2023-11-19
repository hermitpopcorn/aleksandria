"use client";

import { deleteCollection } from "app/dashboard/collections/actions";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";

type Props = {
  collectionHashid: string;
};

export default function DeleteCollectionButton({ collectionHashid }: Props) {
  const router = useRouter();

  const confirmDelete = function () {
    const c = confirm(
      "Are you sure? All items belonging to this collection will be deleted along with it!",
    );
    if (!c) {
      return;
    }

    deleteCollection(collectionHashid);
    router.replace("/dashboard/collections");
    router.refresh();
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2"
      onClick={confirmDelete}
    >
      <FaTrash />
      <span>Delete this Collection</span>
    </button>
  );
}
