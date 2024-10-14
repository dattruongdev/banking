import { ContentLayout } from "@/components/admin-panel/content-layout";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const token =
  "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybk5HMTN2NE9LQ0dxRHVQOWxSdTk1WTBHMWQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3Mjg4OTc5NDMsImlhdCI6MTcyODg5Nzg4MywiaXNzIjoiaHR0cHM6Ly9wYXRpZW50LWxpemFyZC0yOS5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE3Mjg4OTc4NzMsInNpZCI6InNlc3NfMm5Qc0VvYkI3N2ZWdW1HUlZYNllUTzI1alV1Iiwic3ViIjoidXNlcl8ybk5KY3BMam9KMjZpZEQ0TExZb0lBaTBKSEkifQ.okpo6Pufd8pZpQUEKklY28_wguSITIddLHdkFeUu_HrhEogofXPWrbldJ09wEfYWGymaIpj5LKkCmc5AGCHw2p5TAisgyxFqjkIM7eKeJLrB4UxDpjjrooSDC2ClA6E0Ip319ClA7s0u1p4rF69qDHhUAUaD_VRaWCln6c1Qmm6akLhQhWLM_B3-xCXPtsg2VNSVg4uPyVKXjT5-2IQJBTBa6KDqjZhIkGq_W7s7GcIz2GP3sEGWGl_4o-bhSSHOL2dHMf3IrQf8v3Wv5w_k-7_7rzFfuSdcv_N3LZgrI_VY8-Q7MlWZUym_7YyyLW7zRiELiRcEALGMW5Qoaq93nw";

async function callUser() {
  try {
    const cookieStore = cookies();
    const response = await fetch("http://localhost:8080/hello", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      },
      credentials: "include"
    });
    if (!response.ok) {
      console.log(response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

export default async function Page() {
  const user = await currentUser();
  console.log(user);
  await callUser();
  return (
    <ContentLayout title="Home">
      <div className="flex flex-col">
        <div className="text-3xl text-neutral-800 font-medium py-2">
          Welcome, <span className="text-green-500">{user!.fullName}</span>
        </div>
        <div className="text-zinc-500 text-lg mb-5">
          Access & manage your account and transactions efficiently
        </div>
      </div>
    </ContentLayout>
  );
}
