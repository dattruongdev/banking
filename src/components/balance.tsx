"use client";
import { useAppAuth } from "@/hooks/use-auth";
import { useBalance } from "@/hooks/use-balance";
import React, { useEffect } from "react";
import { useStore } from "zustand";

type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

function Balance({ size }: Props) {
  let { session, sessionToken } = useAppAuth();
  let state = useStore(useBalance, (x) => x);
  let { balance, setBalance } = state;

  async function fetchUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/user/${session.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    );
    if (!response.ok) {
      setBalance(0);
      return;
    }

    const data = await response.json();
    setBalance(data?.balance);
  }

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [balance, session]);

  return <p className={`text-${size}`}>{balance} VND</p>;
}

export default Balance;
