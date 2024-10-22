"use client";
import { Preset, useGetPresets } from "@/features/presets/use-get-presets";
import { CirclePlus, CreditCard, Loader2 } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/data-table";
import { columns, PresetRow } from "@/app/(main)/presets/columns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import Image from "next/image";
import PresetSheet from "../forms/preset-sheet";

function AddBtnNoPresets() {
  return (
    <div className="self-center text-center m-auto shadow-md bg-white w-[50%] pt-10 rounded-lg px-3">
      <div className="text-xl text-zinc-400 font-medium mb-3 text-center">
        Looks like you have no presets! Add now or will be automatically added
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <div className="relative inline-block m-auto group cursor-pointer ">
              <Image
                src="/creditcard.png"
                alt="creditcard"
                width={200}
                height={200}
                className="group-hover:-rotate-45 origin-center group-hover:-translate-x-1/4 group-hover:-translate-y-1/4  transition duration-300 cursor-pointer z-10 relative"
              />
              <CirclePlus
                className="absolute right-10 top-1/2 -translate-y-1/2 z-0 text-green-400"
                size={50}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="py-1 px-3 rounded-lg bg-black text-white">
              Add Preset
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function AddWithPresets() {
  return (
    <div className="bg-green-400 rounded-lg py-3 px-4  font-medium text-white flex items-center gap-1 mb-3 self-end cursor-pointer">
      Add Preset
      <span>
        <CreditCard />
      </span>
    </div>
  );
}

function PresetTable() {
  const { data, isLoading, isError } = useGetPresets();

  return (
    <>
      {isLoading || !data ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="self-end">
                <PresetSheet triggerElement={<AddWithPresets />} />
              </div>
              <DataTable
                filterCol="payeeName"
                columns={columns}
                data={data.map((item: Preset) => {
                  const row: PresetRow = {
                    id: item.id,
                    payeeName: item.payeeName,
                    payeeId: item.payeeId
                  };

                  return row;
                })}
              />
            </>
          ) : (
            <>
              <PresetSheet triggerElement={<AddBtnNoPresets />} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PresetTable;
