import { useAppAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export type Transaction = {
  id?: string;
  amount?: number;
  date?: Date;
  userid?: string;
  payee?: Payee;
  category?: Category;
};

export type Category = {
  id: string;
  name: string;
};

export type Payee = {
  id?: string;
  email?: string;
  fullname?: string;
  transaction?: Transaction;
};

export function useGetTransactions() {
  const userinfo = useAppAuth();
  const token = userinfo?.sessionToken;
  const userId = userinfo?.session?.user?.id;
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async function () {
      if (!token || !userId) {
        throw new Error("You are not authenticated");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Can't fetch transactions from server");
      }

      const data: Transaction[] = await response.json();
      console.log(data);

      return data;
    }
  });

  return query;
}
