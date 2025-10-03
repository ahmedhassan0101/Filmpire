/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Star,
  Film,
  Sparkles,
  Bookmark,
  Heart,
  Calendar,
  ImageOff,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserList } from "@/hooks/queries";
import { useAuth } from "@/hooks/useAuth";

// Main Profile Page Component
export default function Profile() {
  const { user, isLoadingUser } = useAuth();

  // Fetch User Lists
  const { data: watchlistData, isLoading: isLoadingWatchlist } = useUserList({
    listName: "watchlist",
    accountId: user?.id.toString() || "",
  });

  const { data: favoritesData, isLoading: isLoadingFavorites } = useUserList({
    listName: "favorite",
    accountId: user?.id.toString() || "",
  });

  // Loading State
  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 dark:border-t-amber-400 rounded-full animate-spin" />
            <User className="w-8 h-8 text-amber-500 dark:text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <User className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Please Login
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You need to belogged in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const gravatarUrl = user.avatar?.gravatar?.hash
    ? `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200&d=mp`
    : null;

  const tmdbAvatarUrl = user.avatar?.tmdb?.avatar_path
    ? `https://www.themoviedb.org/t/p/w200${user.avatar.tmdb.avatar_path}`
    : null;

  const avatarUrl = tmdbAvatarUrl || gravatarUrl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Profile Header */}
          <div className="mb-12">
            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardContent className="p-0">
                {/* Cover Background */}
                <div className="h-48 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
                </div>

                {/* Profile Content */}
                <div className="relative px-6 md:px-8 pb-8">
                  {/* Avatar */}
                  <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20">
                    <div className="relative group">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-slate-950 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={user.username}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-16 h-16 md:w-20 md:h-20 text-slate-400 dark:text-slate-600" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-3 md:mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                          {user.name || user.username}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          @{user.username}
                        </p>
                      </div>

                      {/* User Stats */}
                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1.5">
                          <Globe className="w-3.5 h-3.5 mr-1.5" />
                          {user.iso_3166_1}
                        </Badge>
                        <Badge className="bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-3 py-1.5">
                          <Award className="w-3.5 h-3.5 mr-1.5" />
                          Member
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-4 text-center">
                        <Film className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                          {(watchlistData?.total_results || 0) +
                            (favoritesData?.total_results || 0)}
                        </p>
                        <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                          Total Movies
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4 text-center">
                        <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {watchlistData?.total_results || 0}
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                          Watchlist
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 border-rose-200 dark:border-rose-800">
                      <CardContent className="p-4 text-center">
                        <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-rose-900 dark:text-rose-100">
                          {favoritesData?.total_results || 0}
                        </p>
                        <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                          Favorites
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                      <CardContent className="p-4 text-center">
                        <Star className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                          {user.id}
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          User ID
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Movies Tabs */}
          <Tabs defaultValue="watchlist" className="space-y-6">
            <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 h-auto rounded-xl shadow-sm">
              <TabsTrigger
                value="watchlist"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-blue-700 data-[state=active]:text-white rounded-lg px-6 py-2.5 font-semibold transition-all"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Watchlist
                {watchlistData?.total_results ? (
                  <Badge className="ml-2 bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border-0">
                    {watchlistData.total_results}
                  </Badge>
                ) : null}
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 dark:data-[state=active]:from-rose-600 dark:data-[state=active]:to-rose-700 data-[state=active]:text-white rounded-lg px-6 py-2.5 font-semibold transition-all"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
                {favoritesData?.total_results ? (
                  <Badge className="ml-2 bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 border-0">
                    {favoritesData.total_results}
                  </Badge>
                ) : null}
              </TabsTrigger>
            </TabsList>

            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Your Watchlist
                </h2>
                <Sparkles className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>

              {isLoadingWatchlist ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Loading watchlist...
                  </p>
                </div>
              ) : watchlistData?.results && watchlistData.results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {watchlistData.results.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardContent className="py-12 text-center">
                    <Bookmark className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Your watchlist is empty
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Start adding movies you want to watch later!
                    </p>
                    <Link to="/">
                      <button className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all">
                        Browse Movies
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Your Favorites
                </h2>
                <Sparkles className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              </div>

              {isLoadingFavorites ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-rose-500 dark:border-t-rose-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Loading favorites...
                  </p>
                </div>
              ) : favoritesData?.results && favoritesData.results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {favoritesData.results.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardContent className="py-12 text-center">
                    <Heart className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No favorite movies yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Add movies to your favorites to see them here!
                    </p>
                    <Link to="/">
                      <button className="bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all">
                        Browse Movies
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Movie Card Component
function MovieCard({ movie }: { movie: any }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const ratingPercentage = (movie.vote_average / 10) * 100;

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

          {/* Popularity Badge */}
          {movie.popularity > 500 && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-500/90 dark:bg-red-600/90 text-white border-0 backdrop-blur-md shadow-lg px-2 py-1 flex items-center gap-1 animate-pulse">
                <TrendingUp className="h-3 w-3" />
                <span className="font-bold text-xs">Hot</span>
              </Badge>
            </div>
          )}

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

          {/* Rating Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Rating
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {movie.vote_average.toFixed(1)}
                <span className="text-slate-500 dark:text-slate-500">/10</span>
              </span>
            </div>

            <div className="relative w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 dark:from-amber-500 dark:via-orange-600 dark:to-red-600 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-amber-500/50"
                style={{ width: `${ratingPercentage}%` }}
              />
            </div>
          </div>

          {/* Vote Count */}
          <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
              {movie.vote_count.toLocaleString()} votes
            </span>
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
