import { Item } from "@prisma/client";
import { encodeId } from "app/api/hashids";
import Link from "next/link";
import BlankCover from "./blank-cover";

type Props = {
  item: Item;
};

export default async function AlphabeticalItemsListItem({ item }: Props) {
  return (
    <Link href={`/dashboard/items/${encodeId(item.id)}`}>
      <article className="w-48 flex flex-col items-center justify-between p-2 gap-4">
        <div className="flex flex-col justify-center h-44 items-stretch">
          {item.cover ? (
            <img src={item.cover} className="max-h-full max-w-full rounded-md" />
          ) : (
            <BlankCover type={item.type} />
          )}
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-center max-h-12 line-clamp-2">
            {item.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
