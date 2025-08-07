const genres = ["All Genres", "Business", "Science", "Fiction", "Philosophy", "Biography"];
const recommendations = ["Artist of the Month", "Book of the Year", "Top Genre", "Trending"];

export default function Sidebar() {
  return (
    <>
      {/* Mobile Sidebar (hidden on desktop) */}
      <div className="md:hidden bg-white p-4 mb-4 border-b">
        <details className="dropdown">
          <summary className="btn btn-sm btn-ghost">☰ Menu</summary>
          <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div>
              <h3 className="text-sm font-bold mb-2">Book by Genre</h3>
              <ul>
                {genres.map((genre) => (
                  <li
                    key={genre}
                    className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold mb-2">Recommendations</h3>
              <ul>
                {recommendations.map((item) => (
                  <li
                    key={item}
                    className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 h-[calc(100vh-180px)] sticky top-28 overflow-y-auto">
        <div>
          <h3 className="text-sm font-bold mb-2">Book by Genre</h3>
          <ul className="space-y-1">
            {genres.map((genre) => (
              <li
                key={genre}
                className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-bold mb-2">Recommendations</h3>
          <ul className="space-y-1">
            {recommendations.map((item) => (
              <li
                key={item}
                className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}