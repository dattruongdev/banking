"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetUsers } from "@/features/users/api/use-get-users";
import { ClerkLoaded, ClerkLoading, useSession } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { session, isSignedIn } = useSession();
  const userQuery = useGetUsers();

  return (
    <ContentLayout title="Home">
      <ClerkLoading>
        <Loader2 className="animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex flex-col">
          <div className="text-3xl text-neutral-800 font-medium py-2">
            Welcome,{" "}
            <span className="text-green-500">{session?.user.fullName}</span>
          </div>
          <div className="text-zinc-500 text-lg mb-5">
            Access & manage your account and transactions efficiently
          </div>

          {userQuery.data?.map((item: any, index: number) => (
            <div>{item.name}</div>
          ))}
        </div>
      </ClerkLoaded>
    </ContentLayout>
  );
}
