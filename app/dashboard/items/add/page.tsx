import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Metadata } from "next";
import ItemForm from "../form";
import { getCollections, postAddItem } from "../actions";

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
        <ItemForm
          collections={collections}
          selectedCollectionHashid={searchParams?.collection as string}
          action={postAddItem}
        />
      </section>
    </DashboardPage>
  );
}
