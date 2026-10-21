export const READ_BOOKS_KEY = "book-vibe-read-books";
export const WISHLIST_KEY = "book-vibe-wishlist";

export function parseBookIds(value: string): number[] {
  const parsed: unknown = JSON.parse(value);
  if (
    !Array.isArray(parsed) ||
    !parsed.every((bookId) => Number.isInteger(bookId) && bookId > 0)
  ) {
    throw new Error("Saved bookshelf data is invalid.");
  }

  return parsed;
}

export function subscribeToBookshelf(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("book-vibe:shelf-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("book-vibe:shelf-change", onStoreChange);
  };
}

function getSnapshot(key: string): string {
  return window.localStorage.getItem(key) ?? "[]";
}

export function getReadBooksSnapshot(): string {
  return getSnapshot(READ_BOOKS_KEY);
}

export function getWishlistSnapshot(): string {
  return getSnapshot(WISHLIST_KEY);
}

export function getEmptyBookshelfSnapshot(): string {
  return "[]";
}

export function saveBookIds(key: string, bookIds: number[]): void {
  window.localStorage.setItem(key, JSON.stringify(bookIds));
  window.dispatchEvent(new Event("book-vibe:shelf-change"));
}
