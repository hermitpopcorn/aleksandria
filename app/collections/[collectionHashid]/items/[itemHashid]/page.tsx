import prisma from "db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { decodeItemHashid } from "app/api/hashids";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ItemDetailTable from "@components/dashboard/items/table-detail";
import ContentSubheader from "@components/dashboard/content-subheader";
import ReturnToCollectionButton from "@components/dashboard/items/btn-return-to-collection";

const findItem = cache(async (hashid: string) => {
  const id = decodeItemHashid(hashid);
  try {
    return await prisma.item.findFirstOrThrow({
      where: {
        id,
        collection: {
          public: true,
        },
      },
      include: {
        collection: true,
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
  params: { collectionHashid: string; itemHashid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const item = await findItem(params.itemHashid);

  return {
    title: `${item?.title} (${item?.collection.name})`,
  };
}

export default async function ItemDetailPage({ params }: Props) {
  const item = await findItem(params.itemHashid);

  return (
    <DashboardPage>
      <section className="mb-2 flex flex-row gap-2 items-center">
        <ReturnToCollectionButton baseUrl="" collectionHashid={params.collectionHashid} />
      </section>

      <section className="mb-4">
        <ContentHeader>{item.title}</ContentHeader>
        {item.titleAlphabetic && item.titleAlphabetic != item.title ? (
          <ContentSubheader>{item.titleAlphabetic}</ContentSubheader>
        ) : null}
      </section>

      <section className="mb-4 flex gap-4 flex-col lg:flex-row-reverse lg:justify-end">
        {item.cover ? (
          <div className="grow flex flex-row justify-center p-4">
            <img
              src={item.cover}
              className="max-w-md max-h-screen rounded-xl"
              alt="Cover image"
            />
          </div>
        ) : null}
        <ItemDetailTable item={item} />
      </section>
    </DashboardPage>
  );
}
