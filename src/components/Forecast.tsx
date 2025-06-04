import type { FC } from "react";
import type { ForecastData, TemperatureUnit } from "../types/Weather";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Droplets,
  Wind,
} from "lucide-react";

interface ForecastProps {
  data: ForecastData;
  unit: TemperatureUnit;
}

const Forecast: FC<ForecastProps> = ({ data, unit }) => {
  const getDayName = (timeStamp: number) => {
    return new Date(timeStamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-12 h-12 text-yellow-400 drop-shadow-lg" />;
      case "clouds":
        return <Cloud className="w-12 h-12 text-sky-200 drop-shadow-lg" />;
      case "rain":
        return <CloudRain className="w-12 h-12 text-blue-400 drop-shadow-lg" />;
      case "snow":
        return <CloudSnow className="w-12 h-12 text-white drop-shadow-lg" />;
      case "thunderstorm":
        return (
          <CloudLightning className="w-12 h-12 text-purple-400 drop-shadow-lg" />
        );
      case "drizzle":
        return (
          <CloudDrizzle className="w-12 h-12 text-yellow-200 drop-shadow-lg" />
        );
      default:
        return <Droplets className="w-12 h-12 text-sky-100 drop-shadow-lg" />;
    }
  };

  const getUnitSymbol = () => (unit === "celsius" ? "°C" : "°F");
  const getSpeedUnit = () => (unit === "celsius" ? "km/h" : "mph");

  const getDailyForecasts = () => {
    const dailyData: { [key: string]: (typeof data.list)[0][] } = {};
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime() / 1000;
    data.list.forEach((item) => {
      if (item.dt >= tomorrowTimestamp) {
        const day = new Date(item.dt * 1000).toDateString();
        if (!dailyData[day]) {
          dailyData[day] = [];
        }
        dailyData[day].push(item);
      }
    });
    return Object.values(dailyData)
      .map((dayForecasts) => dayForecasts[Math.floor(dayForecasts.length / 2)])
      .slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-xs sm:max-w-lg md:lg:max-w-xl"
    >
      <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-4 tracking-tight drop-shadow-lg">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {dailyForecasts.map((forecast, index) => (
          <motion.div
            key={forecast.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.07 }}
            className="relative bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 flex flex-col items-center text-white shadow-xl backdrop-blur-xl overflow-hidden transition"
            style={{ boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.18)" }}
          >
            {/* Gradient border overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent bg-gradient-to-br from-blue-400/20 via-pink-300/10 to-yellow-200/10"
              style={{ zIndex: 0 }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-white/80 tracking-wide">
                {getDayName(forecast.dt)}
              </p>
              {getWeatherIcon(forecast.weather[0].main)}
              <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 drop-shadow-xl">
                {Math.round(forecast.main.temp)}
                {getUnitSymbol()}
              </p>
              <div className="mt-1 sm:mt-2 flex flex-col gap-0.5 sm:gap-1 w-full text-xs opacity-80">
                <div className="flex items-center justify-center gap-1">
                  <Droplets className="w-4 h-4 mr-1 text-sky-200" />
                  {forecast.main.humidity}%
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Wind className="w-4 h-4 mr-1 text-cyan-200" />
                  {Math.round(forecast.wind.speed)} {getSpeedUnit()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
