import { motion } from "framer-motion";
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Compass,
  Droplets,
  Eye,
  Sun,
  SunMoon,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  MapPin,
} from "lucide-react";
import type { FC } from "react";
import type { TemperatureUnit, WeatherData } from "../types/Weather";

interface WeatherCardProps {
  data: WeatherData | null;
  unit: TemperatureUnit;
}

const WeatherCard: FC<WeatherCardProps> = ({ data, unit }) => {
  if (!data) {
    // Skeleton loading
    return (
      <div className="relative bg-white/10 border border-white/30 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 text-white w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto backdrop-blur-2xl overflow-hidden animate-pulse">
        <div className="h-8 w-1/2 bg-white/20 rounded mb-4 mx-auto" />
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/20 rounded-xl" />
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <div className="h-8 w-24 bg-white/20 rounded-xl" />
          <div className="h-8 w-24 bg-white/20 rounded-xl" />
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-20 h-20 text-yellow-400 drop-shadow-lg" />;
      case "clouds":
        return <Cloud className="w-20 h-20 text-sky-200 drop-shadow-lg" />;
      case "rain":
        return <CloudRain className="w-20 h-20 text-blue-400 drop-shadow-lg" />;
      case "snow":
        return <CloudSnow className="w-20 h-20 text-white drop-shadow-lg" />;
      case "thunderstorm":
        return (
          <CloudLightning className="w-20 h-20 text-purple-400 drop-shadow-lg" />
        );
      case "drizzle":
        return (
          <CloudDrizzle className="w-20 h-20 text-yellow-200 drop-shadow-lg" />
        );
      default:
        return <Droplets className="w-20 h-20 text-sky-100 drop-shadow-lg" />;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((deg + 22.5) / 45) % 8;
    return directions[index];
  };

  const getUnitSymbol = () => (unit === "celsius" ? "°C" : "°F");
  const getSpeedUnit = () => (unit === "celsius" ? "km/h" : "mph");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/10 border border-white/30 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 text-white w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto backdrop-blur-2xl overflow-hidden"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent bg-gradient-to-br from-blue-400/30 via-pink-300/20 to-yellow-200/20"
        style={{ zIndex: 0 }}
      />
      {/* City & Country */}
      <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-pink-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg">
            {data.name}
          </h2>
          <span className="text-base sm:text-lg md:text-xl font-semibold text-blue-200/80 ml-1">
            {data.sys.country}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
          {getWeatherIcon(data.weather[0].main)}
          <div className="ml-2 flex flex-col items-start">
            <span className="text-4xl sm:text-5xl md:text-6xl font-light drop-shadow-xl">
              {Math.round(data.main.temp)}
              {getUnitSymbol()}
            </span>
            <span className="text-lg sm:text-xl capitalize text-white/80 font-medium">
              {data.weather[0].description}
            </span>
          </div>
        </div>
      </div>
      {/* Weather details grid */}
      <div className="relative z-10 mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-sm sm:text-base">
        {/* Feels like */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <Thermometer className="w-7 h-7 text-rose-300 mb-1" />
          <span className="text-xs text-white/70">Feels like</span>
          <span className="font-bold text-lg">
            {Math.round(data.main.feels_like)}
            {getUnitSymbol()}
          </span>
        </motion.div>
        {/* Humidity */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <Droplets className="w-7 h-7 text-sky-300 mb-1" />
          <span className="text-xs text-white/70">Humidity</span>
          <span className="font-bold text-lg">
            {Math.round(data.main.humidity)}%
          </span>
        </motion.div>
        {/* Wind */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <Wind className="w-7 h-7 text-cyan-200 mb-1" />
          <span className="text-xs text-white/70">Wind</span>
          <span className="font-bold text-lg">
            {Math.round(data.wind.speed)} {getSpeedUnit()}
          </span>
        </motion.div>
        {/* Wind Direction */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <Compass className="w-7 h-7 text-indigo-200 mb-1" />
          <span className="text-xs text-white/70">Direction</span>
          <span className="font-bold text-lg">
            {getWindDirection(data.wind.deg)}
          </span>
        </motion.div>
        {/* Visibility */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <Eye className="w-7 h-7 text-emerald-200 mb-1" />
          <span className="text-xs text-white/70">Visibility</span>
          <span className="font-bold text-lg">
            {(data.visibility / 1000).toFixed(1)} km
          </span>
        </motion.div>
        {/* Min/Max */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex flex-col items-center bg-white/10 rounded-xl p-3 shadow-md hover:bg-white/20 transition"
        >
          <SunMoon className="w-7 h-7 text-yellow-200 mb-1" />
          <span className="text-xs text-white/70">Min/Max</span>
          <span className="font-bold text-lg">
            {Math.floor(data.main.temp_min)} / {Math.ceil(data.main.temp_max)}
            {getUnitSymbol()}
          </span>
        </motion.div>
      </div>
      {/* Sunrise & Sunset */}
      <div className="relative z-10 mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1 sm:gap-2 bg-white/10 rounded-xl px-2 sm:px-4 py-1 sm:py-2 shadow hover:bg-white/20 transition">
          <Sunrise className="w-6 h-6 text-yellow-300" />
          <span className="text-xs text-white/70">Sunrise</span>
          <span className="font-semibold ml-1">
            {formatTime(data.sys.sunrise)}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 bg-white/10 rounded-xl px-2 sm:px-4 py-1 sm:py-2 shadow hover:bg-white/20 transition">
          <Sunset className="w-6 h-6 text-orange-300" />
          <span className="text-xs text-white/70">Sunset</span>
          <span className="font-semibold ml-1">
            {formatTime(data.sys.sunset)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
