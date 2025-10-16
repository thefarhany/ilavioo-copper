import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  params: { id: string };
}) {
  const product = await getProduct(parseInt(params.id));

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <Link
            href={`/admin/products/${product.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update {product.name}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <ProductForm product={productData} />
      </div>
    </div>
  );
}
