import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "0px" }}
      className="flex flex-wrap gap-2 justify-center mb-8"
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="lg"
          onClick={() => onCategoryChange(category)}
          className={`text-xs font-retro tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 ${
            selectedCategory === category
              ? "bg-st-red text-white border-st-red hover:bg-st-red/80 shadow-[0_0_15px_rgba(229,9,20,0.3)]"
              : "border-st-red/20 text-st-red/60 hover:border-st-red/50 hover:text-st-red hover:bg-st-red/5"
          }`}
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
}