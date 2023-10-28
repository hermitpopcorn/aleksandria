import { auth } from "@auth/auth";
import prisma from "db";
import { belongsToUser } from "prisma/helpers";
import CollectionsListItem from "./list-item";
import { Session } from "next-auth";

export default async function CollectionsList() {
  const session = await auth();
  const collectionList = await getCollectionList(session!);

  if (collectionList.length < 1) {
    return <p>You don't have a collection yet.</p>;
  }

  return <ul>{collectionList}</ul>;
}

async function getCollectionList(user: Session) {
  const collections = await prisma.collection.findMany({ ...belongsToUser(user) });
  return collections.map((i) => (
    <li key={i.id}>
      <CollectionsListItem collection={i} />
    </li>
  ));
}
