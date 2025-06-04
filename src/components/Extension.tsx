import { motion } from "framer-motion";
import { Thermometer } from "lucide-react";
import type { FC } from "react";
import type { TemperatureUnit } from "../types/Weather";

interface ExtensionProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

const Extension: FC<ExtensionProps> = ({ unit, onUnitChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center mx-auto gap-2"
    >
      <Thermometer className="w-5 h-5 text-white" />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as TemperatureUnit)}
        className="bg-blue-400 backdrop-blur-md text-white rounded-lg px-3 py-2 text-sm outline-none cursor-po"
      >
        <option value="celsius" className="">
          Celsius
        </option>
        <option value="fahrenheit">Fahrenheit</option>
      </select>
    </motion.div>
  );
};

export default Extension;
