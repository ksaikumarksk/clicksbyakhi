// ...imports remain the same

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
// import { Input } from "./ui/input"; // Assuming you're using a custom Input component

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  url: string;
}

export default function Cards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const sorted = [...data.products].reverse(); // Latest products first
        setProducts(sorted);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const handleCardClick = (url: string) => {
    window.open(url, "_blank");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Sticky header with search */}
      <header className="sticky top-0 bg-white z-10 py-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Shop</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Discover amazing products
            </p>
          </div>

          <Input
            type="text"
            placeholder="Search product..."
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Product list */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all h-full flex flex-col"
              onClick={() => handleCardClick(product.url)}
            >
              <div className="w-full h-52 overflow-hidden rounded-t-md">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>

              <CardContent className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-base sm:text-lg font-medium truncate mb-2">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary font-bold text-sm sm:text-base">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-muted-foreground line-through text-xs">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  {product.discount > 0 ? (
                    <Badge className="bg-green-100 text-green-800">
                      {product.discount}% OFF
                    </Badge>
                  ) : (
                    <span />
                  )}
                  <div className="text-yellow-500 font-semibold">
                    ★ {product.rating.toFixed(1)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
