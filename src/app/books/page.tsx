import booksDataJson from "../../../public/booksData.json";
import BooksCatalog from "@/components/books/BooksCatalog";
import { IBook } from "@/types/books.types";

const booksData: IBook[] = Array.isArray(booksDataJson)
  ? booksDataJson
  : [booksDataJson];

export default function BooksPage() {
  return (
    <section className="site-container page-shell">
      <div className="page-intro">
        <p className="eyebrow">The collection</p>
        <h1 className="page-title">Explore all books</h1>
        <p>Search by title, author, or theme, then find a story that speaks to you.</p>
      </div>
      <BooksCatalog books={booksData} />
    </section>
  );
}