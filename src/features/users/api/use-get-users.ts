import { useAppAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const userinfo = useAppAuth();
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async function callUser() {
      const sessionToken = userinfo?.sessionToken;
      const userId = userinfo?.session?.user?.id;

      if (sessionToken) {
        console.log(sessionToken);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/admin/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionToken
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        return data;
      }
      return null;
    },
    enabled: !!userinfo
  });

  return query;
};
