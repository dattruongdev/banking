"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { SheetClose, SheetFooter } from "../ui/sheet";
import { useRouter } from "next/navigation";
import { customRevalidate } from "@/lib/actions";
import { Preset, useGetPresets } from "@/features/presets/use-get-presets";
import { usePreset } from "@/hooks/use-preset";

function PresetForm({ revalidate }: any) {
  const [payeeName, setPayeeName] = useState<string>("");
  const [payeeId, setPayeeId] = useState<string>("");
  const { session, sessionToken } = useAppAuth();
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const { refetch } = useGetPresets();
  const { setPresets } = usePreset();

  async function fetchUser() {
    if (session && sessionToken) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/user/${payeeId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );

      const data = await response.json();
      setPayeeName(data?.fullname);
    }
  }

  async function createPreset(e: any) {
    e.preventDefault();
    if (session && sessionToken) {
      const userId = session.user.id;
      const rawFormData = {
        PayeeId: payeeId,
        PayerId: userId,
        PayeeName: payeeName
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/presets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`
          },
          body: JSON.stringify(rawFormData)
        }
      );
      if (!response.ok) {
        console.log(await response.json());
        return;
      }
      formRef.current?.reset();
      const { data } = await refetch();
      setPresets(data);
    }
  }

  return (
    <form
      ref={formRef}
      id="preset-form"
      onSubmit={createPreset}
      className="grid gap-4 py-4"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeId" className="text-left">
          Payee ID
        </Label>
        <Input
          onBlur={fetchUser}
          value={payeeId}
          onChange={(e) => setPayeeId(e.target.value)}
          id="payeeId"
          name="payeeId"
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeName" className="text-left whitespace-nowrap">
          Payee Name
        </Label>
        <Input
          id="payeeName"
          value={payeeName || ""}
          className="col-span-3"
          disabled
        />
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button disabled={!payeeName || !payeeId || pending} type="submit">
            {pending ? "Sending..." : "Create"}
          </Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
}

export default PresetForm;
