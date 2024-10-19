"use client";
import { useAppAuth } from "@/hooks/use-auth";
import { useAuth, useSession } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [isComplete, setIsComplete] = useState(false);
  const { session, sessionToken } = useAppAuth();
  const router = useRouter();

  async function CreateToDB() {
    if (session) {
      const token = sessionToken;
      const user = session?.user;
      const email = user?.emailAddresses[0].emailAddress;
      const fullname = user?.fullName;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            UserID: session.user.id,
            Email: email,
            FullName: fullname
          })
        }
      );
      if (response.status == 409) {
        return router.push("/home");
      }
      if (response.status == 201) {
        setIsComplete(true);
        return setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
      const data = await response.json();

      return data;
    }
  }

  const query = useQuery({
    queryKey: ["signup"],
    queryFn: CreateToDB,
    enabled: !!session
  });

  // useEffect(() => {
  //   setIsComplete(false);
  //   if (!query.isError) {
  //     setIsComplete(true);
  //     setTimeout(() => {
  //       router.push("/home");
  //     }, 2000);
  //   }
  // }, [session, query]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-100">
      <div className="bg-white shadow-md flex flex-col gap-3 items-center justify-center w-[40%] h-[30%] rounded-xl p-5">
        <div className="text-zinc-500 text-lg font-medium text-center">
          {!isComplete
            ? "Processing user... Please wait a moment."
            : "Complete! Navigating to home page"}
        </div>
        {isComplete ? (
          <CircleCheckBig className="text-green-400" />
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </div>
    </div>
  );
}
