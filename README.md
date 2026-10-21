# Book Vibe

Book Vibe হলো বই আবিষ্কার, বইয়ের বিস্তারিত দেখা, নিজের পড়া বই ও wishlist গুছিয়ে রাখা এবং reading progress দেখার জন্য তৈরি একটি responsive web application। এটি Next.js App Router, React ও TypeScript ব্যবহার করে তৈরি।

## ফিচারসমূহ

- **হোম পেজ:** পরিচিতিমূলক banner এবং নির্বাচিত বইয়ের collection।
- **বইয়ের তালিকা:** title, author বা theme দিয়ে search এবং category অনুযায়ী filter।
- **বইয়ের বিস্তারিত:** বইয়ের cover, review, category, tags, rating, page count, publisher ও প্রকাশনার বছর।
- **Read list:** বইকে পড়া হিসেবে যোগ বা তালিকা থেকে সরানো।
- **Wishlist:** পরে পড়ার জন্য পছন্দের বই যোগ বা সরানো।
- **Toast notification:** Read list বা wishlist-এ কোনো বই যোগ/বাদ দিলে screen-এর উপরের ডান পাশে confirmation।
- **Reading progress:** পড়া হিসেবে চিহ্নিত বইয়ের সংখ্যা, মোট page count, average rating এবং বইভিত্তিক page overview।
- **Responsive layout:** desktop ও mobile screen-এ ব্যবহারযোগ্য navigation এবং page layout।

## প্রযুক্তি

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- Tailwind CSS 4 এবং DaisyUI

## প্রয়োজনীয়তা

- Node.js (LTS সংস্করণ ব্যবহার করার পরামর্শ দেওয়া হয়)
- npm

## লোকাল ডেভেলপমেন্ট

প্রথমে project directory-তে যান:

```bash
cd book-vibe
```

Dependencies ইনস্টল করুন:

```bash
npm install
```

Development server চালান:

```bash
npm run dev
```

এরপর browser-এ [http://localhost:3000](http://localhost:3000) খুলুন।

## উপলব্ধ npm command

| Command | কাজ |
| --- | --- |
| `npm run dev` | Development server চালায় |
| `npm run lint` | ESLint দিয়ে code পরীক্ষা করে |
| `npm run build` | Production build তৈরি করে |
| `npm run start` | আগে তৈরি করা production build চালায় |

Production build চালাতে:

```bash
npm run build
npm run start
```

## পেজ ও route

| Route | বিবরণ |
| --- | --- |
| `/` | Home page, banner এবং নির্বাচিত বই |
| `/books` | সম্পূর্ণ বইয়ের তালিকা, search ও category filter |
| `/books/[id]` | নির্দিষ্ট বইয়ের বিস্তারিত ও Read/Wishlist action |
| `/listed-books` | Read list এবং wishlist |
| `/pages-to-read` | পড়া হিসেবে চিহ্নিত বইয়ের reading overview |

## বইয়ের ডেটা

বইয়ের তালিকা রাখা হয়েছে `public/booksData.json` ফাইলে। প্রতিটি বইয়ের record-এ `bookId`, `bookName`, `author`, `image`, `review`, `totalPages`, `rating`, `category`, `tags`, `publisher`, এবং `yearOfPublishing` থাকে। TypeScript interface পাওয়া যাবে `src/types/books.types.ts` ফাইলে।

কোনো বই যোগ বা সম্পাদনা করতে JSON ফাইলটি পরিবর্তন করুন। `bookId` প্রতিটি বইয়ের জন্য আলাদা ও স্থিতিশীল রাখুন, কারণ details route এবং browser-এর saved list এই ID ব্যবহার করে।

বইয়ের cover image-গুলো JSON data-তে থাকা remote URL থেকে লোড হয়। Remote image host Next.js configuration-এ অনুমোদিত থাকতে হয়; configuration রাখা হয়েছে `next.config.ts`-এ।

## Read list ও wishlist কীভাবে কাজ করে

Read list এবং wishlist browser-এর `localStorage`-এ রাখা হয়:

- `book-vibe-read-books`
- `book-vibe-wishlist`

তাই এগুলো একই browser ও device-এ সংরক্ষিত থাকে; অন্য browser/device-এ স্বয়ংক্রিয়ভাবে sync হয় না। এই project-এ backend, account login বা cloud sync অন্তর্ভুক্ত নেই। Browser-এর site data মুছে ফেললে সংরক্ষিত list-ও মুছে যেতে পারে।

## Project structure

```text
src/
├── app/
│   ├── books/
│   │   └── [id]/
│   ├── listed-books/
│   ├── pages-to-read/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── books/
│   ├── homepage/
│   └── shared/
├── lib/
│   └── bookshelf.ts
└── types/
    └── books.types.ts
public/
└── booksData.json
```

## UI পরিবর্তন

- Shared layout ও global styling: `src/app/layout.tsx`, `src/app/globals.css`
- Home page ও banner: `src/app/page.tsx`, `src/components/homepage/`
- Book card ও navigation: `src/components/shared/`
- Catalog, shelf action এবং reading progress: `src/components/books/`
- Book data: `public/booksData.json`

## লাইসেন্স ও ব্যবহার

এই repository-তে আলাদা license file না থাকলে project-টির license বা পুনর্বিতরণের শর্ত অনুমান করবেন না। ব্যবহৃত remote cover image ও project assets-এর জন্য সংশ্লিষ্ট উৎসের শর্ত প্রযোজ্য হতে পারে।
