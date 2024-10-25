import { ContentLayout } from "@/components/admin-panel/content-layout";
import PendingTable from "@/components/requests/PendingTable";

export default function Page() {
  return (
    <ContentLayout title="Pending Requests">
      <div>
        <PendingTable />
      </div>
    </ContentLayout>
  );
}
