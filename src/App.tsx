import { useState } from "react";
import "./App.css";
import Extension from "./components/Extension";
import SearchBar from "./components/SearchBar";
import type { TemperatureUnit } from "./types/Weather";

function App() {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  function handleSearch(city: string): void {
    throw new Error("Function not implemented.");
  }

  function handleUnitChange(unit: TemperatureUnit): void {
    setUnit(unit);
    console.log(`Unit changed to: ${unit}`);
  }

  return (
    <>
      <div className="bg-blue-500 h-screen py-8">
        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={() => {}}
          isLoading={false}
        />

        <Extension unit={unit} onUnitChange={handleUnitChange} />
      </div>
    </>
  );
}

export default App;
