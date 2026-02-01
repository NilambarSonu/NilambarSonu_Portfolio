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
          className="text-sm font-semibold px-6 py-3"
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
}