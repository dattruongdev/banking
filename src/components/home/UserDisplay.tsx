"use client";
import React from "react";
import Balance from "../balance";
import { useSession } from "@clerk/nextjs";

function UserDisplay() {
  const { session, isSignedIn } = useSession();
  return (
    <div className="flex justify-between w-full bg-green-500 rounded-lg p-3 text-white">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-lg">Total balance</p>
        <Balance size="3xl" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="text-white text-lg font-medium">Account No.</div>
        <div className="bg-zinc-50/30 rounded-md flex flex-col justify-center items-center my-auto py-2 px-3">
          <p>{session?.user.id}</p>
          <p className="text-xl font-medium"></p>
        </div>
      </div>
    </div>
  );
}

export default UserDisplay;
