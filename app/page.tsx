import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Award, Palette, Truck, ShieldCheck } from "lucide-react";
import FeaturedProductCard from "@/components/FeaturedProductCard";

// Dummy data
const featuredProducts = [
  {
    name: "Elegant Vases",
    slug: "elegant-vases",
    description: "Elegant vases to beautify any space in your home.",
    imageUrl: "/assets/elegant-vases.jpg",
  },
  {
    name: "Hanging Lamp",
    slug: "hanging-lamp",
    description: "Stylish pendant lamps to illuminate and define your room.",
    imageUrl: "/assets/hanging-lamp.jpg",
  },
  {
    name: "Wall Decor",
    slug: "wall-decor",
    description: "Curated wall art to express your unique personality.",
    imageUrl: "/assets/wall-decor.jpg",
  },
  {
    name: "Custom Design",
    slug: "custom-design",
    description: "Bespoke furniture and decor tailored to your vision.",
    imageUrl: "/assets/custom-design.jpg",
  },
];

const features = [
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description:
      "Each piece is handcrafted by skilled artisans with decades of experience.",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description:
      "Create bespoke pieces tailored to your unique vision and space.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Materials",
    description: "We use only premium copper and sustainable materials.",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description: "Safe and reliable delivery to destinations worldwide.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1747682996740-084698474f34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1583353863920-b23b2246b6fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1746173098001-2ae330a6a763?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1698335444519-d7200b7d195d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480",
  "https://images.unsplash.com/photo-1697187137607-2ed54d5338c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1469",
  "https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero.jpg"
            alt="Copper craftsmanship"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Where Heritage is Hand-Forged
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Timeless Copper Crafts from the Heart of Tumang, Indonesia
            </p>
            <Link
              href="/products"
              className="inline-flex items-center text-sm bg-copper-600 hover:bg-copper-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our collection of handcrafted copper pieces, each telling
              a story of tradition and artistry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Handcrafting Copper Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assets/hand-crafting.jpg"
                alt="Handcrafting copper"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-copper-600 mb-6">
                Handcrafting Copper
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every piece begins its journey in the skilled hands of our
                artisans in Tumang, Boyolali. Using techniques passed down
                through generations, we transform raw copper into works of art
                that blend traditional craftsmanship with contemporary design.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                From the first hammer strike to the final polish, each creation
                is a testament to patience, precision, and passion. We source
                only the finest materials and employ sustainable practices to
                ensure our craft honors both heritage and environment.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-copper-600 hover:text-copper-700 font-semibold"
              >
                Learn More About Our Process
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Model Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-4xl font-bold text-copper-600 mb-6">
                Custom Model
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Have a vision? We bring it to life. Our custom design service
                allows you to collaborate directly with our master craftsmen to
                create one-of-a-kind pieces that perfectly match your space and
                style.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Whether it&apos;s a statement piece for your home, a unique
                gift, or architectural elements for commercial spaces, we work
                closely with you from concept to completion. Every custom piece
                is crafted with the same attention to detail and quality that
                defines all our work.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm bg-copper-600 hover:bg-copper-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your Custom Project
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assets/custom-model.jpg"
                alt="Custom copper work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-copper-100 rounded-full mb-4">
                  <feature.icon className="text-copper-600" size={32} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-copper-600 to-copper-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Get Exclusive Updates
          </h2>
          <p className="text-copper-100 mb-8">
            Subscribe to our newsletter for new collections, special offers, and
            artisan stories
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-copper-200 text-sm text-copper-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-copper-600 px-8 py-3 text-sm rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Gallery
            </h2>
            <p className="text-gray-600">
              A glimpse into our world of copper craftsmanship
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center text-copper-600 hover:text-copper-700 font-semibold"
            >
              View Full Gallery
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
