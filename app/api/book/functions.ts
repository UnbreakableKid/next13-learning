import { User } from "@clerk/nextjs/dist/server";

import { prisma } from "@/lib/prisma";

export const getUserBooks = async (user: User | any) => {
  return await prisma.book.findMany({
    where: {
      username: user.username!,
    },
  });
};
