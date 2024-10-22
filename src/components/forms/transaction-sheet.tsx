import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TransactionForm from "./TransactionForm";

export default function TransactionSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-green-400 rounded-lg py-3 px-4  font-medium text-white flex items-center gap-1 mb-3 self-end">
          Add Transaction
        </button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <TransactionForm />
      </SheetContent>
    </Sheet>
  );
}
