import { CollectionType } from "app/types";
import { FaBook, FaCircleQuestion, FaGamepad, FaRecordVinyl } from "react-icons/fa6";

type Props = {
  type: string | null | undefined;
};

export default function CollectionIcon({ type }: Props) {
  if (type === null || type === undefined) {
    return null;
  }
  if (type === CollectionType.Books) {
    return <FaBook aria-label="Books" title="Books" />;
  }
  if (type === CollectionType.Games) {
    return <FaGamepad aria-label="Games" title="Games" />;
  }
  if (type === CollectionType.Music) {
    return <FaRecordVinyl aria-label="Music" title="Music" />;
  }
  return <FaCircleQuestion aria-label="No type" title="No type" />;
}
