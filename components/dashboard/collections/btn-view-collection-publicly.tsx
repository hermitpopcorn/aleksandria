import { FaEye } from "react-icons/fa6";
import BaseButton from "@components/dashboard/base-button";

type Props = {
  collectionHashid: string;
};

export default function ViewCollectionPubliclyButton({ collectionHashid }: Props) {
  let linkHref = `/collections/${collectionHashid}`;

  return (
    <BaseButton
      href={linkHref}
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      <FaEye />
      <span>View public page</span>
    </BaseButton>
  );
}
