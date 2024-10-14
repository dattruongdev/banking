import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-full flex flex-col items-center justify-center px-4 z-[100]">
        <div className="flex flex-col space-y-4 pt-16 mb-6 items-center justify-center">
          <h1 className="font-bold text-3xl text-neutral-800">Welcome Back!</h1>
          <p className="font-medium text-zinc-500">
            Login or Create a new account to use app
          </p>
          <ClerkLoaded>
            <SignUp path="/sign-up" signInUrl="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
        <div
          className="absolute bg-white left-1/2 -translate-x-12 h-full w-full z-[-1]"
          style={{ borderRadius: "55% 45% 42% 58% / 49% 49% 51% 51% " }}
        ></div>
      </div>

      <div className="relative bg-green-500 hidden lg:flex items-center justify-end">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="relative z-[100] mr-[20%]"
        />
      </div>
    </div>
  );
}
