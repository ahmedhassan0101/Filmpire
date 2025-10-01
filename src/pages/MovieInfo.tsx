/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMovieInfoLogic } from "@/hooks/useMovieInfoLogic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney, formatRuntime } from "@/lib/utils";
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Film,
  Globe,
  Heart,
  Play,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieInfo() {
  const {
    movie,
    isLoading,
    trailers,
    currentVideo,
    activeVideoIndex,
    setActiveVideoIndex,
    handleCategoryAndGenreClick,
    isInWatchlist,
    isInFavorites,
    handleWatchlistToggle,
    handleFavoriteToggle,
    handleShare,
    isTogglingWatchlist,
    isTogglingFavorite,
    recommendations,
    similar,
  } = useMovieInfoLogic();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!movie) return null;
  return (
    <div className="min-h-[(100vh-4rem)] bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-slate-300 via-slate-350 to-slate-300  text-slate-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/50 dark:from-slate-950 dark:via-transparent dark:to-slate-950/50" />
        </div>
        <div className="relative container mx-auto px-4 pt-24 pb-12">
          <div className="grid lg:grid-cols-[350px_1fr] gap-8 lg:gap-12">
            {/* Poster */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-sm rounded-2xl shadow-2xl ring-1 ring-slate-300 dark:ring-white/10 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Main Info */}
            <div className="space-y-6">
              {/* Title & Tagline */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-700 dark:from-white dark:via-white dark:to-white/70 bg-clip-text text-transparent w-fit">
                  {/* <h1 className="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-white to-white/50 bg-clip-text text-transparent w-fit"> */}
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
                    {movie.original_title}
                  </p>
                )}
                {movie.tagline && (
                  <p className="text-lg text-amber-600 dark:text-amber-400/90 italic font-light">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-500/20 px-4 py-2 rounded-full border border-amber-300 dark:border-amber-500/30">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-amber-900 dark:text-amber-100">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-slate-400">
                    ({movie.vote_count} votes)
                  </span>
                </div>

                {movie.runtime > 0 && (
                  <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 px-4 py-2 rounded-full border border-blue-300 dark:border-blue-500/30">
                    <Clock className="w-4 h-4 text-blue-900 dark:text-blue-100" />
                    <span className="text-blue-900 dark:text-blue-100">
                      {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                )}

                {movie.release_date && (
                  <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-500/20 px-4 py-2 rounded-full border border-purple-300 dark:border-purple-500/30">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-900 dark:text-purple-100">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                )}

                {movie.status && (
                  <Badge
                    variant="outline"
                    className="border-green-400 text-green-700 bg-green-100 dark:border-green-500/30 dark:text-green-400 dark:bg-green-500/10"
                  >
                    {movie.status}
                  </Badge>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <Link
                    key={genre.id}
                    to="/"
                    onClick={() => handleCategoryAndGenreClick(genre.id)}
                  >
                    <Button asChild className="cursor-pointer">
                      <Badge className="bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 px-4 py-1.5">
                        {genre.name}
                      </Badge>
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleFavoriteToggle}
                  disabled={isTogglingWatchlist}
                  className={`${
                    isInFavorites
                      ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                      : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  }
                  border border-slate-700 cursor-pointer text-slate-800 dark:text-slate-200`}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isInFavorites ? "fill-current" : ""
                    }`}
                  />
                  {isInFavorites ? "In Favorites" : "Add to Favorites"}
                </Button>

                <Button
                  onClick={handleWatchlistToggle}
                  disabled={isTogglingFavorite}
                  className={`${
                    isInWatchlist
                      ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  } border border-slate-700 cursor-pointer text-slate-800 dark:text-slate-200`}
                >
                  <Bookmark
                    className={`w-4 h-4 mr-2 ${
                      isInWatchlist ? "fill-current" : ""
                    }`}
                  />
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 cursor-pointer "
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Overview */}
              <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800/50">
                <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                  Overview
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Trailer Section */}
        {trailers.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
              <Play className="w-8 h-8 text-red-500" />
              Trailers & Videos
            </h2>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl ring-1 ring-slate-300 dark:ring-white/10">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo?.key}`}
                  title={currentVideo?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {trailers.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setActiveVideoIndex(Math.max(0, activeVideoIndex - 1))
                    }
                    disabled={activeVideoIndex === 0}
                    className="border-slate-300 dark:border-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-400">
                    {activeVideoIndex + 1} / {trailers.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setActiveVideoIndex(
                        Math.min(trailers.length - 1, activeVideoIndex + 1)
                      )
                    }
                    disabled={activeVideoIndex === trailers.length - 1}
                    className="border-slate-300 dark:border-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
        {/* Cast */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
              <Users className="w-8 h-8 text-purple-500" />
              Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 6).map((person: any) => (
                <Card
                  key={person.id}
                  className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="aspect-[2/3] bg-slate-100 dark:bg-slate-800">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-12 h-12 text-slate-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {person.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                        {person.character}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Movie Details Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movie.budget > 0 && (
            <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold">Budget</h3>
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatMoney(movie.budget)}
                </p>
              </CardContent>
            </Card>
          )}

          {movie.revenue > 0 && (
            <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-lg font-semibold">Revenue</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-400">
                  {formatMoney(movie.revenue)}
                </p>
              </CardContent>
            </Card>
          )}

          {movie.production_countries &&
            movie.production_countries.length > 0 && (
              <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold">Countries</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {movie.production_countries
                      .map((c: any) => c.name)
                      .join(", ")}
                  </p>
                </CardContent>
              </Card>
            )}

          {movie.production_companies &&
            movie.production_companies.length > 0 && (
              <Card className="bg-slate-100 dark:bg-slate-800/50 border-slate-800 md:col-span-2 lg:col-span-3">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Film className="w-6 h-6 text-amber-500" />
                    <h3 className="text-lg font-semibold">
                      Production Companies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {movie.production_companies.map((company: any) => (
                      <div key={company.id} className="flex items-center gap-3">
                        {company.logo_path ? (
                          <>
                            <img
                              src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                              alt={company.name}
                              className="h-8 object-contain brightness-0 invert opacity-70 " // Make logos visible on both light and dark backgrounds
                            />
                          </>
                        ) : (
                          <span className="text-slate-700 dark:text-slate-300">
                            {company.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </section>
        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendations.slice(0, 6).map((rec: any) => (
                <Link key={rec.id} to={`/movie/${rec.id}`} className="block">
                  <Card className=" overflow-hidden transition-all hover:scale-105 cursor-pointer bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50">
                    <CardContent className="p-0">
                      <div className="aspect-[2/3] bg-slate-100 dark:bg-slate-800 relative group">
                        {rec.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                            alt={rec.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-12 h-12 text-slate-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {rec.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {rec.vote_average?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
        {similar && similar.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Similar You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {similar.slice(0, 6).map((sim: any) => (
                <Link key={sim.id} to={`/movie/${sim.id}`} className="block">
                  <Card className=" overflow-hidden  transition-all hover:scale-105 cursor-pointer bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50">
                    <CardContent className="p-0">
                      <div className="aspect-[2/3] bg-slate-100 dark:bg-slate-800 relative group">
                        {sim.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${sim.poster_path}`}
                            alt={sim.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-12 h-12 text-slate-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {sim.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {sim.vote_average?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
