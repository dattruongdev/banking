"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Transaction,
  useGetTransactions
} from "@/features/transactions/use-get-transactions";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, TransactionRow } from "./columns";
import TransactionSheet from "@/components/forms/transaction-sheet";

export default function Page() {
  const { data, isLoading, isError } = useGetTransactions();

  return (
    <ContentLayout title="Transaction History">
      <div className="flex flex-col mb-10">
        <div className="flex justify-between w-full bg-green-500 rounded-lg p-3 text-white">
          <div className="flex flex-col gap-2">
            <p className="font-medium ">Plaid checking</p>
            <p className="text-sm">Plaid Gold Standard 0% Interest Checking</p>
            <p>****** ******* ****** 0000</p>
          </div>

          <div className="h-[80%] bg-zinc-50/30 rounded-md flex flex-col justify-center items-center my-auto py-2 px-3">
            <p>Current balance</p>
            <p className="text-xl font-medium">$100.00</p>
          </div>
        </div>
      </div>

      {isLoading && !data ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <TransactionSheet />
          <DataTable
            columns={columns}
            data={data?.map((item: Transaction) => {
              const row: TransactionRow = {
                date: item.date,
                id: item.id,
                amount: item.amount,
                payee: item.payee?.fullname,
                category: item.category?.name
              };

              return row;
            })}
          />
        </>
      )}
    </ContentLayout>
  );
}
