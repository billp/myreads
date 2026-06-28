import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book.jsx'

// The search page. Results are "raw" books that don't know their shelf, so we
// merge in the current shelf from the app's `books` at render time. That keeps
// the dropdown in sync even after a book is moved from the search page.
function SearchBooks({ books, onUpdateBook }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  // Tracks the latest query so out-of-order async responses can be discarded.
  const latestQuery = useRef('')

  const handleSearch = (value) => {
    setQuery(value)
    latestQuery.current = value

    const trimmed = value.trim()
    if (trimmed === '') {
      setResults([])
      return
    }

    BooksAPI.search(trimmed).then((res) => {
      // Ignore a late response if the user has since typed something else.
      if (value !== latestQuery.current) return
      // The API returns an object with `error` (no array) when nothing matches.
      setResults(Array.isArray(res) ? res : [])
    })
  }

  // Look up the shelf a result currently lives on (if any).
  const shelfFor = (bookId) => {
    const match = books.find((b) => b.id === bookId)
    return match ? match.shelf : 'none'
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <li key={book.id}>
              <Book
                book={{ ...book, shelf: shelfFor(book.id) }}
                onUpdateBook={onUpdateBook}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default SearchBooks
