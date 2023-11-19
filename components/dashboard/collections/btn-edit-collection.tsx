import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

type Props = {
  collectionHashid: string;
};

export default function EditCollectionButton({ collectionHashid }: Props) {
  let linkHref = `/dashboard/collections/${collectionHashid}/edit`;

  return (
    <Link href={linkHref}>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2">
        <FaPencil />
        <span>Edit this Collection</span>
      </button>
    </Link>
  );
}
