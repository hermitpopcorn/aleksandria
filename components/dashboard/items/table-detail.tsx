import { ItemWithCollection } from "prisma/types";

type Props = {
  item: ItemWithCollection;
};

export default function ItemDetailTable({ item }: Props) {
  return (
    <article className="w-full lg:w-1/2 px-3 mb-6">
      <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="p-2">Collection</td>
            <td className="p-2">{item.collection.name}</td>
          </tr>
          {item.note ? (
            <tr>
              <td className="p-2">Note</td>
              <td className="p-2">{item.note}</td>
            </tr>
          ) : null}
          {item.copies !== 1 ? (
            <tr>
              <td className="p-2">Copies</td>
              <td className="p-2">{item.copies}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </article>
  );
}
