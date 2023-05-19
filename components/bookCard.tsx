import Image from "next/image";
import Link from "next/link";
import { Book } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type bookCardProps = {
  book: Book;
};

const BookCard = ({ book }: bookCardProps) => {
  return (
    <Card key={book.id} className="">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={book.cover} width={400} height={600} alt={""} />
        <p>{book.author}</p>
      </CardContent>
      <CardFooter>
        <div>
          <p>
            <span className="font-bold">{book.username} </span> currently has
            this book and it is in {book.status}
          </p>

          <Link href={`/books/${book.id}`}>
            <Button className="mt-4" type="button">
              View Book
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
export default BookCard;
