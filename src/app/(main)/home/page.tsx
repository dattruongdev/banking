import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDisplay from "@/components/home/UserDisplay";
import { ClerkLoaded, ClerkLoading, useSession } from "@clerk/nextjs";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";

export default async function Page() {
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId + "");

  return (
    <ContentLayout title="Home">
      <ClerkLoading>
        <Loader2 className="animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex flex-col">
          <div className="text-3xl text-neutral-800 font-medium py-2">
            Welcome, <span className="text-green-500">{user.fullName}</span>
          </div>
          <div className="text-zinc-500 text-lg mb-5">
            Access & manage your account and transactions efficiently
          </div>
          <UserDisplay />
        </div>
      </ClerkLoaded>
    </ContentLayout>
  );
}
