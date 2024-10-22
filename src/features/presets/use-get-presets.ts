import { useAppAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../transactions/use-get-transactions";
import { usePreset } from "@/hooks/use-preset";

export type Preset = {
  id?: string;
  payeeId?: string;
  payeeName?: string;
};

type Payee = {
  id?: string;
  email?: string;
  fullname?: string;
  transaction?: Transaction;
};

export function useGetPresets() {
  const { session, sessionToken } = useAppAuth();
  const { setPresets } = usePreset();

  const query = useQuery({
    queryKey: ["presets", session?.user.id],
    queryFn: async function () {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/presets/user/${session?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching preset. Status: ${response.status}`);
      }
      const data = await response.json();

      const presets = data.map(
        (preset: any): Preset => ({
          id: preset.id,
          payeeId: preset.payee_id,
          payeeName: preset.payee.fullname
        })
      ) as Preset[];
      setPresets(presets);
      return presets;
    },
    enabled: !!session && !!sessionToken
  });

  return query;
}
