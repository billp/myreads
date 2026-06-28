import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.jsx'

// The three shelves rendered on the main page, in display order.
const SHELVES = [
  { key: 'currentlyReading', title: 'Currently Reading' },
  { key: 'wantToRead', title: 'Want to Read' },
  { key: 'read', title: 'Read' },
]

// The main page: shows every shelf with the books that belong to it.
function ListBooks({ books, onUpdateBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <div>
          {SHELVES.map((shelf) => (
            <Bookshelf
              key={shelf.key}
              title={shelf.title}
              books={books.filter((book) => book.shelf === shelf.key)}
              onUpdateBook={onUpdateBook}
            />
          ))}
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks
