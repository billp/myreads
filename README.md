# MyReads: A Book Tracking App

MyReads is the final project for Udacity's **React Fundamentals** course
(React Nanodegree, nd019). It is a bookshelf app that lets you sort the books you
read, are currently reading, or want to read into three shelves, and search for
new books to add. Book data and shelf changes are persisted through a provided
backend API.

Built with **React 18**, **React Router 6**, and **Vite**.

## Features

- **Three shelves** on the main page — *Currently Reading*, *Want to Read*, and
  *Read* — each populated from the backend on load.
- **Move books between shelves** with a per-book dropdown. The control always
  defaults to the book's current shelf, and changes are persisted via the API.
- **Search page** (`/search`) to find new books. Results that already live on a
  shelf show that shelf in their dropdown; moving them updates the main page.
- **Client-side routing** between the list and search pages with no full reload;
  browser back/forward works as expected.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start        # or: npm run dev

# 3. Open the app
# Vite prints a local URL (default http://localhost:5173)
```

To create a production build:

```bash
npm run build
npm run preview
```

## How to use

1. On the home page, books are grouped onto their shelves.
2. Use the green dropdown on any book to move it to a different shelf (or remove
   it with **None**).
3. Click the green **＋** button (bottom-right) to open the search page.
4. Type a query and pick a shelf for any result to add it to your shelves.
   The backend only recognizes a fixed set of search terms — see
   [`SEARCH_TERMS.md`](./SEARCH_TERMS.md).

## Backend API

The app talks to the Udacity-provided backend through
[`src/BooksAPI.js`](./src/BooksAPI.js):

| Method | Description |
| ------ | ----------- |
| `getAll()` | Resolves to all books currently on the shelves. |
| `update(book, shelf)` | Moves `book` to `shelf` (`"currentlyReading"`, `"wantToRead"`, `"read"`, or `"none"`). |
| `search(query, maxResults)` | Resolves to up to 20 raw results (no shelf info). |

> Search results from the API do **not** include shelf information, so the app
> merges in the current shelf from local state before rendering them.

## Project structure

```
myreads/
├── index.html
├── package.json
├── vite.config.js
├── SEARCH_TERMS.md
└── src/
    ├── main.jsx              # Entry point; wraps <App /> in <BrowserRouter>
    ├── App.jsx               # Owns book state + routing
    ├── BooksAPI.js           # Provided backend client
    ├── App.css / index.css   # Provided styles
    ├── icons/                # Provided SVG icons
    └── components/
        ├── ListBooks.jsx     # Main page: the three shelves
        ├── Bookshelf.jsx     # A single shelf
        ├── Book.jsx          # A single book + shelf changer
        └── SearchBooks.jsx   # Search page
```

## Credits

Starter styles, icons, and `BooksAPI.js` are provided by Udacity as part of the
[MyReads starter template](https://github.com/udacity/nd0191-c1-myreads).
