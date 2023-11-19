import CollectionsListItem from "./list-item";
import { Collection } from "@prisma/client";

type Props = {
  collections: Array<Collection>;
};

export default async function CollectionsList({ collections }: Props) {
  if (collections.length < 1) {
    return <p>You don't have a collection yet.</p>;
  }

  return <ul>{renderCollectionListItems(collections)}</ul>;
}

function renderCollectionListItems(collections: Array<Collection>): Array<JSX.Element> {
  return collections.map((i) => (
    <li key={i.id}>
      <CollectionsListItem collection={i} />
    </li>
  ));
}
