import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoviesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MoviesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: MoviesPaginationProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Calculate page numbers to show
  const getVisiblePages = () => {
    const delta = 1; // Pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page (if it's different from first)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add dots where there are gaps
    for (let i = 0; i < uniqueRange.length; i++) {
      if (i > 0 && uniqueRange[i] - uniqueRange[i - 1] > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(uniqueRange[i]);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Smooth scroll to top with offset for navbar
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="flex flex-col items-center space-y-6">
        {/* Page Info Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-6 py-3 shadow-sm">
          <div className="text-sm text-slate-700 dark:text-slate-300">
            Page{" "}
            <span className="font-bold text-amber-600 dark:text-amber-400 text-lg mx-1">
              {currentPage.toLocaleString()}
            </span>
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalPages.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* First Page Button (Desktop) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= 1}
            className="hidden md:inline-flex h-10 w-10 p-0 border-slate-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-all"
            title="First Page"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>

          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-10 w-10 p-0 border-slate-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-all"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {/* Page Numbers (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            {visiblePages.map((page, index) => {
              if (page === "...") {
                return (
                  <div
                    key={`dots-${index}`}
                    className="h-10 w-10 flex items-center justify-center text-slate-400 dark:text-slate-600"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                );
              }

              const pageNumber = page as number;
              const isCurrentPage = pageNumber === currentPage;

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className={`h-10 w-10 p-0 font-semibold transition-all ${
                    isCurrentPage
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105"
                      : "border-slate-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          {/* Mobile: Current Page Indicator */}
          <div className="sm:hidden flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white rounded-lg font-bold shadow-lg">
            <span className="text-lg">{currentPage}</span>
            <span className="text-sm opacity-80">/ {totalPages}</span>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-10 w-10 p-0 border-slate-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-all"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>

          {/* Last Page Button (Desktop) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="hidden md:inline-flex h-10 w-10 p-0 border-slate-300 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-all"
            title="Last Page"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>

        {/* Quick Jump Controls (Desktop & Large Tablets) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
            disabled={currentPage <= 10}
            className="h-9 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 disabled:opacity-40 transition-all"
          >
            -10 Pages
          </Button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 10))
            }
            disabled={currentPage >= totalPages - 9}
            className="h-9 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 disabled:opacity-40 transition-all"
          >
            +10 Pages
          </Button>

          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-md">
          <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
