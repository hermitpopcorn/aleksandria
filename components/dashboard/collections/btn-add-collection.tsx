import Link from "next/link";
import { FaRegSquarePlus } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

export default function AddNewCollectionButton() {
  return (
    <Link href="/dashboard/collections/add">
      <BaseButton className="bg-blue-500 hover:bg-blue-700 text-white">
        <FaRegSquarePlus />
        <span>Add new Collection</span>
      </BaseButton>
    </Link>
  );
}
