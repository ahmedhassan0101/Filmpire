// import { useMoviesStore } from "@/store";

import { useMoviesStore } from "@/store/movies-store";

export default function CategoriesBar() {
  const { genreIdOrCategoryName, setGenreOrCategory } = useMoviesStore();

  const categories = [
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
    { value: "now_playing", label: "Now Playing" },
  ];

  return (
    <div className="categories-bar mb-4">
      <h3 className="mb-2">Categories</h3>
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setGenreOrCategory(category.value)}
            className={`px-3 py-1 rounded ${
              genreIdOrCategoryName === category.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
