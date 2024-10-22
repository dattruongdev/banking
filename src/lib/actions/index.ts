"use server";

import { revalidatePath } from "next/cache";

export async function customRevalidate() {
  console.log("Hello" + Date.now());
  revalidatePath("/presets?_=" + Date.now());
}
