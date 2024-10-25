"use client";
import { useAppAuth } from "@/hooks/use-auth";
import { Preset } from "./use-get-presets";

export async function DeletePreset(presets: Preset[]) {
  useAppAuth();
  const payeeIds = presets.map((preset) => preset.payeeId);

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/presets/delete`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${sessionToken}`
  //     },
  //     body: JSON.stringify({
  //       payeeIds,
  //       payerId: session?.user.id
  //     })
  //   }
  // );

  // if (!response.ok) {
  //   console.log(response.status, response.statusText);
  // }
}
