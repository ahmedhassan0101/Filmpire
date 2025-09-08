// src/components/MoviesPagination.tsx
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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
    const delta = 2; // Pages to show on each side of current page
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
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Page Info */}
        <div className="text-sm text-muted-foreground">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages.toLocaleString()}</span>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-9 w-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {/* First page and ellipsis (mobile) */}
          <div className="hidden sm:flex items-center space-x-1">
            {visiblePages.map((page, index) => {
              if (page === "...") {
                return (
                  <div
                    key={`dots-${index}`}
                    className="h-9 w-9 flex items-center justify-center"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
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
                  className={`h-9 w-9 p-0 ${
                    isCurrentPage
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          {/* Mobile: Show only current page info */}
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm font-medium px-3 py-1 bg-primary text-primary-foreground rounded">
              {currentPage}
            </span>
            <span className="text-sm text-muted-foreground">
              of {totalPages}
            </span>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-9 w-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        {/* Quick Jump (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-4 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
            disabled={currentPage <= 10}
          >
            -10
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 10))
            }
            disabled={currentPage >= totalPages - 9}
          >
            +10
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
