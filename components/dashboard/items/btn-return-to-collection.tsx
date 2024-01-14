import { FaChevronUp } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  collectionHashid: string;
  baseUrl: string;
};

export default function ReturnToCollectionButton({ collectionHashid, baseUrl }: Props) {
  let linkHref = `${baseUrl}/collections/${collectionHashid}`;

  return (
    <BaseButton href={linkHref} className="bg-gray-500 hover:bg-gray-700 text-white">
      <FaChevronUp />
      <span>Return to Collection</span>
    </BaseButton>
  );
}
