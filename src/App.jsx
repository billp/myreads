import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks.jsx'
import SearchBooks from './components/SearchBooks.jsx'

function App() {
  // `books` is the single source of truth for everything on the shelves.
  const [books, setBooks] = useState([])

  // Load the current shelves once when the app mounts.
  useEffect(() => {
    BooksAPI.getAll().then(setBooks)
  }, [])

  /**
   * Move a book to a shelf (or remove it with shelf === "none").
   * Persists the change to the backend, then mirrors it in local state so the
   * UI updates immediately and stays consistent across the main and search pages.
   */
  const updateBook = async (book, shelf) => {
    await BooksAPI.update(book, shelf)

    setBooks((prevBooks) => {
      // Drop the book from its previous position, then re-add it (unless "none").
      const withoutBook = prevBooks.filter((b) => b.id !== book.id)
      return shelf === 'none' ? withoutBook : [...withoutBook, { ...book, shelf }]
    })
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ListBooks books={books} onUpdateBook={updateBook} />} />
        <Route
          path="/search"
          element={<SearchBooks books={books} onUpdateBook={updateBook} />}
        />
      </Routes>
    </div>
  )
}

export default App
