import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMoviesStore } from "@/store/movies-store"; // zustand store

export default function Search() {
  // Get search query from store and setter function
  const { searchQuery, setSearchQuery, clearSearch } = useMoviesStore();

  // Local state for input value (to handle typing without triggering API calls)
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local query with store query when store changes (like when clearing from elsewhere)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && localQuery.trim()) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (localQuery.trim()) {
      // Update the store with the search query
      setSearchQuery(localQuery.trim());
      console.log("Searching for:", localQuery.trim());
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    clearSearch(); // Clear both local and store state
    inputRef.current?.focus();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  // Handle Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <div className={`relative flex items-center transition-all duration-200`}>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pr-20 h-10 border-border"
        />

        {/* Clear Button */}
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 h-6 w-6 p-0 hover:bg-secondary cursor-pointer"
          >
            <X className="w-3 h-3" />
          </Button>
        )}

        {/* Search Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSearch}
          disabled={!localQuery.trim()}
          className="absolute right-1 h-8 w-8 p-0 hover:bg-secondary disabled:opacity-50 cursor-pointer"
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Shortcut Hint */}
      {!isFocused && !localQuery && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none hidden sm:block">
          <kbd className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            <span>⌘</span>K
          </kbd>
        </div>
      )}
    </div>
  );
}
