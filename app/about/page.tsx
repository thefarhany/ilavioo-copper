import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1737433096740-dccb8dd18897?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
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
              standards. We take pride in bringing Indonesia&apos;s cultural
              heritage to the global market. By choosing our products, you are
              not only receiving high-quality metal crafts but also supporting
              the sustainability of local tradition and artistry.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1566431036832-21a1a18c8108?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
                  alt="Copper craft 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1590094620544-b211f65ddc07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1527"
                  alt="Copper craft 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-copper-600 font-semibold mb-2">Our Vision</p>
              <h2 className="font-display text-4xl font-bold text-copper-600 mb-6">
                Where Copper Whispers Your Story
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where every home and living space feels the
                warm and authentic touch of handcraft. Our vision is to weave
                Tumang&apos;s heritage into the fabric of modern life, creating
                a future where art and tradition go hand in hand.
              </p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610000819616-7168539b2a3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1465"
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
