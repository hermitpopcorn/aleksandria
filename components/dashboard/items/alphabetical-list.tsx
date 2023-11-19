import { Item } from "@prisma/client";
import AlphabeticalItemsListItem from "./alphabetical-list-item";
import AlphabeticalItemsListShelfLetter from "./alphabetical-list-shelf-letter";

type Props = {
  items: Array<Item>;
};

type Catalogue = Map<string, Array<Item>>;

export default async function AlphabeticalItemsList({ items }: Props) {
  if (items.length < 1) {
    return <p>No items found.</p>;
  }

  return <ol>{renderAlphabeticalList(items)}</ol>;
}

function renderAlphabeticalList(items: Array<Item>): Array<JSX.Element> {
  const cataloguedItems = catalogueItems(items);

  let elements: Array<JSX.Element> = [];
  cataloguedItems.forEach((catalogueItems, firstLetter) => {
    elements.push(
      <li>
        <AlphabeticalItemsListShelfLetter>{firstLetter}</AlphabeticalItemsListShelfLetter>
        <ol className="flex flex-row flex-wrap gap-4 mb-4">
          {renderAlphabeticalListItems(catalogueItems)}
        </ol>
      </li>,
    );
  });

  return elements;
}

function catalogueItems(items: Array<Item>): Catalogue {
  let catalogue: Catalogue = new Map();

  items.forEach((item) => {
    const key = getCatalogueKeyFromTitle(item.titleAlphabetic ?? item.title);

    if (catalogue.has(key)) {
      catalogue.get(key)!.push(item);
    } else {
      catalogue.set(key, [item]);
    }
  });

  return catalogue;
}

function getCatalogueKeyFromTitle(title: string): string {
  const first = title.charAt(0);
  if (!first.match(/[a-z]/i)) {
    return "#";
  }

  return first.toUpperCase();
}

function renderAlphabeticalListItems(items: Array<Item>): Array<JSX.Element> {
  return items.map((item) => (
    <li>
      <AlphabeticalItemsListItem item={item} />
    </li>
  ));
}
