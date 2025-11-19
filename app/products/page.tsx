import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FadeInView from "@/components/animations/FadeInView";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import ProductsFilter from "@/components/products/ProductsFilter";
import { Suspense } from "react";
import { Package, Sparkles } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchParams {
  search?: string;
  sort?: string;
}

async function getProducts(searchParams: SearchParams) {
  try {
    const { search, sort } = searchParams;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            {
              description: { contains: search, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    let orderBy: { createdAt?: "asc" | "desc"; name?: "asc" | "desc" } = {
      createdAt: "desc",
    };
    if (sort === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sort === "name-asc") {
      orderBy = { name: "asc" };
    } else if (sort === "name-desc") {
      orderBy = { name: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          where: { isCatalog: true },
          take: 1,
        },
        specifications: true,
      },
      orderBy,
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export const metadata = {
  title: "Our Products - Ilavio Copper Crafts",
  description:
    "Explore our collection of handcrafted copper products from Tumang, Indonesia",
};

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

async function ProductsList({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  if (products.length === 0) {
    const hasSearch = params.search;

    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
            {hasSearch ? "No Products Found" : "No Products Available Yet"}
          </h3>
          <p className="text-gray-600 mb-8">
            {hasSearch
              ? `We couldn't find any products matching "${params.search}". Try adjusting your search.`
              : "Stay tuned for our exquisite handcrafted copper pieces! We're preparing something special for you."}
          </p>
          {hasSearch ? (
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Products
            </Link>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Request Custom Order
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard
            name={product.name}
            slug={product.slug}
            description={product.description}
            imageUrl={product.images[0]?.imageUrl || "/placeholder-product.jpg"}
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
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50">
      <section className="relative bg-gradient-to-r from-green-600 via-green-600 to-forest-700 text-white py-24 sm:py-28 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/copper-pattern.svg')] bg-repeat animate-pulse"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-600/50 to-green-700"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInView direction="up">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Handcrafted Copper Collection
                </h1>
                <p className="text-lg sm:text-xl text-green-50 leading-relaxed max-w-2xl mx-auto">
                  Discover exquisite pieces crafted by master artisans from
                  Tumang, Boyolali
                </p>
              </div>

              <ProductsFilter />
            </div>
          </FadeInView>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 140"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,80L80,85.3C160,91,320,101,480,96C640,91,800,69,960,64C1120,59,1280,69,1360,74.7L1440,80L1440,140L1360,140C1280,140,1120,140,960,140C800,140,640,140,480,140C320,140,160,140,80,140L0,140Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            key={JSON.stringify(params)}
            fallback={<ProductsLoadingSkeleton />}
          >
            <ProductsList searchParams={searchParams} />
          </Suspense>

          {products.length > 0 && (
            <FadeInView direction="up" className="mt-16">
              <div className="bg-gradient-to-r from-green-600 to-forest-600 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('/copper-texture.png')] bg-repeat"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                    Can&apos;t Find What You&apos;re Looking For?
                  </h2>
                  <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                    We specialize in custom copper crafts tailored to your
                    unique specifications. Let&apos;s create something
                    extraordinary together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 hover:bg-cream-50 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Request Custom Design
                    </Link>
                    <Link
                      href="/gallery"
                      className="inline-flex items-center justify-center px-8 py-4 bg-green-700/50 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 border-2 border-white/30"
                    >
                      View Gallery
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInView>
          )}
        </div>
      </section>
    </main>
  );
}
