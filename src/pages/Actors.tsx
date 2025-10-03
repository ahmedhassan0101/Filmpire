import MoviesPagination from "@/components/movies/movies-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActor, useMoviesByActor } from "@/hooks/queries";
import type { MovieDetails } from "@/types";
import {
  User,
  Calendar,
  MapPin,
  Star,
  Film,
  Sparkles,
  Award,
  TrendingUp,
  Info,
  ImageOff,
  ExternalLink,

} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Main Actor Page Component
export default function Actors() {
  const { id } = useParams() as { id: string };
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch actor data and movies
  const { data: actor, isLoading: isLoadingActor } = useActor(id);
  const { data: actorMoviesData, isLoading: isLoadingMovies } =
    useMoviesByActor({
      id,
      page: currentPage,
    });

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Loading State
  if (isLoadingActor || isLoadingMovies) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 dark:border-t-amber-400 rounded-full animate-spin" />
            <User className="w-8 h-8 text-amber-500 dark:text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            Loading actor profile...
          </p>
        </div>
      </div>
    );
  }

  if (!actor) return null;

  const age = actor.birthday ? calculateAge(actor.birthday) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Actor Profile Header */}
          <div className="grid lg:grid-cols-[350px_1fr] gap-8 lg:gap-12 mb-12">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group h-fit" >
                <div className="w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-300 dark:ring-white/10">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                      <User className="w-24 h-24 text-slate-400 dark:text-slate-600" />
                    </div>
                  )}
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-500 to-purple-500 dark:from-amber-400 dark:to-purple-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
              </div>
            </div>

            {/* Actor Info */}
            <div className="space-y-6">
              {/* Name & Title */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-purple-500 dark:from-amber-600 dark:to-purple-600 flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {actor.name}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {actor.known_for_department && (
                    <Badge className="bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-4 py-1.5 text-sm font-semibold">
                      <Film className="w-3.5 h-3.5 mr-1.5" />
                      {actor.known_for_department}
                    </Badge>
                  )}

                  {/* IMDb Link */}
                  {actor.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${actor.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        View on IMDb
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actor.birthday && (
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          Age
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {age}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Born{" "}
                        {new Date(actor.birthday).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {actor.place_of_birth && (
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                          Birthplace
                        </span>
                      </div>
                      <p className="text-sm font-bold text-purple-900 dark:text-purple-100 line-clamp-2">
                        {actor.place_of_birth}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                        Popularity
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                      {actor.popularity.toFixed(1)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Biography */}
              {actor.biography && (
                <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Biography
                      </h2>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {actor.biography}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Also Known As */}
              {actor.also_known_as && actor.also_known_as.length > 0 && (
                <Card className="bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Also Known As
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {actor.also_known_as
                        .slice(0, 6)
                        .map((name: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {name}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Movies Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-purple-500 dark:from-amber-400 dark:to-purple-400 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Movies & TV Shows
              </h2>
              <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            </div>

            {actorMoviesData?.results && actorMoviesData.results.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {actorMoviesData.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                {/* Pagination */}
                {actorMoviesData.total_pages > 1 && (
                  <MoviesPagination
                    currentPage={currentPage}
                    totalPages={actorMoviesData.total_pages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No movies found for this actor.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// Movie Card Component
function MovieCard({ movie }: { movie: MovieDetails }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 hover:scale-[1.02] hover:-translate-y-1">
        {/* Movie Poster */}
        <div className="aspect-[2/3] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          {posterUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
              )}
              <img
                src={posterUrl}
                alt={movie.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                } group-hover:scale-110`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
              <ImageOff className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-2" />
              <span className="text-xs text-slate-500 dark:text-slate-500">
                No Image
              </span>
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-slate-900/90 dark:bg-slate-950/90 text-white border-0 backdrop-blur-md hover:bg-slate-900 shadow-lg px-2.5 py-1 flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="font-bold text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </Badge>
          </div>

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Overview on Hover */}
          {movie.overview && (
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-xs leading-relaxed line-clamp-4 drop-shadow-lg">
                {movie.overview}
              </p>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50">
          <div className="space-y-2">
            <h3 className="font-bold text-sm leading-snug line-clamp-2 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors min-h-[2.5rem]">
              {movie.title}
            </h3>

            {releaseYear && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Calendar className="h-3 w-3" />
                <span className="text-xs font-medium">{releaseYear}</span>
              </div>
            )}
          </div>
        </div>

        {/* Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/50 dark:border-amber-400/50" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 opacity-20 blur-xl" />
        </div>
      </div>
    </Link>
  );
}
