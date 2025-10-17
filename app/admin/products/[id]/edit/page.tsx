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

// ✅ FIXED: params sekarang bertipe Promise
export default async function EditProductPage({
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
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Update {product.name}
        </h1>

        <ProductForm product={productData} />
      </div>
    </div>
  );
}
