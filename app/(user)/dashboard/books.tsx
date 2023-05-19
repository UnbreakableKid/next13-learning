"use client";

import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import BookCard from "@/components/bookCard";
import AddBookForm from "@/app/(user)/dashboard/addBookForm";

type BooksProps = {
  username: string;
};

export default function Books({ username }: BooksProps) {
  const { data } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: () =>
      fetch(`/api/book?username=${username}`).then((res) => res.json()),
  });

  if (!data) return null;

  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <AddBookForm />
    </div>
  );
}
