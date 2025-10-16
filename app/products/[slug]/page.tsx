"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";

interface ProductImage {
  id: string;
  imageUrl: string;
  isFeatured: boolean;
  isCatalog: boolean;
}

interface ProductHighlight {
  id: string;
  icon?: string;
  text: string;
}

interface ProductSpecifications {
  size?: string;
  finishing?: string;
  material?: string;
  price?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  details?: string;
  notes?: string;
  images: ProductImage[];
  highlights?: ProductHighlight[];
  specifications?: ProductSpecifications;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/slug/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-copper-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="text-copper-600 hover:text-copper-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get all images (featured first, then catalog, then others)
  const featuredImage = product.images.find((img) => img.isFeatured);
  const catalogImages = product.images.filter((img) => img.isCatalog);
  const otherImages = product.images.filter(
    (img) => !img.isFeatured && !img.isCatalog
  );

  // Use Set to ensure unique images by id
  const uniqueImages = Array.from(
    new Map(
      [
        ...(featuredImage ? [featuredImage] : []),
        ...catalogImages,
        ...otherImages,
      ].map((img) => [img.id, img])
    ).values()
  );

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            {uniqueImages.length > 0 &&
            uniqueImages[selectedImage]?.imageUrl ? (
              <Image
                src={uniqueImages[selectedImage].imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {uniqueImages.length > 1 && (
            <div className="grid grid-cols-6 gap-4 mt-4">
              {uniqueImages.slice(0, 6).map((img, idx) => (
                <button
                  key={`thumbnail-${img.id}`}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden ${
                    selectedImage === idx
                      ? "ring-4 ring-copper-600"
                      : "opacity-60 hover:opacity-100"
                  } transition-all`}
                >
                  {img.imageUrl ? (
                    <Image
                      src={img.imageUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {product.name}
          </h1>

          <div className="prose max-w-none mb-8">
            {product.description && (
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
            )}
            {product.details && (
              <p className="text-gray-700 leading-relaxed">{product.details}</p>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Highlights :
              </h2>
              <ul className="space-y-3">
                {product.highlights.map((highlight) => (
                  <li
                    key={`highlight-${highlight.id}`}
                    className="flex items-start"
                  >
                    {highlight.icon && (
                      <span className="text-2xl mr-3">{highlight.icon}</span>
                    )}
                    <span className="text-gray-700">{highlight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* View Process Button */}
          <div className="mb-12">
            <Link
              href="/process"
              className="inline-flex items-center text-sm bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Our Process &nbsp; <ArrowRight size={20} />
            </Link>
          </div>

          {/* Specifications Table */}
          {product.specifications && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Specifications
              </h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-300">
                    {product.specifications.size && (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900 w-1/4">
                          Size
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {product.specifications.size}
                        </td>
                      </tr>
                    )}
                    {product.specifications.finishing && (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          Finishing
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {product.specifications.finishing}
                        </td>
                      </tr>
                    )}
                    {product.specifications.material && (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          Material
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {product.specifications.material}
                        </td>
                      </tr>
                    )}
                    {product.specifications.price && (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          Price
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {product.specifications.price}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Notes */}
          {product.notes && (
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <p className="text-gray-700 leading-relaxed italic">
                {product.notes}
              </p>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-sm rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="mr-2" size={20} />
              Contact Us via Whatsapp
            </a>
            <a
              href="mailto:info@ilavio.com"
              className="flex items-center justify-center bg-copper-600 hover:bg-copper-700 text-white px-8 py-3 text-sm rounded-lg font-semibold transition-colors"
            >
              <Mail className="mr-2" size={20} />
              Contact Us via Email
            </a>
          </div>

          {/* Product Catalog */}
          {catalogImages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Catalog
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catalogImages.map((img, idx) => (
                  <div
                    key={`catalog-${img.id}`}
                    className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() =>
                      setSelectedImage(
                        uniqueImages.findIndex((uImg) => uImg.id === img.id)
                      )
                    }
                  >
                    {img.imageUrl ? (
                      <Image
                        src={img.imageUrl}
                        alt={`Catalog ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
