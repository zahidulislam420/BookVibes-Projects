import { IBook } from '@/types/books.types';
import Image from 'next/image';
import Link from 'next/link';

interface IBookCardProps {
    book: IBook;
}

const BookCard = ( {book}: IBookCardProps ) => {
    return (
          <article className="book-card">
            <Link
              className="book-cover-wrap"
              href={`/books/${book.bookId}`}
              aria-label={`View ${book.bookName}`}
            >
              <Image
                src={book.image}
                alt={book.bookName}
                width={360}
                height={480}
                className="book-cover"
              />
            </Link>
            <div className="book-card-body">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">{book.category}</span>
                <span aria-label={`${book.rating} out of 5 stars`}>★ {book.rating}</span>
              </div>
              <h3>{book.bookName}</h3>
              <p className="book-card-meta">By {book.author}</p>
              <div className="tag-list" aria-label="Book themes">
                {book.tags.map((tag) => (
                  <span className="book-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {book.review}
              </p>
              <Link className="primary-button" href={`/books/${book.bookId}`}>
                Book details <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
    );
};

export default BookCard;