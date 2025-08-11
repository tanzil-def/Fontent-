// import BookCard from "../BookCard/BookCard";

// export default function Section({ title, books }) {
//   return (
//     <div className="mb-12">
//       <h2 className="text-lg font-bold mb-4">{title}</h2>
//       <div className="flex flex-wrap gap-8">
//         {books.map((book) => (
//           // Pass the entire book object to BookCard. Ensure the key is unique.
// <BookCard
//   id={book.id}
//   title={book.title}
//   author={book.author}
//   image={book.image}
// />
//         ))}
//       </div>
//     </div>
//   );
// }

// // components/Section/Section.jsx
// import BookCard from "../BookCard/BookCard";

// export default function Section({ title, books }) {
//   return (
//     <div className="mb-12">
//       <h2 className="text-lg font-bold mb-4">{title}</h2>
//       <div className="flex flex-wrap gap-8">
//         {books.map((book) => (
//           <BookCard
//             key={book.id}          // ✅ ensure a stable key
//             id={book.id}
//             title={book.title}
//             author={book.author}
//             image={book.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// components/Section/Section.jsx
import BookCard from "../BookCard/BookCard";

export default function Section({ title, books }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Switched to a responsive grid with generous spacing.
         - 2 columns on small screens, 3 on md, 4 on lg+
         - Large horizontal & vertical gaps
         - Center each fixed-width BookCard within its cell */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-12 sm:gap-x-14 lg:gap-x-20 gap-y-10 lg:gap-y-14">
        {books.map((book) => (
          <BookCard
            key={book.id}          // ✅ ensure a stable key
            id={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
}

