import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type FC } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  onLocationRequest,
  isLoading,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xs sm:max-w-md mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3"
    >
      <form onSubmit={handleSubmit} className="flex-1 relative mb-2 sm:mb-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full h-12 px-6 py-2 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-xl text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-200/40 text-base transition disabled:opacity-60"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-blue-300 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <Search className="w-6 h-6" />
        </button>
      </form>
      <motion.button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400/60 to-pink-300/60 shadow-lg text-white flex items-center justify-center hover:scale-105 hover:shadow-xl transition disabled:opacity-50 border-2 border-white/20 backdrop-blur-xl"
        onClick={onLocationRequest}
        type="button"
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
      >
        <MapPin className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};

export default SearchBar;
