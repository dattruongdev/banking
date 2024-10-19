"use client";
import { useAuth, useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useAppAuth() {
  const [userInfo, setUserInfo] = useState<{
    session: any | null;
    sessionToken: string | null;
    isAdmin: boolean;
    loading: boolean;
  }>({
    session: null,
    sessionToken: null,
    isAdmin: false,
    loading: true
  });
  const { session } = useSession();
  const auth = useAuth();

  useEffect(() => {
    const fetchUserInfos = async () => {
      const sessionToken = await session?.getToken();

      if (session && sessionToken && auth) {
        setUserInfo((prev) => {
          return {
            ...prev,
            session,
            sessionToken,
            isAdmin: auth.orgRole === "org:admin",
            loading: false
          };
        });
      }
    };
    fetchUserInfos();
  }, [session]);

  return userInfo;
}
