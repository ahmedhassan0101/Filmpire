import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMoviesStore } from "@/store/movies-store"; // zustand store
import { useNavigate } from "react-router-dom";

export default function Search() {
  // Get search query from store and setter function
  const { searchQuery, setSearchQuery, clearSearch } = useMoviesStore();
  const navigate = useNavigate();
  // Local state for input value (to handle typing without triggering API calls)
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      navigate("/");
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    clearSearch();
    inputRef.current?.focus();
    // navigate("/"); 
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex items-center group">
        {/* Search Icon (Left) */}
        <div className="absolute left-3 flex items-center pointer-events-none">
          <SearchIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-amber-500 dark:group-focus-within:text-amber-400 transition-colors" />
        </div>

        {/* Input Field */}
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-24 h-10 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-600 focus-visible:border-amber-500 dark:focus-visible:border-amber-600 transition-all rounded-lg"
        />

        {/* Right Side Actions */}
        <div className="absolute right-1 flex items-center gap-1">
          {/* Clear Button */}
          {localQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}

          {/* Search Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            disabled={!localQuery.trim()}
            className="h-7 w-7 p-0 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed rounded-md transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Keyboard Shortcut Hint */}
        {!isFocused && !localQuery && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
            <kbd className="inline-flex items-center gap-1 px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded text-xs font-medium shadow-sm">
              <span className="text-xs">⌘</span>
              <span>K</span>
            </kbd>
          </div>
        )}
      </div>

      {/* Focus Ring Effect */}
      {isFocused && (
        <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/5 dark:bg-amber-400/5 blur-xl transition-opacity" />
      )}
    </div>
  );
}
