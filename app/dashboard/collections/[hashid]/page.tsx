import prisma from "db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { auth } from "@auth/auth";
import { decodeHashid } from "app/api/hashids";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ItemsList from "@components/dashboard/collections/items-list";
import AddNewItemButton from "@components/dashboard/collections/btn-add-item";

const getCollection = cache(async (hashid: string) => {
  const session = await auth();
  const id = decodeHashid(hashid);
  try {
    return await prisma.collection.findFirstOrThrow({
      where: {
        userId: session?.user.id,
        id,
      },
      include: {
        items: true,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      notFound();
    }
    throw err;
  }
});

type Props = {
  params: { hashid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const collection = await getCollection(params.hashid);

  return {
    title: `${collection?.name} Collection`,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const collection = await getCollection(params.hashid);

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>{collection.name} Collection</ContentHeader>
        <p>Type: {collection.type}</p>
      </section>

      <section className="mb-4 flex flex-row justify-start">
        <AddNewItemButton collectionId={collection.id} />
      </section>

      <section className="mb-4">
        <ItemsList items={collection.items} />
      </section>
    </DashboardPage>
  );
}
