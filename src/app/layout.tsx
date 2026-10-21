import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Book Vibe | Find your next favorite read",
    template: "%s | Book Vibe",
  },
  description:
    "Discover thoughtful reads, save books to your shelves, and keep track of your reading journey.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="site-container">
            A quieter corner of the internet for people who love books.
          </div>
        </footer>
      </body>
    </html>
  );
}
