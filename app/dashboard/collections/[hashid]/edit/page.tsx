import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Metadata } from "next";
import CollectionForm from "../../form";
import { editExistingCollection } from "../../actions";
import { cache } from "react";
import { auth } from "@auth/auth";
import { decodeCollectionHashid } from "app/api/hashids";
import prisma from "db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

const findCollection = cache(async (hashid: string) => {
  const session = await auth();
  const id = decodeCollectionHashid(hashid);
  try {
    return await prisma.collection.findFirstOrThrow({
      where: {
        userId: session?.user.id,
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
  const collection = await findCollection(params.hashid);

  return {
    title: `Edit Collection ${collection?.name}`,
  };
}

export default async function AddNewCollectionPage({ params }: Props) {
  const collection = await findCollection(params.hashid);

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Edit Collection</ContentHeader>
      </section>

      <section className="mb4">
        <CollectionForm action={editExistingCollection} collection={collection} />
      </section>
    </DashboardPage>
  );
}
