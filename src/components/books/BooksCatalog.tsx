"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/shared/BookCard";
import { IBook } from "@/types/books.types";

export default function BooksCatalog({ books }: { books: IBook[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const categories = useMemo(
    () => ["All categories", ...new Set(books.map((book) => book.category))],
    [books],
  );
  const filteredBooks = books.filter((book) => {
    const search = query.trim().toLowerCase();
    const matchesQuery =
      search.length === 0 ||
      book.bookName.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.tags.some((tag) => tag.toLowerCase().includes(search));
    return matchesQuery && (category === "All categories" || book.category === category);
  });

  return (
    <>
      <div className="catalog-toolbar">
        <label className="sr-only" htmlFor="book-search">Search books</label>
        <input
          className="catalog-search"
          id="book-search"
          type="search"
          placeholder="Search by title, author, or theme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <label className="sr-only" htmlFor="book-category">Filter by category</label>
        <select
          className="catalog-filter"
          id="book-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      {filteredBooks.length > 0 ? (
        <div className="book-grid">
          {filteredBooks.map((book) => <BookCard key={book.bookId} book={book} />)}
        </div>
      ) : (
        <div className="empty-state">No books match those filters. Try another search.</div>
      )}
    </>
  );
}
