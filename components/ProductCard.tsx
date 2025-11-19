"use client";

import Link from "next/link";
import Image from "next/image";
import { Ruler, Sparkles, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  variant?: "default" | "compact"; // Optional: untuk variasi tampilan
}

export default function ProductCard({
  name,
  slug,
  description,
  imageUrl,
  specifications,
  variant = "default",
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative bg-white rounded-2xl border-2 border-gray-100 shadow-md hover:shadow-2xl hover:border-green-200 transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-gray-50 ${
            variant === "compact" ? "h-48" : "h-64"
          }`}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Badge - if available */}
          {specifications?.price && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-full shadow-lg font-semibold text-xs sm:text-sm backdrop-blur-sm">
              {specifications.price}
            </div>
          )}

          {/* "View Details" overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 text-green-600 font-semibold rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* Product Name */}
          <h3
            className={`font-display font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 ${
              variant === "compact" ? "text-lg" : "text-xl"
            }`}
          >
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Specifications Grid */}
          {specifications && (
            <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Size */}
                {specifications.size && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Size</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {specifications.size}
                      </p>
                    </div>
                  </div>
                )}

                {/* Finishing */}
                {specifications.finishing && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-copper-50 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-copper-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Finish</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {specifications.finishing}
                      </p>
                    </div>
                  </div>
                )}

                {/* Material */}
                {specifications.material && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Material</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {specifications.material}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button - Hidden, shown on hover */}
          <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-center rounded-lg font-semibold text-xs sm:text-sm shadow-md">
              View Product
            </div>
          </div>
        </div>

        {/* Decorative Corner Accent */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-br-full transform -translate-x-8 -translate-y-8 sm:-translate-x-10 sm:-translate-y-10 group-hover:scale-150 transition-transform duration-500" />
      </motion.div>
    </Link>
  );
}
