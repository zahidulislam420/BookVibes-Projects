"use client";

import { useMemo, useSyncExternalStore } from "react";
import BookCard from "@/components/shared/BookCard";
import {
  getEmptyBookshelfSnapshot,
  getReadBooksSnapshot,
  parseBookIds,
  subscribeToBookshelf,
} from "@/lib/bookshelf";
import { IBook } from "@/types/books.types";
import Link from "next/link";

export default function ReadingProgress({ books }: { books: IBook[] }) {
  const readSnapshot = useSyncExternalStore(
    subscribeToBookshelf,
    getReadBooksSnapshot,
    getEmptyBookshelfSnapshot,
  );
  const readIds = useMemo(() => parseBookIds(readSnapshot), [readSnapshot]);
  const readBooks = useMemo(
    () => books.filter((book) => readIds.includes(book.bookId)),
    [books, readIds],
  );
  const totalPages = readBooks.reduce((total, book) => total + book.totalPages, 0);
  const maxPages = Math.max(...readBooks.map((book) => book.totalPages), 0);

  if (!readBooks.length) {
    return (
      <div className="empty-state">
        <p>Mark a book as read to start your pages-to-read overview.</p>
        <Link className="primary-button mt-4" href="/books">Find a book</Link>
      </div>
    );
  }

  return (
    <>
      <div className="reading-summary">
        <div className="summary-card"><span>Books finished</span><strong>{readBooks.length}</strong></div>
        <div className="summary-card"><span>Pages on your shelf</span><strong>{totalPages}</strong></div>
        <div className="summary-card"><span>Average rating</span><strong>{(readBooks.reduce((sum, book) => sum + book.rating, 0) / readBooks.length).toFixed(1)} ★</strong></div>
      </div>
      <section className="chart-card" aria-labelledby="reading-chart-title">
        <h2 id="reading-chart-title" className="text-xl font-semibold">Pages in each finished book</h2>
        {readBooks.map((book) => (
          <div className="chart-row" key={book.bookId}>
            <span>{book.bookName}</span>
            <div className="chart-track" aria-hidden="true">
              <div className="chart-bar" style={{ width: `${(book.totalPages / maxPages) * 100}%` }} />
            </div>
            <strong>{book.totalPages}</strong>
          </div>
        ))}
      </section>
      <section className="mt-12">
        <div className="section-heading">
          <p className="eyebrow">A look back</p>
          <h2>Your finished books</h2>
        </div>
        <div className="book-grid">
          {readBooks.map((book) => <BookCard key={book.bookId} book={book} />)}
        </div>
      </section>
    </>
  );
}
