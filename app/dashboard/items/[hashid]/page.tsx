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
        {item.titleAlphabetic ? (
          <ContentSubheader>{item.titleAlphabetic}</ContentSubheader>
        ) : null}
      </section>

      <section className="mb-4">
        <ItemDetailTable item={item} />
      </section>
    </DashboardPage>
  );
}