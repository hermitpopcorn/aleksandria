import { FaRegSquarePlus } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

export default function AddNewCollectionButton() {
  return (
    <BaseButton
      href="/dashboard/collections/add"
      className="bg-blue-500 hover:bg-blue-700 text-white"
    >
      <FaRegSquarePlus aria-hidden />
      <span>Add new Collection</span>
    </BaseButton>
  );
}
