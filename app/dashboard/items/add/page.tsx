import { auth } from "@auth/auth";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { decodeHashid } from "app/api/hashids";
import prisma from "db";
import { Metadata } from "next";
import { cache } from "react";
import AddNewItemForm from "./form";

export const metadata: Metadata = {
  title: "Add new item",
};

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function AddNewCollectionPage({ searchParams }: Props) {
  const collections = await getCollections();

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Add new Item</ContentHeader>
      </section>

      <section className="mb4">
        <AddNewItemForm
          collections={collections}
          selectedCollectionHashid={searchParams?.collection as string}
        />
      </section>
    </DashboardPage>
  );
}

const getCollections = cache(async () => {
  const session = await auth();

  return await prisma.collection.findMany({
    where: {
      userId: session?.user.id,
    },
  });
});
