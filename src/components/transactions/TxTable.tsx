"use client";

import React from "react";
import TransactionSheet from "../forms/transaction-sheet";
import {
  Transaction,
  useGetTransactions
} from "@/features/transactions/use-get-transactions";
import { columns, TransactionRow } from "@/app/(main)/tx-history/columns";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/app/(main)/tx-history/data-table";

function TxTable() {
  const { data, isLoading, isError } = useGetTransactions();
  return (
    <div>
      <>
        {isLoading && !data ? (
          <div>
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <TransactionSheet />
            <DataTable
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

export default TxTable;
