import Image from "next/image";
import { Facebook, Instagram, Twitter, Music } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Manager",
      description:
        "Volutpat diam tortor tristique elit quis id lorem turpis facilisi. Aliquam morbi elementum odio aliqueet et.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: "John Doe",
      role: "Manager",
      description:
        "Volutpat diam tortor tristique elit quis id lorem turpis facilisi. Aliquam morbi elementum odio aliqueet et.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      name: "John Doe",
      role: "Manager",
      description:
        "Volutpat diam tortor tristique elit quis id lorem turpis facilisi. Aliquam morbi elementum odio aliqueet et.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      name: "John Doe",
      role: "Manager",
      description:
        "Volutpat diam tortor tristique elit quis id lorem turpis facilisi. Aliquam morbi elementum odio aliqueet et.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600"
            alt="About Us"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Make a Statement in Copper
            </h1>
            <p className="text-xl md:text-2xl font-semibold">
              Bold, Handmade Centerpieces that Define Your Interior
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Handmade copper products from Tumang, Boyolali, Central Java,
              Indonesia have long been recognized as some of the finest metal
              crafts in Indonesia. Tumang is well known as the center of copper
              and brass handicrafts, with a heritage handed down through
              generations. We have been manufacturing copper products for over
              30 years.
            </p>

            <p>
              Tumang is not just a place; it is a living center of a handcrafted
              copper and brass heritage that has been passed down through
              families. Each piece is handmade with meticulous detail and
              superior quality. Our artisans combine traditional techniques with
              modern design, creating products that are not only visually
              stunning but also functional and durable.
            </p>

            <p>
              Tumang copper crafts are widely used for home decor, hotel
              interiors, restaurants, and even large architectural projects both
              domestically and abroad. From vases, bathtub, cookware,
              calligraphy, logo, chandeliers, wall reliefs to customized
              ornaments – everything can be crafted to meet international export
              standards. We take pride in bringing Indonesia's cultural heritage
              to the global market. By choosing our products, you are not only
              receiving high-quality metal crafts but also supporting the
              sustainability of local tradition and artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800"
                  alt="Copper craft 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800"
                  alt="Copper craft 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-copper-600 font-semibold mb-2">Our Mission</p>
              <h2 className="font-display text-4xl font-bold text-copper-600 mb-6">
                Where Heritage Takes Beautiful Form
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To preserve and keep alive the legacy of Tumang copper
                craftsmanship by creating high-quality pieces that blend
                traditional craftsmanship with contemporary design. Every hammer
                blow is our promise of excellence, durability, and timeless
                beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-copper-600 font-semibold mb-2">Our Vision</p>
              <h2 className="font-display text-4xl font-bold text-copper-600 mb-6">
                Where Copper Whispers Your Story
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where every home and living space feels the
                warm and authentic touch of handcraft. Our vision is to weave
                Tumang's heritage into the fabric of modern life, creating a
                future where art and tradition go hand in hand.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
                alt="Vision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
