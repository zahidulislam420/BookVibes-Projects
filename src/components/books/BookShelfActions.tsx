"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  getEmptyBookshelfSnapshot,
  getReadBooksSnapshot,
  getWishlistSnapshot,
  parseBookIds,
  READ_BOOKS_KEY,
  saveBookIds,
  subscribeToBookshelf,
  WISHLIST_KEY,
} from "@/lib/bookshelf";

interface BookShelfActionsProps {
  bookId: number;
}

export default function BookShelfActions({ bookId }: BookShelfActionsProps) {
  const [toast, setToast] = useState("");
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

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function toggleBook(key: string, ids: number[], listName: string) {
    const isSaved = ids.includes(bookId);
    const next = ids.includes(bookId)
      ? ids.filter((id) => id !== bookId)
      : [...ids, bookId];
    saveBookIds(key, next);
    setToast(
      isSaved
        ? `Removed from your ${listName}.`
        : `Added to your ${listName}!`,
    );
  }

  return (
    <>
      <div className="detail-actions">
        <button
          className="primary-button"
          type="button"
          onClick={() => toggleBook(READ_BOOKS_KEY, readIds, "read list")}
        >
          {readIds.includes(bookId) ? "Remove from read books" : "Mark as read"}
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => toggleBook(WISHLIST_KEY, wishlistIds, "wishlist")}
        >
          {wishlistIds.includes(bookId) ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>
      {toast && (
        <div className="toast-message" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}
