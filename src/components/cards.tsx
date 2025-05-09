import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/categories";
import CategoryTabs from "./category-tabs";
import ProductCard from "./product-card";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number | null;
  category: string;
  url: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://clicksbyakhiadm.vercel.app/api/products"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const sorted = [...data.products].reverse(); // Latest products first
        setProducts(sorted);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log("Products:", products);
  console.log("selectedCategory", selectedCategory);

  useEffect(() => {
    // Filter products based on category and search query

    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      console.log("Selected Category:", selectedCategory);
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // product?.description.toLowerCase().includes(searchQuery.toLowerCase())
      console.log("matchesSearch", matchesSearch);
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="/c.jpeg"
                  className="w-14 h-14 rounded-full object-cover"
                  alt="cba"
                  onClick={() => setSelectedCategory("all")}
                />
                <p className="text-lg font-medium">ClicksByAkhi</p>
              </div>
            </div>

            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            {selectedCategory === "all"
              ? "All Products"
              : `${
                  categories.find((c) => c.id === selectedCategory)?.name
                } Products`}
            {searchQuery && ` matching "${searchQuery}"`}
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No products found. Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
