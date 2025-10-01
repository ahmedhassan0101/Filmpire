import MoviesPage from "@/components/movies";
import { Film, Sparkles, TrendingUp } from "lucide-react";

export default function Movies() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-orange-500/5 dark:bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Header Section */}
          <header className="mb-10 md:mb-12 space-y-6">
            <div className="flex items-start gap-4">
              {/* Icon Badge */}
              <div className="relative group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                  <Film className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </div>

              <div className="flex-1 space-y-3">
                {/* Title */}
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    Discover Movies
                  </h1>
                  <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-amber-500 dark:text-amber-400 animate-pulse" />
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Explore thousands of movies from different genres and
                  categories. Find your next favorite film.
                </p>

                {/* Stats/Features Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-amber-200 dark:border-amber-800">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Trending Now</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700">
                    <Film className="w-3.5 h-3.5" />
                    <span>10,000+ Movies</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Updated Daily</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
            </div>
          </header>

          {/* Movies Content */}
          <MoviesPage />
        </div>
      </div>
    </div>
  );
}

// // import { Badge } from "@/components/ui/badge";

// import MoviesPage from "@/components/movies";

// export default function Movies() {
//   return (
//     <div className="bg-background">
//       <div className="container mx-auto px-6 py-8">
//         <header className="mb-8">
//           <h1 className="text-4xl font-bold tracking-tight mb-2">
//             Discover Movies
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             Explore thousands of movies from different genres and categories
//           </p>
//         </header>
//         <MoviesPage />
//       </div>
//     </div>
//   );
// }
