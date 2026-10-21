import Link from 'next/link';

const Navbar = () => {
    return (
      <header className="site-header">
        <div className="site-container header-inner">
          <Link className="brand" href="/" aria-label="Book Vibe home">
            <span className="brand-mark" aria-hidden="true">B</span>
            <span>Book Vibe</span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/books">Explore books</Link>
            <Link href="/listed-books">My bookshelf</Link>
            <Link href="/pages-to-read">Reading progress</Link>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation menu">
              <span aria-hidden="true">☰</span>
            </summary>
            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              <Link href="/books">Explore books</Link>
              <Link href="/listed-books">My bookshelf</Link>
              <Link href="/pages-to-read">Reading progress</Link>
            </nav>
          </details>
        </div>
      </header>
    );
};

export default Navbar;