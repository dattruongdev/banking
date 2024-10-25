"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { SheetClose, SheetFooter } from "../ui/sheet";
import CreatableSelect from "react-select/creatable";

import {
  SubmitHandler,
  useForm,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  Control
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preset } from "@/features/presets/use-get-presets";
import { z } from "zod";
import { usePreset } from "@/hooks/use-preset";
import { useBalance } from "@/hooks/use-balance";
import { useGetTransactions } from "@/features/transactions/use-get-transactions";

const StatusEnum = z.enum(["PENDING", "COMPLETED"]);

const formSchema = z
  .object({
    amount: z.coerce.number().min(10_000),
    payeeId: z.string(),
    payeeName: z.string().min(10)
  })
  .required();

type FormFields = z.infer<typeof formSchema>;

function TransactionForm() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

  const { session, sessionToken } = useAppAuth();
  const { pending } = useFormStatus();
  const { presets, setPresets } = usePreset();
  const { setBalance } = useBalance();
  const { refetch } = useGetTransactions();
  const payeeId = watch("payeeId");
  const payeeName = watch("payeeName");
  const amount = watch("amount");

  async function fetchUser() {
    if (session && sessionToken) {
      if (presets && presets.length > 0 && !payeeId) {
        const preset = presets.filter((p) => p.payeeId === payeeId);
        const name = preset[0]?.payeeName as string;
        setValue("payeeName", name);
        localStorage?.setItem("tx-payeename", name);
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
      setValue("payeeName", data?.fullname);
      localStorage?.setItem("tx-payeename", data?.fullname);
    }
  }

  async function createPreset() {
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
      const { data } = await refetch();
      setPresets(data);
    }
  }

  async function createTransaction(data: FormFields) {
    if (session && sessionToken) {
      const userId = session.user.id;

      const rawFormData = {
        payeeId: data.payeeId,
        payerId: userId,
        amount: data.amount + "",
        status: "PENDING"
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/create/user/${userId}`,
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
      setBalance(Number(data.amount));
      refetch();

      if (presets?.filter((p) => p.payeeId == data.payeeId).length == 0) {
        createPreset();
      }
      localStorage.removeItem("tx-payeeid");
      localStorage.removeItem("tx-payeename");
    }
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    createTransaction(data);
  };

  return (
    <form
      id="preset-form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 py-4"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeId" className="text-left whitespace-nowrap">
          Payee Id
        </Label>

        <Controller
          name="payeeId"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              options={presets?.map((preset) => ({
                label: preset.payeeId + " " + preset.payeeName,
                value: preset.payeeId
              }))}
              onBlur={fetchUser}
              onChange={(selectedOption) => {
                console.log("FIELD VALUE: ", field.value);
                field.onChange(selectedOption?.value);
              }}
              placeholder="Select or create a payee"
              className="col-span-3"
              isClearable
            />
          )}
        />

        {errors.payeeId && (
          <div className="col-span-4 text-red-500">
            {errors.payeeId.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="payeeName" className="text-left whitespace-nowrap">
          Payee Name
        </Label>
        <Input
          {...register("payeeName")}
          id="payeeName"
          className="col-span-3"
          readOnly
        />
        {errors.payeeName && (
          <div className="col-span-4 text-red-500">
            {errors.payeeName.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="amount" className="text-left whitespace-nowrap">
          Amount
        </Label>
        <Input
          {...register("amount", {
            setValueAs: (value) => {
              const parsedValue = Number(value);
              // Return 0 if the value is NaN or an empty string
              return isNaN(parsedValue) || value.trim() === ""
                ? 0
                : parsedValue;
            }
          })}
          id="amount"
          className="col-span-3"
          disabled={!getValues().payeeId || !getValues().payeeName}
        />
        {errors.amount && (
          <div className="col-span-4 text-red-500">{errors.amount.message}</div>
        )}
      </div>
      <SheetFooter>
        {/* <SheetClose asChild> */}
        <Button
          disabled={!getValues().payeeName || !getValues().payeeId || pending}
          type="submit"
        >
          {pending ? "Sending..." : "Create"}
        </Button>
        {/* </SheetClose> */}
      </SheetFooter>
    </form>
  );
}

export default TransactionForm;
