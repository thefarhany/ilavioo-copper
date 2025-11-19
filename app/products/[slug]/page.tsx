import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductTabs from "@/components/products/ProductTabs";
import RelatedProducts from "@/components/products/RelatedProducts";
import {
  ArrowLeft,
  Package,
  Ruler,
  Sparkles,
  Tag,
  Shield,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { id: "asc" },
      },
      specifications: true,
      highlights: true,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

async function getRelatedProducts(currentProductId: number) {
  const products = await prisma.product.findMany({
    where: {
      NOT: { id: currentProductId },
    },
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: `${product.name} - Ilavio Copper Crafts`,
    description:
      product.description ||
      `Handcrafted ${product.name} from Tumang, Indonesia`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50">
      {/* Breadcrumb Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <FadeInView direction="down">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-sm text-gray-600">
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/products"
                  className="hover:text-green-600 transition-colors"
                >
                  Products
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold line-clamp-1">
                  {product.name}
                </span>
              </nav>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Products</span>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Image Gallery */}
            <FadeInView direction="left">
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </FadeInView>

            {/* Right Column - Product Info */}
            <FadeInView direction="right">
              <div className="lg:sticky lg:top-24">
                {/* Product Title */}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Product Description */}
                {product.description && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Price Badge */}
                {product.specifications?.price && (
                  <div className="flex items-center gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-lg">
                      <Tag className="w-5 h-5" />
                      <span className="text-2xl font-bold">
                        {product.specifications.price}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Starting price
                    </span>
                  </div>
                )}

                {/* Specifications Grid */}
                {/* Specifications dengan Flexbox - Tetap Cards Besar */}
                {product.specifications && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {product.specifications.size && (
                      <div className="flex-1 min-w-[calc(50%-8px)] flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-green-200 transition-colors">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Ruler className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 mb-1">Size</p>
                          <p className="font-semibold text-gray-900 break-words">
                            {product.specifications.size}
                          </p>
                        </div>
                      </div>
                    )}

                    {product.specifications.finishing && (
                      <div className="flex-1 min-w-[calc(50%-8px)] flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-copper-200 transition-colors">
                        <div className="w-10 h-10 bg-copper-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-copper-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 mb-1">
                            Finishing
                          </p>
                          <p className="font-semibold text-gray-900 break-words">
                            {product.specifications.finishing}
                          </p>
                        </div>
                      </div>
                    )}

                    {product.specifications.material && (
                      <div className="flex-1 min-w-[calc(50%-8px)] flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-green-200 transition-colors">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 mb-1">Material</p>
                          <p className="font-semibold text-gray-900 break-words">
                            {product.specifications.material}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Highlights */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.highlights.map((highlight) => (
                        <li
                          key={highlight.id}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">
                            {highlight.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    Request Quote
                  </Link>
                  <a
                    href="tel:+6281234567890"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-semibold text-gray-900">Authentic</p>
                      <p className="text-xs text-gray-500">100% Genuine</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-copper-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="w-6 h-6 text-copper-600" />
                      </div>
                      <p className="font-semibold text-gray-900">Handmade</p>
                      <p className="text-xs text-gray-500">By Artisans</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-semibold text-gray-900">Quality</p>
                      <p className="text-xs text-gray-500">Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>

          {/* Product Tabs - Details, Notes, etc */}
          <FadeInView direction="up">
            <ProductTabs
              details={product.details}
              notes={product.notes}
              specifications={product.specifications}
            />
          </FadeInView>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView direction="up">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  You May Also Like
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Related Products
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore more exquisite copper pieces from our collection
                </p>
              </div>
            </FadeInView>

            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}
    </main>
  );
}
