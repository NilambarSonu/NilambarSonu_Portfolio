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
          className={`text-xs font-sans font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 ${
            selectedCategory === category
              ? "bg-[#007fff]/90 text-white border-[#007fff] hover:bg-[#007fff]/80 shadow-[0_0_18px_rgba(0,127,255,0.32)]"
              : "border-[#007fff]/20 text-[#6bc7ff]/70 hover:border-[#007fff]/50 hover:text-[#6bc7ff] hover:bg-[#007fff]/5"
          }`}
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
}
