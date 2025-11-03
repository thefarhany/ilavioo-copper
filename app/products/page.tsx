import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      images: {
        where: { isCatalog: true },
        take: 1,
      },
      specifications: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export const metadata = {
  title: "Our Products - Ilavio Copper Crafts",
  description:
    "Explore our collection of handcrafted copper products from Tumang, Indonesia",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Where Copper Meets Artistry
          </h1>
          <p className="text-lg text-white/95 font-light">
            Exclusively Handcrafted Pieces for the Discerning Few
          </p>
        </div>
      </section>

      {products.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-medium text-orange-600 uppercase tracking-wider">
              {products.length} {products.length === 1 ? "Product" : "Products"}{" "}
              Available
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Handcrafted Excellence
            </h2>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  slug={product.slug}
                  description={
                    product.description || "Handcrafted copper piece"
                  }
                  imageUrl={
                    product.images[0]?.imageUrl || "/placeholder-product.jpg"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-6">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Our collection is coming soon
              </h3>
              <p className="text-gray-600">
                Stay tuned for our exquisite pieces!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Custom Orders Welcome
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Looking for something unique? We specialize in custom copper crafts
            tailored to your specifications.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
