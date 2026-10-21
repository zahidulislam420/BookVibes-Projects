import Image from "next/image";
import { notFound } from "next/navigation";
import BookShelfActions from "@/components/books/BookShelfActions";
import { IBook } from "@/types/books.types";
import booksDataJson from "../../../../public/booksData.json";

const books: IBook[] = Array.isArray(booksDataJson) ? booksDataJson : [booksDataJson];

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookId = Number(id);
  const book = books.find((item) => item.bookId === bookId);
  if (!book) notFound();

  return (
    <section className="site-container page-shell">
      <div className="detail-layout">
        <div className="detail-cover">
          <Image src={book.image} alt={book.bookName} width={420} height={560} priority />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{book.category}</p>
          <h1>{book.bookName}</h1>
          <p className="detail-author">by {book.author}</p>
          <p className="detail-review">{book.review}</p>
          <div className="tag-list">
            {book.tags.map((tag) => <span className="book-tag" key={tag}>{tag}</span>)}
          </div>
          <dl className="detail-stats">
            <div><dt>Rating</dt><dd>★ {book.rating} / 5</dd></div>
            <div><dt>Pages</dt><dd>{book.totalPages}</dd></div>
            <div><dt>Publisher</dt><dd>{book.publisher}</dd></div>
            <div><dt>Published</dt><dd>{book.yearOfPublishing}</dd></div>
          </dl>
          <BookShelfActions bookId={book.bookId} />
        </div>
      </div>
    </section>
  );
}