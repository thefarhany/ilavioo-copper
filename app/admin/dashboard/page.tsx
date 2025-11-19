import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Image as ImageIcon,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getDashboardStats() {
  const [totalProducts, totalImages] = await Promise.all([
    prisma.product.count(),
    prisma.productImage.count(),
  ]);

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { isFeatured: true },
        take: 1,
      },
    },
  });

  return {
    totalProducts,
    totalImages,
    recentProducts,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/products/new"
          className="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <Plus className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Add Product</h3>
            <p className="text-white/80 text-sm">Create new product</p>
          </div>
        </Link>

        <Link
          href="/admin/products"
          className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Manage Products</h3>
            <p className="text-white/80 text-sm">View all products</p>
          </div>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <Eye className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">View Website</h3>
            <p className="text-white/80 text-sm">Check live site</p>
          </div>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
              <TrendingUp className="w-3 h-3" />
              Active
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1 font-medium">
              Total Products
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
          </div>
        </div>

        {/* Total Images */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              <TrendingUp className="w-3 h-3" />
              Growing
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1 font-medium">
              Total Images
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalImages}
            </p>
          </div>
        </div>

        {/* Average Images per Product */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
              Avg
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1 font-medium">
              Images per Product
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalProducts > 0
                ? Math.round((stats.totalImages / stats.totalProducts) * 10) /
                  10
                : 0}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700">
              Recent
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1 font-medium">
              Latest Products
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.recentProducts.length}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Recent Products
              </h3>
              <p className="text-sm text-gray-500">
                Latest additions to catalog
              </p>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {stats.recentProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-1">No products yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Get started by creating your first product
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recentProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.images[0]?.imageUrl ? (
                      <Image
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
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
                    <p className="text-sm text-gray-500 truncate">
                      {product.description || "No description"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-600 font-medium">
                      {new Date(product.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
