"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { SheetClose, SheetFooter } from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Preset } from "@/features/presets/use-get-presets";
import { z } from "zod";
import { usePreset } from "@/hooks/use-preset";
import { useBalance } from "@/hooks/use-balance";
import { useGetTransactions } from "@/features/transactions/use-get-transactions";

function TransactionForm() {
  const [payeeName, setPayeeName] = useState<string>("");
  const [payeeId, setPayeeId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { session, sessionToken } = useAppAuth();
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { presets } = usePreset();
  const { setBalance } = useBalance();
  const { refetch } = useGetTransactions();

  async function fetchUser() {
    if (session && sessionToken) {
      if (presets && presets.length > 0) {
        return;
      }
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

  async function createTransaction(e: any) {
    e.preventDefault();
    if (session && sessionToken) {
      const userId = session.user.id;
      let formschema = z.object({
        Amount: z.coerce.number(),
        PayeeId: z.string().min(10),
        PayerId: z.string().min(10)
      });

      const rawFormData = {
        Amount: amount,
        PayeeId: payeeId,
        PayerId: userId
      };
      console.log(rawFormData);

      let parseResult = formschema.safeParse(rawFormData);
      if (!parseResult.success) {
        console.log(parseResult.error);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/user/${userId}`,
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
      setBalance(Number(amount));
      refetch();
    }
  }

  return (
    <form
      ref={formRef}
      id="preset-form"
      onSubmit={createTransaction}
      className="grid gap-4 py-4"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeId" className="text-left">
          Preset
        </Label>

        {presets && presets.length > 0 ? (
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              const index = Number(value);
              setPayeeId(presets[index].payeeId + "");
              setPayeeName(presets[index].payeeName + "");
              setSelectedValue(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {presets?.map((preset, index) => (
                  <SelectItem value={"" + index}>
                    <div className="flex justify-between items-center">
                      <div>{preset.payeeName}</div>
                      <div className="ml-3 text-red-500">{preset.payeeId}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : null}
      </div>
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
          value={payeeName}
          onChange={(e) => setPayeeName(e.target.value)}
          className="col-span-3"
          disabled
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeName" className="text-left whitespace-nowrap">
          Amount
        </Label>
        <Input
          id="amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            const parsedValue = Number(value);

            // Check if the parsed value is NaN or not a valid number
            if (isNaN(parsedValue) || value.trim() === "") {
              console.log("Invalid input, resetting amount to 0");
              setAmount(0 + "");
            } else {
              setAmount(parsedValue + "");
            }
          }}
          className="col-span-3"
          disabled={!payeeId || !payeeName}
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

export default TransactionForm;
