import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Package,
  Image as ImageIcon,
  User,
  TrendingUp,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getDashboardStats() {
  const totalProducts = await prisma.product.count();
  const totalImages = await prisma.productImage.count();
  const totalUsers = await prisma.user.count();

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        take: 1,
      },
    },
  });

  return {
    totalProducts,
    totalImages,
    totalUsers,
    recentProducts,
  };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Images",
      value: stats.totalImages,
      icon: ImageIcon,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Admin Users",
      value: stats.totalUsers,
      icon: User,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            <span className="text-blue-600">{session?.user?.name}</span>
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your copper craft store
            today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`bg-gradient-to-r ${stat.gradient} p-6 flex items-center justify-between`}
              >
                <div className="text-white">
                  <p className="text-sm font-medium opacity-90">{stat.title}</p>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
                <stat.icon className="w-16 h-16 text-white opacity-80" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="p-3 bg-blue-600 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Create a new copper product
                </h3>
                <p className="text-sm text-gray-600">
                  Add a new product to your catalog
                </p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all duration-300 border border-green-200"
            >
              <div className="p-3 bg-green-600 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  View and edit all products
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your product inventory
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            Recent Products
          </h2>

          {stats.recentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.recentProducts.map((product) => {
                // ✅ FIXED: Changed url to imageUrl
                const hasImage =
                  product.images &&
                  product.images.length > 0 &&
                  product.images[0].imageUrl &&
                  product.images[0].imageUrl.trim() !== "";

                return (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    {hasImage ? (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={product.images[0].imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.description?.slice(0, 60)}
                        {product.description &&
                          product.description.length > 60 &&
                          "..."}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(product.createdAt).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No products yet. Create your first product!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
