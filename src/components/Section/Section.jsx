import BookCard from "../BookCard/BookCard";

export default function Section({ title, books }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-8">
        {books.map((book) => (
          // Pass the entire book object to BookCard. Ensure the key is unique.
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}