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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back,{" "}
            <span className="font-semibold">{session?.user?.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-4 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  Add New Product
                </h3>
                <p className="text-sm text-gray-600">
                  Create a new copper product
                </p>
              </div>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                  Manage Products
                </h3>
                <p className="text-sm text-gray-600">
                  View and edit all products
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Products - SOLUSI UNTUK EMPTY STRING */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Products
          </h2>
          <div className="space-y-3">
            {stats.recentProducts.length > 0 ? (
              stats.recentProducts.map((product) => {
                // Cek apakah ada gambar dan URL tidak kosong
                const hasValidImage =
                  product.images &&
                  product.images.length > 0 &&
                  product.images[0].url &&
                  product.images[0].url.trim() !== "";

                return (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      {hasValidImage ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          onError={(e) => {
                            // Fallback jika gambar gagal load
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  No products yet. Create your first product!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
