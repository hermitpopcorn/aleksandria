import prisma from "db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { auth } from "@auth/auth";
import { decodeCollectionHashid } from "app/api/hashids";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AddNewItemButton from "@components/dashboard/collections/btn-add-item";
import AlphabeticalItemsList from "@components/dashboard/items/alphabetical-list";
import EditCollectionButton from "@components/dashboard/collections/btn-edit-collection";
import DeleteCollectionButton from "@components/dashboard/collections/btn-delete-collection";
import ViewCollectionPubliclyButton from "@components/dashboard/collections/btn-view-collection-publicly";
import CollectionIcon from "@components/dashboard/collections/collection-icon";

const findCollection = cache(async (hashid: string) => {
  const session = await auth();
  const id = decodeCollectionHashid(hashid);
  try {
    return await prisma.collection.findFirstOrThrow({
      where: {
        userId: session?.user.id,
        id,
      },
      include: {
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
  params: { hashid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
  const collection = await findCollection(params.hashid);

  return {
    title: `${collection?.name} Collection`,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const collection = await findCollection(params.hashid);

  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>
          <div className="flex flex-row gap-2 items-center">
            <CollectionIcon type={collection.type} />
            <span>{collection.name} Collection</span>
          </div>
        </ContentHeader>
        <p>
          Type: <span className="capitalize">{collection.type}</span>
        </p>
      </section>

      <section className="mb-4 flex flex-row justify-start gap-2">
        <AddNewItemButton collectionId={collection.id} />
        <EditCollectionButton collectionHashid={params.hashid} />
        {collection.public ? (
          <ViewCollectionPubliclyButton collectionHashid={params.hashid} />
        ) : null}
        <DeleteCollectionButton collectionHashid={params.hashid} />
      </section>

      <section className="mb-4">
        <AlphabeticalItemsList baseUrl="/dashboard" items={collection.items} />
      </section>
    </DashboardPage>
  );
}
