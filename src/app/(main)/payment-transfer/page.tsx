"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetUsers } from "@/features/users/api/use-get-users";

export default function Page() {
  const userQuery = useGetUsers();
  if (userQuery.isError) console.log(userQuery.error);

  return (
    <ContentLayout title="Payment Transfer">
      {userQuery.data ? (
        <div>
          {userQuery.data.map((user: any, index: number) => (
            <div>Person name: {user.fullname}</div>
          ))}
        </div>
      ) : (
        <div>Payment transfer</div>
      )}
    </ContentLayout>
  );
}
