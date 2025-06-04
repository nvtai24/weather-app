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
  return <div></div>;
};

export default App;
