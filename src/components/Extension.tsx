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
      className="flex items-center mx-auto gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg backdrop-blur-xl"
    >
      <Thermometer className="w-6 h-6 text-blue-200" />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as TemperatureUnit)}
        className="bg-transparent text-white font-semibold rounded-full px-3 py-1 outline-none focus:ring-2 focus:ring-blue-200/40 transition cursor-pointer"
      >
        <option value="celsius" className="bg-slate-800 text-white">
          Celsius
        </option>
        <option value="fahrenheit" className="bg-slate-800 text-white">
          Fahrenheit
        </option>
      </select>
    </motion.div>
  );
};

export default Extension;
