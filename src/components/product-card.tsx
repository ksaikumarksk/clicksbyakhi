// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Product } from "./cards";

export default function ProductCard({ product ,index }: { product: Product ,index: number }) {

    const handleCardClick = (url: string) => {
        window.open(url, "_blank");
      };
  return (
    <Card
        key={index}
      className="cursor-pointer hover:shadow-lg transition-all h-50 sm:h-full flex flex-col"
        onClick={() => handleCardClick(product.url)}
    >
      <div className="w-full h-52 overflow-hidden rounded-t-md">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full pt-5 object-contain hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      <CardContent className="p-3 pt-0 flex flex-col justify-between flex-1">
        <h3 className="text-base sm:text-lg font-medium truncate mb-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="text-primary font-bold text-sm sm:text-base">
            {product.price.toFixed(2)}
          </span>
          {product.oldPrice > product.price && (
            <span className="text-muted-foreground line-through text-xs">
              {product.oldPrice.toFixed(2)}
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
  );
}
