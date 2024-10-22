"use client";
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
import PresetForm from "./PresetForm";

type Props = {
  className?: string;
  triggerElement: JSX.Element;
};

export default function PresetSheet({ className, triggerElement }: Props) {
  return (
    <Sheet>
      <div className="h-full flex">
        <SheetTrigger className="self-center m-auto">
          {triggerElement}
        </SheetTrigger>
      </div>
      <SheetContent className="sm:w-100 px-3 h-full flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle>Create Preset</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <PresetForm />
      </SheetContent>
    </Sheet>
  );
}
