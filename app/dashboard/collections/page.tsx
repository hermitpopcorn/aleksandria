import AddNewCollectionButton from "@components/dashboard/collections/btn-add-collection";
import CollectionsList from "@components/dashboard/collections/list";
import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Collections</ContentHeader>
      </section>

      <section className="mb-4">
        <CollectionsList />
      </section>

      <section className="mb-4 flex flex-row justify-center">
        <AddNewCollectionButton />
      </section>
    </DashboardPage>
  );
}
