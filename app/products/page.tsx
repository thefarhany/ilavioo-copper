import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const products = await prisma.product.findMany({
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

export const metadata = {
  title: "Our Products - Ilavio Copper Crafts",
  description:
    "Explore our collection of handcrafted copper products from Tumang, Indonesia",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-copper-600 to-copper-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Where Copper Meets Artistry
          </h1>
          <p className="text-xl text-copper-100 max-w-2xl mx-auto">
            Exclusively Handcrafted Pieces for the Discerning Few
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-600">
                Our collection is coming soon. Stay tuned!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-copper-600 font-semibold mb-2">
                  {products.length}{" "}
                  {products.length === 1 ? "Product" : "Products"} Available
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                  Handcrafted Excellence
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    description={product.description || ""}
                    imageUrl={
                      product.images[0]?.imageUrl || "/placeholder-product.jpg"
                    }
                    price={
                      product.specifications?.price || "Contact for pricing"
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-copper-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Custom Orders Welcome
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Looking for something unique? We specialize in custom copper
              crafts tailored to your specifications.
            </p>
            <a
              href="/contact"
              className="inline-block bg-copper-600 hover:bg-copper-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
