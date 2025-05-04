

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
    <div className="flex flex-wrap gap-2 border-b pb-4">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        className="rounded-full text-white bg-blue-500"
      >
        All Products
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className="rounded-full text-white bg-blue-600" 
        >
          {category.icon} {category.name}
        </Button>
      ))}
    </div>
  )
}
