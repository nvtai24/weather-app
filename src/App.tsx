import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Extension from "./components/Extension";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import type {
  WeatherData,
  ForecastData,
  TemperatureUnit,
} from "./types/Weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [lastSearchCity, setLastSearchCity] = useState<string | null>(null);

  const getUnitParam = (selectedUnit: TemperatureUnit) => {
    return selectedUnit === "celsius" ? "metric" : "imperial";
  };

  const fetchWeatherData = async (
    lat: number,
    lon: number,
    selectedUnit: TemperatureUnit
  ) => {
    try {
      setLoading(true);
      setError(null);
      const unitParam = getUnitParam(selectedUnit);
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `${API_URL}/weather?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
        ),

        axios.get(
          `${API_URL}/forecast?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
        ),
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);

      console.log("Weather Data:", weatherRes.data);
      console.log("Forecast Data:", forecastRes.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch weather data. Please try again 😀");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (
    city: string,
    selectedUnit: TemperatureUnit
  ) => {
    try {
      setLoading(true);
      setError(null);
      const unitParam = getUnitParam(selectedUnit);
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `${API_URL}/weather?q=${city}&units=${unitParam}&appid=${API_KEY}`
        ),

        axios.get(
          `${API_URL}/forecast?q=${city}&units=${unitParam}&appid=${API_KEY}`
        ),
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      setLastSearchCity(city);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch weather data. Please try again 😀");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    setLastSearchCity(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setLastSearchCity(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(
          position.coords.latitude,
          position.coords.longitude,
          unit
        );
      },
      () => {
        setError(
          "Failed to get your location. Please allow location access or search by city!"
        );
        setLoading(false);
      }
    );
  };

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    if (weather) {
      if (lastSearchCity) {
        fetchWeatherByCity(lastSearchCity, newUnit);
      } else if (weather.coord) {
        fetchWeatherData(weather.coord.lat, weather.coord.lon, newUnit);
      }
    }
    setUnit(newUnit);
  };

  const handleSearch = (city: string) => {
    fetchWeatherByCity(city, unit);
  };

  useEffect(() => {
    handleLocationRequest();
  }, []);

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-6 sm:py-8 md:p-8 flex flex-col items-center bg-[url('/public/assets/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 w-full">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            isLoading={isLoading}
          />

          <Extension unit={unit} onUnitChange={handleUnitChange} />

          {/* <WeatherCard data={weather} unit={unit} /> */}
        </div>

        {isLoading && (
          <div className="mt-20 text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Loading weather...</p>
          </div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white mt-4 text-center bg-red-500/20 backdrop:blur-md px-4 py-2 rounded-full max-w-md mx-auto"
          >
            {error}
          </motion.p>
        )}

        {weather?.alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {weather.alert.map((alert, index) => (
              <div
                key={index}
                className="bg-red-500/20 backdrop-blur-md rounded-lg p-4 mb-4 text-white"
              >
                <h3 className="font-bold text-lg">{alert.event}</h3>
                <p className="mt-2 text-sm opacity-90">{alert.description}</p>
                <div className="mt-2 text-xs opacity-70 ">
                  <span>
                    From: {new Date(alert.start * 1000).toLocaleString()}
                  </span>
                  <span className="ml-4">
                    To: {new Date(alert.end * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start justify-center w-full">
          {weather && <WeatherCard data={weather} unit={unit} />}
          {forecast && <Forecast data={forecast} unit={unit} />}
        </div>

        {!weather && !forecast && !isLoading && !error && (
          <div className="mt-20 text-white text-center">
            <p className="text-2xl">Welcome to Weather App</p>
            <p className="mt-2 opacity-70">
              Allow location access or search for a city to get started 😇
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
