import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/animations/FadeInView";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import CountUpNumber from "@/components/animations/CountUpNumber";
import {
  Award,
  Heart,
  Target,
  Users,
  Globe,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "About Us - Ilavio Copper Crafts",
  description:
    "Learn about our 30+ years of heritage in handcrafted copper artistry from Tumang, Boyolali, Indonesia",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50">
      {/* Hero Section - FIXED: No gap/line */}
      <section className="relative bg-gradient-to-r from-green-600 to-forest-600 text-white py-24 lg:py-44 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/copper-pattern.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInView direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Crafting Tradition,{" "}
                <span className="text-green-200">Defining Excellence</span>
              </h1>
              <p className="text-xl text-green-50 leading-relaxed max-w-3xl mx-auto">
                Bold, handmade centerpieces that define your interior. Over 30
                years of heritage from Tumang, Boyolali.
              </p>
            </div>
          </FadeInView>
        </div>

        <div className="absolute bottom-0 left-0 right-0 block leading-[0]">
          <svg
            viewBox="0 0 1440 110"
            className="w-full h-auto block"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section - FIXED: Removed negative margin */}
      <section className="py-16 bg-gradient-to-br from-cream-50 via-white to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUpNumber value={30} suffix="+" />
                  </div>
                  <p className="text-gray-600 font-medium">Years Experience</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-copper-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-copper-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUpNumber value={5000} suffix="+" />
                  </div>
                  <p className="text-gray-600 font-medium">Happy Clients</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUpNumber value={100} suffix="%" />
                  </div>
                  <p className="text-gray-600 font-medium">Handcrafted</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-copper-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-7 h-7 text-copper-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CountUpNumber value={50} suffix="+" />
                  </div>
                  <p className="text-gray-600 font-medium">Countries Served</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </FadeInView>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/about.jpg"
                  alt="Tumang Copper Artisan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-bold mb-1">Tumang, Boyolali</p>
                  <p className="text-sm opacity-90">Central Java, Indonesia</p>
                </div>
              </div>
            </FadeInView>

            <FadeInView direction="right">
              <div>
                <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  Our Heritage
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  30+ Years of{" "}
                  <span className="text-green-600">Copper Excellence</span>
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Handmade copper products from Tumang, Boyolali, Central
                    Java, Indonesia have long been recognized as some of the
                    finest metal crafts in Indonesia. Tumang is well known as
                    the center of copper and brass handicrafts, with a heritage
                    handed down through generations.
                  </p>

                  <p>
                    Tumang is not just a place; it is a living center of a
                    handcrafted copper and brass heritage that has been passed
                    down through families. Each piece is handmade with
                    meticulous detail and superior quality.
                  </p>

                  <p>
                    Our artisans combine traditional techniques with modern
                    design, creating products that are not only visually
                    stunning but also functional and durable.
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-copper-100 text-copper-700 rounded-full text-sm font-semibold mb-4">
              Our Expertise
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What We Create
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Tumang copper crafts are widely used across various industries and
              applications
            </p>
          </FadeInView>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Home Decor",
              "Hotel Interiors",
              "Restaurant Design",
              "Architectural Projects",
              "Vases & Ornaments",
              "Bathtubs & Cookware",
              "Calligraphy & Logos",
              "Chandeliers & Lighting",
              "Wall Reliefs",
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInView direction="up" className="text-center mt-12">
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Everything can be crafted to meet international export standards.
              We take pride in bringing Indonesia&apos;s cultural heritage to
              the global market. By choosing our products, you are not only
              receiving high-quality metal crafts but also supporting the
              sustainability of local tradition and artistry.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-copper-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeInView direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100 h-full">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To preserve and keep alive the legacy of Tumang copper
                  craftsmanship by creating high-quality pieces that blend
                  traditional craftsmanship with contemporary design. Every
                  hammer blow is our promise of excellence, durability, and
                  timeless beauty.
                </p>
              </div>
            </FadeInView>

            <FadeInView direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-copper-100 h-full">
                <div className="w-16 h-16 bg-copper-600 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We envision a world where every home and living space feels
                  the warm and authentic touch of handcraft. Our vision is to
                  weave Tumang&apos;s heritage into the fabric of modern life,
                  creating a future where art and tradition go hand in hand.
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up">
            <div className="bg-gradient-to-r from-green-600 to-forest-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/copper-texture.png')] bg-repeat"></div>
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Experience Tumang Craftsmanship?
                </h2>
                <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                  Explore our collection or contact us for custom designs
                  tailored to your unique vision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 hover:bg-cream-50 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Browse Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-700/50 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 border-2 border-white/30"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </main>
  );
}
