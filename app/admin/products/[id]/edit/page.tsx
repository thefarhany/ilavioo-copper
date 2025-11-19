import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    notFound();
  }

  // Transform product data for the form
  const productData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    details: product.details,
    notes: product.notes,
    highlights: product.highlights,
    specifications: product.specifications || null,
    images: product.images,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">
            Update product information and settings
          </p>
        </div>

        {/* Form Container - Centered and Wide */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <ProductForm product={productData} />
        </div>
      </div>
    </div>
  );
}
