import prisma from "db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { auth } from "@auth/auth";
import { decodeHashid } from "app/api/hashids";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ItemDetailTable from "@components/dashboard/items/table-detail";
import ContentSubheader from "@components/dashboard/content-subheader";

const findItem = cache(async (hashid: string) => {
  const session = await auth();
  const id = decodeHashid(hashid);
  try {
    return await prisma.item.findFirstOrThrow({
      where: {
        collection: {
          userId: session?.user.id,
        },
        id,
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
  params: { hashid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const item = await findItem(params.hashid);

  return {
    title: `${item?.title} (${item?.collection.name})`,
  };
}

export default async function ItemDetailPage({ params }: Props) {
  const item = await findItem(params.hashid);

  return (
    <DashboardPage>
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
