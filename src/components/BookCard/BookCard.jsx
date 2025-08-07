import { Link } from "react-router-dom";

export default function BookCard({ id, title, author, image }) {
  return (
    // The entire card is wrapped in a Link, which will navigate to `/book/THE_BOOK_ID`
    <Link to={`/book/${id}`} className="w-[140px] space-y-1 block group">
      <div className="w-full h-48 overflow-hidden rounded shadow">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h4 className="text-sm font-semibold mt-2 group-hover:text-sky-600">{title}</h4>
      <p className="text-xs text-gray-500">{author}</p>
    </Link>
  );
}