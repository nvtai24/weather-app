export interface Coord {
  lat: number; // latitude
  lon: number; // longitude
}

export interface Weather {
  coord: Coord; // coordinates of the city
  name: string; // city name
  main: {
    temp: number; // current temperature
    feels_like: number; // temperature perceived by humans
    temp_min: number; // minimum temperature at the moment
    temp_max: number; // maximum temperature at the moment
    humidity: number; // humidity percentage
  };

  weather: {
    main: string; // main weather condition (e.g., Clear, Rain, Snow)
    description: string; // weather condition description (e.g., clear sky, light rain)
  }[];

  wind: {
    speed: number; // wind speed in m/s
    deg: number; // wind direction in degrees
  };

  sys: {
    country: string; // country code (e.g., US, GB)
    sunrise: number; // sunrise time in Unix timestamp
    sunset: number; // sunset time in Unix timestamp
  };

  visibility: number; // visibility in meters

  alert?: {
    event: string; // type of alert (e.g., Thunderstorm, Flood)
    description: string; // description of the alert
    start: number; // start time of the alert in Unix timestamp
    end: number; // end time of the alert in Unix timestamp
  }[];
}

export interface WeatherForecast {
  list: {
    dt: number; // forecast time in Unix timestamp
    main: {
      temp: number; // temperature at the time of forecast
      feels_like: number; // perceived temperature
      humidity: number; // humidity percentage
    };
    weather: {
      main: string; // main weather condition (e.g., Clear, Rain, Snow)
    }[]; // array of weather conditions

    wind: {
      speed: number; // wind speed in m/s
    };

    pop: number; // probability of precipitation (0-1 scale)
  }[]; // array of forecast data
}

export type TemperatureUnit = "celsius" | "fahrenheit";
