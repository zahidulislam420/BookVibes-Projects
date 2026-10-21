"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import BookCard from "@/components/shared/BookCard";
import {
  getEmptyBookshelfSnapshot,
  getReadBooksSnapshot,
  getWishlistSnapshot,
  parseBookIds,
  subscribeToBookshelf,
} from "@/lib/bookshelf";
import { IBook } from "@/types/books.types";

type ShelfTab = "read" | "wishlist";

export default function ListedBooks({ books }: { books: IBook[] }) {
  const [activeTab, setActiveTab] = useState<ShelfTab>("read");
  const readSnapshot = useSyncExternalStore(
    subscribeToBookshelf,
    getReadBooksSnapshot,
    getEmptyBookshelfSnapshot,
  );
  const wishlistSnapshot = useSyncExternalStore(
    subscribeToBookshelf,
    getWishlistSnapshot,
    getEmptyBookshelfSnapshot,
  );
  const readIds = useMemo(() => parseBookIds(readSnapshot), [readSnapshot]);
  const wishlistIds = useMemo(
    () => parseBookIds(wishlistSnapshot),
    [wishlistSnapshot],
  );

  const shelfBooks = useMemo(() => {
    const ids = activeTab === "read" ? readIds : wishlistIds;
    return books.filter((book) => ids.includes(book.bookId));
  }, [activeTab, books, readIds, wishlistIds]);

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Your book lists">
        <button
          className="tab-button"
          type="button"
          role="tab"
          aria-selected={activeTab === "read"}
          onClick={() => setActiveTab("read")}
        >
          Read books ({readIds.length})
        </button>
        <button
          className="tab-button"
          type="button"
          role="tab"
          aria-selected={activeTab === "wishlist"}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist ({wishlistIds.length})
        </button>
      </div>
      {shelfBooks.length ? (
        <div className="book-grid">
          {shelfBooks.map((book) => <BookCard key={book.bookId} book={book} />)}
        </div>
      ) : (
        <div className="empty-state">
          <p>{activeTab === "read" ? "Your read list is ready for a first book." : "Your wishlist is waiting for a few favorites."}</p>
          <Link className="primary-button mt-4" href="/books">Browse the collection</Link>
        </div>
      )}
    </>
  );
}
