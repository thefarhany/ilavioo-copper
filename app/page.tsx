import Link from "next/link";
import Image from "next/image";
import FadeInView from "@/components/animations/FadeInView";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import CountUpNumber from "@/components/animations/CountUpNumber";
import ParallaxSection from "@/components/animations/ParallaxSection";
import {
  Award,
  Users,
  Sparkles,
  Shield,
  Leaf,
  Hammer,
  ChevronRight,
  Star,
} from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import { prisma } from "@/lib/prisma";

async function getLatestGalleryImages() {
  try {
    const galleryImages = await prisma.galleryAsset.findMany({
      where: { type: "image" },
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        url: true,
      },
    });

    return galleryImages;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

export default async function Home() {
  const galleryImages = await getLatestGalleryImages();

  return (
    <main className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-cream-50 to-copper-50">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[url('/assets/hero.jpg')] bg-repeat"></div>
        </div>

        <ParallaxSection offset={80} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-copper-500/10"></div>
        </ParallaxSection>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInView direction="up" delay={0.2}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Timeless <span className="gradient-text">Copper Crafts</span>
                <br />
                from Tumang, Indonesia
              </h1>
            </FadeInView>

            <FadeInView direction="up" delay={0.4}>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover our collection of handcrafted copper pieces, each
                telling a story of tradition and artistry passed down through
                generations
              </p>
            </FadeInView>

            <FadeInView direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore Products
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200"
                >
                  Our Story
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>

        <FadeInView
          direction="up"
          delay={1}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-green-600 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </FadeInView>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-forest-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold font-display mb-2">
                  <CountUpNumber value={30} suffix="+" />
                </div>
                <p className="text-green-100 text-sm sm:text-base">
                  Years of Excellence
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold font-display mb-2">
                  <CountUpNumber value={5000} suffix="+" />
                </div>
                <p className="text-green-100 text-sm sm:text-base">
                  Happy Customers
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold font-display mb-2">
                  <CountUpNumber value={150} suffix="+" />
                </div>
                <p className="text-green-100 text-sm sm:text-base">
                  Unique Designs
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold font-display mb-2">
                  <CountUpNumber value={100} suffix="%" />
                </div>
                <p className="text-green-100 text-sm sm:text-base">
                  Handcrafted
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/wall-decor.jpg"
                  alt="Tumang Copper Artisan at Work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-semibold mb-1">Tumang, Boyolali</p>
                  <p className="text-xs opacity-90">
                    Where Tradition Meets Craftsmanship
                  </p>
                </div>
              </div>
            </FadeInView>

            <FadeInView direction="right">
              <div>
                <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  Our Heritage
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
                  Every piece begins its journey in{" "}
                  <span className="text-green-600">skilled hands</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  In the heart of Tumang, Boyolali, our artisans use techniques
                  passed down through generations to transform raw copper into
                  works of art that blend traditional craftsmanship with
                  contemporary design.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  From the first hammer strike to the final polish, each
                  creation is a testament to patience, precision, and passion.
                  We source only the finest materials and employ sustainable
                  practices to ensure our craft honors both heritage and
                  environment.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
                >
                  Learn More About Our Process
                  <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-copper-100 text-copper-700 rounded-full text-sm font-semibold mb-4">
              Our Collection
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover our finest handcrafted copper pieces, each one a
              testament to the rich tradition of Tumang craftsmanship
            </p>
          </FadeInView>

          <FeaturedProducts />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-cream-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Why Choose <span className="text-green-600">Ilavio</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We combine traditional craftsmanship with modern excellence
            </p>
          </FadeInView>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Hammer className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Master Craftsmanship
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every piece is handcrafted by skilled artisans with decades of
                  experience in traditional copper working techniques.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-copper-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-copper-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Premium Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We use only the finest copper materials, ensuring durability
                  and timeless beauty in every creation.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Sustainable Practice
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our eco-friendly processes honor both tradition and the
                  environment for a sustainable future.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-copper-100 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-copper-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Custom Design
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Collaborate with our master craftsmen to create unique,
                  personalized pieces that match your vision.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Award Winning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Recognized nationally for excellence in preserving and
                  innovating traditional copper craftsmanship.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-copper-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-copper-600" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                  Trusted by Thousands
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join over 5,000 satisfied customers who trust us for authentic
                  Tumang copper crafts.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Inspiration Gallery
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Our <span className="text-copper-600">Masterpieces</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our stunning collection of handcrafted copper artworks
            </p>
          </FadeInView>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {galleryImages.length > 0
              ? galleryImages.map((item, index) => (
                  <StaggerItem key={item.id}>
                    <div className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                      <Image
                        src={item.url}
                        alt={item.title || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </StaggerItem>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <StaggerItem key={item}>
                    <div className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    </div>
                  </StaggerItem>
                ))}
          </StaggerContainer>

          <FadeInView direction="up" className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View Full Gallery
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </FadeInView>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 to-cream-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              What Our <span className="text-green-600">Customers Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Trusted by thousands of satisfied customers worldwide
            </p>
          </FadeInView>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;The craftsmanship is absolutely stunning! Each piece
                  tells a story and the attention to detail is remarkable.
                  Highly recommended!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">SH</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Hartono</p>
                    <p className="text-sm text-gray-500">Jakarta</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;Authentic Tumang quality! I&apos;ve bought several
                  pieces for my restaurant and customers always ask about them.
                  True works of art.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-copper-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-copper-600 font-bold">BW</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Budi Wijaya</p>
                    <p className="text-sm text-gray-500">Surabaya</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;Custom design service exceeded my expectations. The
                  artisans really understood my vision and delivered a
                  masterpiece!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">AP</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Anita Putri</p>
                    <p className="text-sm text-gray-500">Bandung</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-forest-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/copper-texture.png')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView direction="up">
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Have a Vision? We Bring It to Life
              </h2>
            </FadeInView>

            <FadeInView direction="up" delay={0.2}>
              <p className="text-xl text-green-50 mb-8 leading-relaxed">
                Our custom design service allows you to collaborate directly
                with our master craftsmen to create one-of-a-kind pieces that
                perfectly match your space and style.
              </p>
            </FadeInView>

            <FadeInView direction="up" delay={0.4}>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 hover:bg-cream-50 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Your Custom Project
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-3xl font-bold mb-4 text-gray-900">
                Stay Connected
              </h3>
              <p className="text-gray-600 mb-8">
                Subscribe to receive updates on new collections, exclusive
                offers, and behind-the-scenes stories from our workshop
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 text-black focus:border-green-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeInView>
        </div>
      </section>
    </main>
  );
}
