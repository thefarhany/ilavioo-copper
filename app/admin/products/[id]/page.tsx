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

// ✅ FIXED: params sekarang bertipe Promise
export default async function ProductViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ FIXED: await params sebelum destructure
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            Edit Product
          </Link>
        </div>

        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Product Details
              </h2>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <code className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {product.slug}
              </code>
            </div>

            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}

            {product.details && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.details}
                </p>
              </div>
            )}

            {product.notes && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.notes}
                </p>
              </div>
            )}
          </div>

          {/* Specifications Card */}
          {product.specifications && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Specifications
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.size && (
                  <>
                    <dt className="text-sm font-medium text-gray-600">Size</dt>
                    <dd className="text-sm text-gray-900">
                      {product.specifications.size}
                    </dd>
                  </>
                )}
                {product.specifications.finishing && (
                  <>
                    <dt className="text-sm font-medium text-gray-600">
                      Finishing
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {product.specifications.finishing}
                    </dd>
                  </>
                )}
                {product.specifications.material && (
                  <>
                    <dt className="text-sm font-medium text-gray-600">
                      Material
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {product.specifications.material}
                    </dd>
                  </>
                )}
                {product.specifications.price && (
                  <>
                    <dt className="text-sm font-medium text-gray-600">Price</dt>
                    <dd className="text-sm text-gray-900">
                      {product.specifications.price}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          )}

          {/* Highlights Card */}
          {product.highlights.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Highlights
                </h2>
              </div>

              <ul className="space-y-3">
                {product.highlights.map((highlight) => (
                  <li key={highlight.id} className="flex items-start gap-3">
                    {highlight.icon && (
                      <span className="text-2xl flex-shrink-0">
                        {highlight.icon}
                      </span>
                    )}
                    <span className="text-gray-700 pt-1">{highlight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Images Card */}
          {product.images.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Product Images
                </h2>
                <span className="text-sm text-gray-500">
                  ({product.images.length} images)
                </span>
              </div>

              {/* Featured Image */}
              {featuredImage && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Featured Image
                  </h3>
                  <div className="relative">
                    <Image
                      src={featuredImage.imageUrl}
                      alt={`${product.name} - Featured`}
                      width={800}
                      height={600}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
              )}

              {/* Catalog Images */}
              {catalogImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Catalog Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catalogImages.map((img) => (
                      <div key={img.id} className="relative">
                        <Image
                          src={img.imageUrl}
                          alt={`${product.name} - Catalog`}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                          Catalog
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Images */}
              {otherImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Other Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {otherImages.map((img) => (
                      <Image
                        key={img.id}
                        src={img.imageUrl}
                        alt={`${product.name}`}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Metadata Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Metadata
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">Created</dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {new Date(product.createdAt).toLocaleString("id-ID", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  Last Updated
                </dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {new Date(product.updatedAt).toLocaleString("id-ID", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
