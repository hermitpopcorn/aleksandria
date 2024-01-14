import prisma from "db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { decodeCollectionHashid } from "app/api/hashids";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AlphabeticalItemsList from "@components/dashboard/items/alphabetical-list";
import CollectionIcon from "@components/dashboard/collections/collection-icon";

const findCollection = cache(async (hashid: string) => {
  const id = decodeCollectionHashid(hashid);
  try {
    return await prisma.collection.findFirstOrThrow({
      where: {
        id,
        public: true,
      },
      include: {
        user: true,
        items: {
          orderBy: {
            titleAlphabetic: "asc",
          },
        },
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
  params: { collectionHashid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const collection = await findCollection(params.collectionHashid);

  return {
    title: `${collection?.name} Collection`,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const collection = await findCollection(params.collectionHashid);

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>
          <div className="flex flex-row gap-2 items-center">
            <CollectionIcon type={collection.type} />
            <span>
              {collection.user.name}'s {collection.name} Collection
            </span>
          </div>
        </ContentHeader>
      </section>

      <section className="mb-4">
        <AlphabeticalItemsList
          baseUrl={`/collections/${params.collectionHashid}`}
          items={collection.items}
        />
      </section>
    </DashboardPage>
  );
}
