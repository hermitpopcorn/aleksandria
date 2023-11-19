import { Item } from "@prisma/client";
import ItemsListItem from "./item-list-item";

type Props = {
  items: Array<Item>;
};

export default async function ItemsList({ items }: Props) {
  if (items.length < 1) {
    return <p>This collection has no items added yet.</p>;
  }

  return <ul>{renderItemsListItems(items)}</ul>;
}

function renderItemsListItems(collections: Array<Item>): Array<JSX.Element> {
  return collections.map((i) => (
    <li key={i.id}>
      <ItemsListItem item={i} />
    </li>
  ));
}
