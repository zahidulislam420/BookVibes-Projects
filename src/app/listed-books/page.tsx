import ListedBooks from "@/components/books/ListedBooks";
import { IBook } from "@/types/books.types";
import booksDataJson from "../../../public/booksData.json";

const books: IBook[] = Array.isArray(booksDataJson) ? booksDataJson : [booksDataJson];

export default function ListedBooksPage() {
  return (
    <section className="site-container page-shell">
      <div className="page-intro">
        <p className="eyebrow">Your personal shelves</p>
        <h1 className="page-title">My bookshelf</h1>
        <p>Keep the books you have finished and the ones you cannot wait to read.</p>
      </div>
      <ListedBooks books={books} />
    </section>
  );
}
