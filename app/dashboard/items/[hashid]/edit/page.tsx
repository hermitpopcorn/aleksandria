import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Metadata } from "next";
import ItemForm from "../../form";
import { editExistingItem, getCollections } from "../../actions";
import { cache } from "react";
import { auth } from "@auth/auth";
import { decodeItemHashid } from "app/api/hashids";
import prisma from "db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

const findItem = cache(async (hashid: string) => {
  const session = await auth();
  const id = decodeItemHashid(hashid);
  try {
    return await prisma.item.findFirstOrThrow({
      where: {
        collection: {
          userId: session!.user.id,
        },
        id,
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
    title: `Edit Item ${item?.title}`,
  };
}

export default async function AddNewItemPage({ params }: Props) {
  const item = await findItem(params.hashid);
  const collections = await getCollections();

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Edit Item</ContentHeader>
      </section>

      <section className="mb4">
        <ItemForm action={editExistingItem} item={item} collections={collections} />
      </section>
    </DashboardPage>
  );
}
