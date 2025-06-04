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
      weekday: "long",
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />;
      case "rain":
        return (
          <CloudRain className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
        );
      case "snow":
        return <CloudSnow className="w-12 h-12 sm:w-16 sm:h-16 text-white" />;
      case "thunderstorm":
        return (
          <CloudLightning className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500" />
        );
      case "drizzle":
        return (
          <CloudDrizzle className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300" />
        );
      default:
        return <Droplets className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />;
    }
  };

  const getUnitSymbol = () => (unit === "celsius" ? "°C" : "°F");
  const getSpeedUnit = () => (unit === "celsius" ? "km/h" : "mph");

  const getDailyForecasts = () => {
    const dailyData: { [key: string]: (typeof data.list)[0][] } = {};

    // Skip today's forecast
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime() / 1000;

    // Group forecasts by day
    data.list.forEach((item) => {
      if (item.dt >= tomorrowTimestamp) {
        const day = new Date(item.dt * 1000).toDateString();
        if (!dailyData[day]) {
          dailyData[day] = [];
        }
        dailyData[day].push(item);
      }
    });

    // Get the middle entry for each day
    return Object.values(dailyData)
      .map((dayForecasts) => dayForecasts[Math.floor(dayForecasts.length / 2)])
      .slice(0, 5); // Ensure we only get 5 days
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:max-w-xl"
    >
      <h3 className="text-white text-lg sm:text-xl mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {dailyForecasts.map((forecast, index) => (
          <motion.div
            key={forecast.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 flex flex-col items-center text-white"
          >
            <p className="text-xs sm:text-sm mb-2">{getDayName(forecast.dt)}</p>
            {getWeatherIcon(forecast.weather[0].main)}
            <p className="text-base sm:text-lg mt-2">
              {Math.round(forecast.main.temp)}
              {getUnitSymbol()}
            </p>

            <div className="mt-2 flex justify-between w-full text-xs opacity-70">
              <div className="flex items-center">
                <Droplets className="w-3 h-3 mr-1" />
                {forecast.main.humidity}%
              </div>
              <div className="flex items-center">
                <Wind className="w-3 h-3 mr-1" />
                {Math.round(forecast.wind.speed)} {getSpeedUnit()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
