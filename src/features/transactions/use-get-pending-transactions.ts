import { useAppAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "./use-get-transactions";

export type Payee = {
  id?: string;
  email?: string;
  fullname?: string;
  transaction?: Transaction;
};

export function useGetPendingTransactions() {
  const userinfo = useAppAuth();
  const token = userinfo?.sessionToken;
  const userId = userinfo?.session?.user?.id;
  const query = useQuery({
    queryKey: ["pending-transactions"],
    queryFn: async function () {
      if (!token || !userId) {
        throw new Error("You are not authenticated");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/pending/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Can't fetch transactions from server");
      }

      const data = await response.json();

      return data.map(
        (tx: any): Transaction => ({
          id: tx.id,
          amount: tx.amount,
          payeeName: tx.payee.fullname,
          status: tx.status,
          payeeId: tx.payee.id,
          date: tx.date,
          userid: tx.user_id
        })
      );
    }
  });

  return query;
}
