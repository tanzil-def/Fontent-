import BookCard from "../BookCard/BookCard";

export default function Section({ title, books,  loading, error  }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {loading ? (
        <p className="text-center text-sm text-gray-500">Loading {title.toLowerCase()} books...</p>
      ) : error ? (
        <p className="text-center text-sm text-red-500">Failed to load {title.toLowerCase()} books.</p>
      ) : (
        <div className="flex flex-wrap gap-8">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
}