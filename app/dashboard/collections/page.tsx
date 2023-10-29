import { auth } from "@auth/auth";
import prisma from "db";
import { Metadata } from "next";
import { Session } from "next-auth";
import { belongsToUser } from "prisma/helpers";
import AddNewCollectionButton from "@components/dashboard/collections/btn-add-collection";
import CollectionsList from "@components/dashboard/collections/list";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Collection } from "@prisma/client";

export const metadata: Metadata = {
  title: "Collections",
};

export default async function CollectionsPage() {
  const session = await auth();
  const collections = await getCollectionList(session!);

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Collections</ContentHeader>
      </section>

      <section className="mb-4">
        <CollectionsList collections={collections} />
      </section>

      <section className="mb-4 flex flex-row justify-center">
        <AddNewCollectionButton />
      </section>
    </DashboardPage>
  );
}

async function getCollectionList(user: Session): Promise<Array<Collection>> {
  return await prisma.collection.findMany({ ...belongsToUser(user) });
}
