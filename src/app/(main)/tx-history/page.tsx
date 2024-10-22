import { ContentLayout } from "@/components/admin-panel/content-layout";
import Balance from "@/components/balance";
import TxTable from "@/components/transactions/TxTable";

export default function Page() {
  return (
    <ContentLayout title="Transaction History">
      <div className="flex flex-col mb-10">
        <div className="flex justify-between w-full bg-green-500 rounded-lg p-3 text-white">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg">VIP account</p>
            <p className="text-sm">Gold Standard 0% Interest</p>
            <p>****** ******* ****** 0000</p>
          </div>

          <div className="h-[80%] bg-zinc-50/30 rounded-md flex flex-col justify-center items-center my-auto py-2 px-3">
            <p>Current balance</p>
            <div className="text-xl font-medium">
              <Balance />
            </div>
          </div>
        </div>
      </div>
      <TxTable />
    </ContentLayout>
  );
}
