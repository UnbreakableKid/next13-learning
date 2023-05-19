import { prisma } from "@/lib/prisma";
import BookCard from "@/components/bookCard";

export const revalidate = 10;

async function getBooks() {
  return await prisma.book.findMany();
}

export default async function Books() {
  const books = await getBooks();
  return (
    <div className="grid grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
