import { FaPencil } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  collectionHashid: string;
};

export default function EditCollectionButton({ collectionHashid }: Props) {
  let linkHref = `/dashboard/collections/${collectionHashid}/edit`;

  return (
    <BaseButton href={linkHref} className="bg-yellow-500 hover:bg-yellow-700 text-white">
      <FaPencil />
      <span>Edit this Collection</span>
    </BaseButton>
  );
}
