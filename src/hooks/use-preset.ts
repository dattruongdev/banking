import { Preset, useGetPresets } from "@/features/presets/use-get-presets";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PresetStore = {
  presets?: Preset[];
  setPresets: (presets: Preset[] | undefined) => void;
  getPresets: () => Preset[] | undefined;
};

export const usePreset = create<PresetStore>((set, get) => ({
  presets: [],
  setPresets: (presets: Preset[] | undefined) => {
    set({ presets });
  },
  getPresets: () => get().presets
}));
