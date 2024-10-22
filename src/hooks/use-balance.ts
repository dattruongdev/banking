import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

type BalanceStore = {
  balance: number;
  setBalance: (balance: number) => void;
};

export const useBalance = create<BalanceStore>((set, get) => ({
  balance: 0,
  setBalance: (balance: number) => {
    set({ balance });
  }
}));
