import { useQuery } from "@tanstack/react-query";

async function callUser() {
  const sessionToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("__session="))
    ?.split("=")[1];
  console.log(sessionToken);

  if (sessionToken) {
    const response = await fetch(`${process.env.SERVER_PUBLIC_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionToken
      },
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  }
}
export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: callUser
  });

  return query;
};
