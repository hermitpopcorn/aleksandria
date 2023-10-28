import Link from "next/link";
import { FaRegSquarePlus } from "react-icons/fa6";

export default function AddNewCollectionButton() {
  return (
    <Link href="/dashboard/collections/add">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2">
        <FaRegSquarePlus />
        <span>Add new Collection</span>
      </button>
    </Link>
  );
}
