import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Package,
  Image as ImageIcon,
  Sparkles,
  FileText,
} from "lucide-react";
import { notFound } from "next/navigation";

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
  params: { id: string };
}) {
  const product = await getProduct(parseInt(params.id));

  if (!product) {
    notFound();
  }

  const featuredImage = product.images.find((img) => img.isFeatured);
  const catalogImages = product.images.filter((img) => img.isCatalog);
  const otherImages = product.images.filter(
    (img) => !img.isFeatured && !img.isCatalog
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/products"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-600 mt-1">Product Details</p>
            </div>
          </div>
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="flex items-center space-x-2 bg-copper-600 hover:bg-copper-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Edit size={20} />
            <span className="font-semibold">Edit Product</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Package className="mr-2 text-copper-600" size={24} />
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Product Name
                  </label>
                  <p className="text-gray-900 text-lg font-semibold">
                    {product.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Slug
                  </label>
                  <p className="text-gray-900">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                      {product.slug}
                    </code>
                  </p>
                </div>
                {product.description && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Description
                    </label>
                    <p className="text-gray-900 mt-1">{product.description}</p>
                  </div>
                )}
                {product.details && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Details
                    </label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                      {product.details}
                    </p>
                  </div>
                )}
                {product.notes && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Notes
                    </label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                      {product.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-2 text-copper-600" size={24} />
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.size && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-600">
                        Size
                      </label>
                      <p className="text-gray-900 font-medium">
                        {product.specifications.size}
                      </p>
                    </div>
                  )}
                  {product.specifications.finishing && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-600">
                        Finishing
                      </label>
                      <p className="text-gray-900 font-medium">
                        {product.specifications.finishing}
                      </p>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-600">
                        Material
                      </label>
                      <p className="text-gray-900 font-medium">
                        {product.specifications.material}
                      </p>
                    </div>
                  )}
                  {product.specifications.price && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-600">
                        Price
                      </label>
                      <p className="text-gray-900 font-medium">
                        {product.specifications.price}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Highlights */}
            {product.highlights.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="mr-2 text-copper-600" size={24} />
                  Highlights
                </h2>
                <div className="space-y-3">
                  {product.highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {highlight.icon && (
                        <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded">
                          {highlight.icon}
                        </span>
                      )}
                      <p className="text-gray-900 flex-1">{highlight.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Images */}
          <div className="space-y-6">
            {/* Featured Image */}
            {featuredImage && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="mr-2 text-copper-600" size={24} />
                  Featured Image
                </h2>
                <img
                  src={featuredImage.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  Featured
                </span>
              </div>
            )}

            {/* Catalog Images */}
            {catalogImages.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Catalog Images ({catalogImages.length})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {catalogImages.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.imageUrl}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 right-2 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                        Catalog
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Images */}
            {otherImages.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Other Images ({otherImages.length})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {otherImages.map((image) => (
                    <img
                      key={image.id}
                      src={image.imageUrl}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Meta Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-gray-600 font-semibold">Created</label>
                  <p className="text-gray-900">
                    {new Date(product.createdAt).toLocaleString("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">
                    Last Updated
                  </label>
                  <p className="text-gray-900">
                    {new Date(product.updatedAt).toLocaleString("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">
                    Total Images
                  </label>
                  <p className="text-gray-900">
                    {product.images.length} images
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
