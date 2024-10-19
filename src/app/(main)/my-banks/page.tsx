import { ContentLayout } from "@/components/admin-panel/content-layout";
import BankSheet from "@/components/forms/bank-sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@radix-ui/react-tooltip";
import { CirclePlus, CreditCard } from "lucide-react";

import Image from "next/image";

const banks = [];

function AddBtnNoBank() {
  return (
    <button className="self-center text-center m-auto shadow-md bg-white w-[50%] pt-10 rounded-lg">
      <div className="text-xl text-zinc-400 font-medium mb-3">
        Looks like you have no bank!
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
            <p className="py-1 px-3 rounded-lg bg-black text-white">Add bank</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </button>
  );
}

function AddWithBanks() {
  return (
    <button className="bg-green-400 rounded-lg py-3 px-4  font-medium text-white flex items-center gap-1 mb-3 self-end">
      Add Bank
      <span>
        <CreditCard />
      </span>
    </button>
  );
}

export default function Page() {
  return (
    <ContentLayout title="My Banks">
      <div className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-2">All your banks are here!</div>
        <div className="text-lg text-zinc-500">
          Managing your own bank can never be easier!
        </div>

        <div className="grow w-full flex flex-col">
          {banks.length > 0 ? (
            <div>
              <BankSheet triggerElement={<AddWithBanks />} />
            </div>
          ) : (
            <BankSheet triggerElement={<AddBtnNoBank />} />
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
