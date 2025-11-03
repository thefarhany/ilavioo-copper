import Link from "next/link";
import Image from "next/image";
import { Ruler, Sparkles, Package, DollarSign } from "lucide-react";

interface ProductSpecification {
  size?: string | null;
  finishing?: string | null;
  material?: string | null;
  price?: string | null;
}

interface ProductCardProps {
  name: string;
  slug: string;
  description?: string | null;
  imageUrl: string;
  specifications?: ProductSpecification | null;
}

export default function ProductCard({
  name,
  slug,
  description,
  imageUrl,
  specifications,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Product Specifications */}
        {specifications && (
          <div className="space-y-2.5 border-t border-gray-200 pt-4 mt-4">
            {specifications.size && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Size</span>
                </span>
                <span className="text-gray-900 text-right">
                  {specifications.size}
                </span>
              </div>
            )}
            {specifications.finishing && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Finishing</span>
                </span>
                <span className="text-gray-900 text-right">
                  {specifications.finishing}
                </span>
              </div>
            )}
            {specifications.material && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Material</span>
                </span>
                <span className="text-gray-900 text-right">
                  {specifications.material}
                </span>
              </div>
            )}
            {specifications.price && (
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                <span className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Price</span>
                </span>
                <span className="text-gray-900 font-semibold text-right">
                  {specifications.price}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
