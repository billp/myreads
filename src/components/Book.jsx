// A single book card with a shelf-changer control.
// `shelf` defaults to "none" so books not on any shelf (e.g. search results)
// show "Move to..." as the current selection.
function Book({ book, onUpdateBook }) {
  const shelf = book.shelf || 'none'
  const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : ''
  const authors = book.authors || []

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: thumbnail ? `url("${thumbnail}")` : 'none',
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={(e) => onUpdateBook(book, e.target.value)}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  )
}

export default Book
