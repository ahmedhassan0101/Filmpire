// import { Badge } from "@/components/ui/badge";

import MoviesPage from "@/components/movies";

export default function Movies() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Discover Movies
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore thousands of movies from different genres and categories
          </p>
        </header>
        <MoviesPage />
      </div>
    </div>
  );
}
