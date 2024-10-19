"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useAppAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { isAdmin, loading } = useAppAuth();
  console.log("LOADING: ", loading);
  console.log("ISADMIN: ", isAdmin);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    }
  }, [loading, isAdmin]);

  return (
    <ContentLayout title="Management">
      {loading ? (
        <div className="flex flex-col w-full h-full justify-center items-center ">
          <div className="w-[40%] h-[20%] bg-white rounded-lg flex flex-col justify-center items-center shadow-md">
            <div className="text-zinc-500 text-center flex items-center gap-3">
              <span>Checking user...</span>
              <Loader2 className="animate-spin self-center" />
            </div>
          </div>
        </div>
      ) : !isAdmin ? (
        <div className="flex flex-col w-full h-full justify-center items-center ">
          <div className="w-[40%] h-[20%] bg-white rounded-lg flex flex-col justify-center items-center shadow-md">
            <div className="text-zinc-500 text-center flex items-center gap-3">
              <span>No permissions. Redirecting...</span>
              <Loader2 className="animate-spin self-center" />
            </div>
          </div>
        </div>
      ) : (
        <div>User is admin</div>
      )}
    </ContentLayout>
  );
}
