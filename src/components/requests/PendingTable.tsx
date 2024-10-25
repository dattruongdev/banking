"use client";

import React from "react";
import { Transaction } from "@/features/transactions/use-get-transactions";
import { TransactionRow } from "@/app/(main)/tx-history/columns";
import { Loader2 } from "lucide-react";
import { columns } from "@/app/(main)/requests/pending/column";
import { DataTable } from "@/app/(main)/requests/pending/data-table";
import { useAppAuth } from "@/hooks/use-auth";
import { useGetPendingTransactions } from "@/features/transactions/use-get-pending-transactions";

function PendingTable() {
  const { data, isLoading, isError, refetch } = useGetPendingTransactions();
  const { session, sessionToken } = useAppAuth();

  async function CancelTransactions(transactions: Transaction[]) {
    const transactionIds = transactions.map((transaction) => transaction.id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/cancel/user/${session?.user.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          txIds: transactionIds
        })
      }
    );

    if (!response.ok) {
      return console.log(response.status, response.statusText);
    }

    refetch();
  }

  async function ApproveTransactions(transactions: Transaction[]) {
    const transactionIds = transactions.map((transaction) => transaction.id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/approve/user/${session?.user.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          txIds: transactionIds
        })
      }
    );

    if (!response.ok) {
      console.log(response.status, response.statusText);
      return;
    }

    refetch();
  }

  return (
    <div>
      <>
        {isLoading && !data ? (
          <div>
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <DataTable
              cancelHandler={CancelTransactions}
              approveHandler={ApproveTransactions}
              filterCol="payee"
              columns={columns}
              data={data?.map((item: Transaction) => {
                const row: TransactionRow = {
                  date: item.date,
                  id: item.id,
                  status: item.status,
                  amount: item.amount,
                  payee: item.payeeName,
                  payeeId: item.payeeId
                };

                return row;
              })}
            />
          </>
        )}
      </>
    </div>
  );
}

export default PendingTable;
