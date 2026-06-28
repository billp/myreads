import Book from './Book.jsx'

// A single shelf: a titled section containing a grid of books.
function Bookshelf({ title, books, onUpdateBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
