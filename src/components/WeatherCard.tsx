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
  Thermometer,
  Wind,
} from "lucide-react";
import type { FC } from "react";
import type { TemperatureUnit, WeatherData } from "../types/Weather";

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const WeatherCard: FC<WeatherCardProps> = ({ data, unit }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case "snow":
        return <CloudSnow className="w-8 h-8 text-white" />;
      case "thunderstorm":
        return <CloudLightning className="w-8 h-8 text-purple-500" />;
      case "drizzle":
        return <CloudDrizzle className="w-8 h-8 text-yellow-300" />;
      default:
        return <Droplets className="w-8 h-8 text-gray-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      hour: "numeric",
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-md rounded-3xl p-4 sm:p-6 lg:p-8  text-white w-full max-w-sm lg:max-w-md"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {/* {data.name} */}
          </h2>
          <span className="text-lg sm:text-xl">{/* {data.sys.country} */}</span>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-center w-full">
        {/* {getWeatherIcon(data.weather[0].main)} */}
        <div className="ml-4">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-light">
            {/* {Math.round(data.main.temp)} {getUnitSymbol()} */}
          </span>
          <p className="text-xl sm:text-xl capitalize">
            {/* {data.weather[0].description} */}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Feels like</p>
              <p className="font-semibold">
                {/* {Math.round(data.main.feels_like)} {getUnitSymbol} */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Humidity</p>
              <p className="font-semibold">
                {/* {Math.round(data.main.humidity)} {getUnitSymbol()} */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Wind</p>
              <p className="font-semibold">
                {/* {Math.round(data.wind.speed)} {getSpeedUnit()} */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Direction</p>
              <p className="font-semibold">
                {/* {getWindDirection(data.wind.deg)} */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Visibility</p>
              <p className="font-semibold">{/* {data.visibility} */}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SunMoon className="w-6 h-6 " />
            <div>
              <p className="opacity-70">Min/Max</p>
              <p className="font-semibold">
                {/* {Math.round(data.main.temp_min)} / {data.main.temp_max}
                {getUnitSymbol()} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
