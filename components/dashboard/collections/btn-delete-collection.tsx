"use client";

import { deleteCollection } from "app/dashboard/collections/actions";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  collectionHashid: string;
};

export default function DeleteCollectionButton({ collectionHashid }: Props) {
  const router = useRouter();

  const confirmDelete = async function () {
    const c = confirm(
      "Are you sure? All items belonging to this collection will be deleted along with it!",
    );
    if (!c) {
      return;
    }

    await deleteCollection(collectionHashid);
    router.replace("/dashboard/collections");
    router.refresh();
  };

  return (
    <BaseButton
      className="bg-red-500 hover:bg-red-700 text-white"
      onClick={confirmDelete}
    >
      <FaTrash />
      <span>Delete this Collection</span>
    </BaseButton>
  );
}
