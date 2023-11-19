import ContentHeader from "@components/dashboard/content-header";
import DashboardPage from "@components/dashboard/dashboard-page";
import { Metadata } from "next";
import CollectionForm from "../form";
import { postAddCollection } from "../actions";

export const metadata: Metadata = {
  title: "Add new collection",
};

export default function AddNewCollectionPage() {
  return (
    <DashboardPage>
      <section className="mb-4">
        <ContentHeader>Add new Collection</ContentHeader>
      </section>

      <section className="mb4">
        <CollectionForm action={postAddCollection} />
      </section>
    </DashboardPage>
  );
}
