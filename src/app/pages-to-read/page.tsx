import ReadingProgress from "@/components/books/ReadingProgress";
import { IBook } from "@/types/books.types";
import booksDataJson from "../../../public/booksData.json";

const books: IBook[] = Array.isArray(booksDataJson) ? booksDataJson : [booksDataJson];

export default function PagesToReadPage() {
  return (
    <section className="site-container page-shell">
      <div className="page-intro">
        <p className="eyebrow">Your reading journey</p>
        <h1 className="page-title">Pages to read</h1>
        <p>A small celebration of the books and pages you have finished.</p>
      </div>
      <ReadingProgress books={books} />
    </section>
  );
}
