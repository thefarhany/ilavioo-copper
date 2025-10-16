import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import Link from "next/link";

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 4,
    include: {
      images: {
        where: { isCatalog: true },
        take: 1,
      },
      specifications: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return products;
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-copper-600 font-semibold mb-2 uppercase tracking-wide">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our finest handcrafted copper pieces, each one a testament
            to the rich tradition of Tumang craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              slug={product.slug}
              description={product.description || ""}
              imageUrl={
                product.images[0]?.imageUrl ||
                "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800"
              }
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-copper-600 hover:bg-copper-700 text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
