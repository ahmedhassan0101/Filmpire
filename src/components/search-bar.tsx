import { useMoviesStore } from "@/store";


export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useMoviesStore();

  return (
    <div className="search-bar mb-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
