import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { Hydrate, dehydrate } from "@tanstack/react-query";

import Books from "@/app/(user)/dashboard/books";
import { getUserBooks } from "@/app/api/book/functions";
import getQueryClient from "@/app/getQueryClient";

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["books"], () => getUserBooks(user));
  const dehydratedState = dehydrate(queryClient);

  const username = user.username!;

  return (
    <Hydrate state={dehydratedState}>
      <Books username={username} />
    </Hydrate>
  );
};
export default Page;
