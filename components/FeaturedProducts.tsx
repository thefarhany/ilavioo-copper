import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import Link from "next/link";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import { ChevronRight } from "lucide-react";

async function getFeaturedProducts() {
  try {
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard
              name={product.name}
              slug={product.slug}
              description={product.description}
              imageUrl={
                product.images[0]?.imageUrl || "/placeholder-product.jpg"
              }
              specifications={
                product.specifications
                  ? {
                      size: product.specifications.size,
                      finishing: product.specifications.finishing,
                      material: product.specifications.material,
                      price: product.specifications.price,
                    }
                  : null
              }
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="text-center">
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          View All Products
          <ChevronRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </>
  );
}
