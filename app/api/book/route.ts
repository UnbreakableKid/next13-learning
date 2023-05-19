import { NextRequest, NextResponse } from "next/server";
import { Book } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface UpdateRequest extends Partial<Book> {
  id: number;
}

export async function PUT(req: NextRequest) {
  const { id, ...rest }: UpdateRequest = await req.json();

  const x = await prisma.book.update({
    where: {
      id,
    },
    //update only the fields that were sent
    data: {
      ...rest,
    },
  });

  return NextResponse.json(x);
}

type CreateRequest = {
  title: string;
  author: string;
  rating: number;
  username: string;
  cover?: string;
};

export async function POST(req: NextRequest) {
  const response: CreateRequest = await req.json();

  const x = await prisma.book.create({
    data: {
      title: response.title,
      author: response.author,
      rating: response.rating,
      username: response.username,
      cover: response.cover,
    },
  });
  return NextResponse.json(x);
}

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "No username provided" });
  }

  const x = await prisma.book.findMany({
    where: {
      username,
    },
  });
  return NextResponse.json(x);
}
