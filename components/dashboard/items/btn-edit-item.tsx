import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  itemHashid: string;
};

export default function EditItemButton({ itemHashid }: Props) {
  let linkHref = `/dashboard/items/${itemHashid}/edit`;

  return (
    <Link href={linkHref}>
      <BaseButton className="bg-yellow-500 hover:bg-yellow-700 text-white">
        <FaPencil />
        <span>Edit this item</span>
      </BaseButton>
    </Link>
  );
}
