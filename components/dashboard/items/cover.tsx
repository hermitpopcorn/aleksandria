import { Item } from "@prisma/client";

type Props = {
  item: Item;
};

export default function ItemCover({ item }: Props) {
  return (
    <>
      {item.cover ? (
        <div className="grow flex flex-row justify-center p-4">
          <img
            src={item.cover}
            className="max-w-md max-h-screen rounded-xl"
            alt="Cover image"
          />
        </div>
      ) : null}
    </>
  );
}
