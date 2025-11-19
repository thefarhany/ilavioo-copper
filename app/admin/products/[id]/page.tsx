import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Package,
  Image as ImageIcon,
  Sparkles,
  FileText,
  Eye,
  Calendar,
  Star,
  ExternalLink,
  Check,
} from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      highlights: true,
      specifications: true,
    },
  });

  return product;
}

export default async function ProductViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    notFound();
  }

  const featuredImage = product.images.find((img) => img.isFeatured);
  const catalogImages = product.images.filter((img) => img.isCatalog);
  const otherImages = product.images.filter(
    (img) => !img.isFeatured && !img.isCatalog
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold"
            >
              <Eye className="w-4 h-4" />
              View Live
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
            >
              <Edit className="w-4 h-4" />
              Edit Product
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Created {new Date(product.createdAt).toLocaleDateString("id-ID")}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              {product.images.length} Images
            </div>
            <span>•</span>
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
              <Check className="w-3 h-3" />
              Published
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Image */}
            {featuredImage && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <h3 className="font-semibold text-gray-900">
                      Featured Image
                    </h3>
                  </div>
                </div>
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={featuredImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Basic Information
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono flex-1">
                      {product.slug}
                    </code>
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </label>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Details */}
                {product.details && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Details
                    </label>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {product.details}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {product.notes && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Notes
                    </label>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-800 text-sm leading-relaxed">
                        {product.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Highlights */}
            {product.highlights.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Product Highlights
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.highlights.length} highlights
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        {highlight.icon && (
                          <span className="text-2xl">{highlight.icon}</span>
                        )}
                        <p className="text-gray-700 text-sm flex-1">
                          {highlight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* All Images */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Product Images
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.images.length} total images
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Catalog Images */}
                {catalogImages.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Catalog Images ({catalogImages.length})
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catalogImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-blue-200"
                        >
                          <Image
                            src={image.imageUrl}
                            alt="Catalog"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                              Catalog
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Images */}
                {otherImages.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Other Images ({otherImages.length})
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {otherImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={image.imageUrl}
                            alt="Product"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Specifications & Meta */}
          <div className="space-y-6">
            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Specifications
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {product.specifications.size && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Size
                      </label>
                      <p className="text-gray-900">
                        {product.specifications.size}
                      </p>
                    </div>
                  )}

                  {product.specifications.material && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Material
                      </label>
                      <p className="text-gray-900">
                        {product.specifications.material}
                      </p>
                    </div>
                  )}

                  {product.specifications.finishing && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Finishing
                      </label>
                      <p className="text-gray-900">
                        {product.specifications.finishing}
                      </p>
                    </div>
                  )}

                  {product.specifications.price && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Price
                      </label>
                      <p className="text-gray-900 font-semibold text-lg">
                        {product.specifications.price}
                      </p>
                    </div>
                  )}

                  {!product.specifications.size &&
                    !product.specifications.material &&
                    !product.specifications.finishing &&
                    !product.specifications.price && (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No specifications added
                      </p>
                    )}
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Meta Information
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">Product ID</label>
                  <p className="text-gray-900 font-mono">{product.id}</p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Created At</label>
                  <p className="text-gray-900">
                    {new Date(product.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Updated At</label>
                  <p className="text-gray-900">
                    {new Date(product.updatedAt).toLocaleString("id-ID")}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Total Images
                  </label>
                  <p className="text-gray-900">{product.images.length}</p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Highlights</label>
                  <p className="text-gray-900">{product.highlights.length}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors text-center font-semibold"
                >
                  Edit Product
                </Link>
                <Link
                  href={`/products/${product.slug}`}
                  target="_blank"
                  className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors text-center font-semibold"
                >
                  View on Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
