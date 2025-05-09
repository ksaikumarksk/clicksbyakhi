

import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  icon: string
}

interface CategoryTabsProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {

  return (
      <div className="sticky flex flex-wrap gap-2 border-b pb-4">
      
      <div
        className="flex overflow-x-auto space-x-4 px-10 scrollbar-hide scrollbar-thumb-gray-200 scrollbar-track-gray-100"
      >
        <Button
        // variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        className={`${
            selectedCategory === "all"
              ? "bg-green-800 text-black hover:bg-green-900"
              : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          }`}
      > 
        All Products
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className={`${
            selectedCategory === category.id ?
              "bg-green-300 text-black hover:bg-green-400"
              : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          }`} 
        >
          {category.icon} {category.name}
        </Button>
      ))}
      </div>
    </div>
      
  )
}
