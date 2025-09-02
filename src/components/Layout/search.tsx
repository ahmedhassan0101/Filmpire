import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Add your search logic here
      console.log("Searching for:", query.trim());
      // Example: dispatch(searchMovie(query.trim()));
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
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
        <SearchIcon className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />

        <Input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-10 pr-20 h-10 bg-background/60 backdrop-blur-sm border-border/60 transition-all duration-200 ${
            isFocused
              ? "bg-background border-primary/50"
              : "hover:bg-background/80 hover:border-border"
          }`}
        />

        {/* Clear Button */}
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 h-6 w-6 p-0 hover:bg-secondary"
          >
            <X className="w-3 h-3" />
          </Button>
        )}

        {/* Search Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSearch}
          disabled={!query.trim()}
          className="absolute right-1 h-8 w-8 p-0 hover:bg-secondary disabled:opacity-50"
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Shortcut Hint */}
      {!isFocused && !query && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none hidden sm:block">
          <kbd className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            <span>⌘</span>K
          </kbd>
        </div>
      )}
    </div>
  );
}
