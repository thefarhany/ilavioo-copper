"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ExternalLink, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  images: Array<{ url: string }>;
}

interface RecentProductsProps {
  products: Product[];
}

export default function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              Recent Products
            </h3>
            <p className="text-sm text-gray-500">Latest additions to catalog</p>
          </div>
        </div>
        <Link
          href="/admin/products"
          className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
        >
          View All
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Products List */}
      <div className="divide-y divide-gray-100">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No products yet</p>
            <Link
              href="/admin/products/new"
              className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Added {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
