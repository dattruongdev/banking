export const revalidate = false;
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PresetSheet from "@/components/forms/preset-sheet";
import PresetTable from "@/components/presets/preset-table";
import { auth } from "@clerk/nextjs/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@radix-ui/react-tooltip";
import { CirclePlus, CreditCard } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";

import Image from "next/image";

export default async function Page({
  searchParams,
  params
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId, getToken } = auth();
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/presets/user/${userId}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const presets = await response.json();

  return (
    <ContentLayout title="My Presets">
      <div className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-2">
          All your presets are here!
        </div>
        <div className="text-lg text-zinc-500">
          Managing your own bank can never be easier!
        </div>

        <div className="grow w-full flex flex-col">
          <PresetTable />
        </div>
      </div>
    </ContentLayout>
  );
}
