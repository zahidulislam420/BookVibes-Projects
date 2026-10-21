
import BookCard from "../shared/BookCard";
import { IBook } from "@/types/books.types";
import booksDataJson from "../../../public/booksData.json";
import Link from "next/link";

const booksData: IBook[] = Array.isArray(booksDataJson)
  ? booksDataJson
  : [booksDataJson];

const Books = () => {
  return (
    <section className="site-container py-10 md:py-16">
      <div className="section-heading">
        <p className="eyebrow">A collection worth getting lost in</p>
        <h2>Find your next read</h2>
        <p className="mx-auto max-w-xl text-gray-500">
          From much-loved classics to new worlds waiting to be found.
        </p>
      </div>
      <div className="book-grid">
        {booksData.slice(0, 6).map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link className="secondary-button" href="/books">See all books <span className="ml-2" aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
};

export default Books;