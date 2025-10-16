import Image from "next/image";
import { Hammer, Palette, Sparkles, ShieldCheck, Globe } from "lucide-react";

const processSteps = [
  {
    title: "Material Selection",
    subtitle: "Premium Copper Selection",
    description:
      "We source only the finest quality copper, selecting material that is perfect from. Each sheet is carefully inspected for purity and consistency, ensuring the best foundation for pieces that will last generations.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
  {
    title: "Shaping",
    subtitle: "Artisan Shaping Process",
    description:
      "Our skilled craftsmen transform raw copper sheets into elegant forms using traditional techniques. Every curve and angle is meticulously crafted through patient hand-work, creating pieces that showcase the beauty ready to reach distinctive peaks we create.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
  {
    title: "Detail Engraving",
    subtitle: "Artisanal Engraving Details",
    description:
      "Our master artisans hand-etch intricate patterns into each piece, creating unique storytelling elements. This precise engraving technique adds depth and personal character, making every item truly one-of-a-kind reflection of dedicated craftsmanship.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
  {
    title: "Finishing",
    subtitle: "Perfect Final Touch",
    description:
      "Each piece receives meticulous hand-polishing to achieve its signature luminous finish. The final stage enhances the copper's natural warmth and returns lasting brilliance, ensuring a lustrous surface that will age beautifully over time.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
  {
    title: "Final Quality Assurance",
    subtitle: "Excellence Guaranteed",
    description:
      "Every piece undergoes rigorous inspection to ensure flawless craftsmanship and durability. We verify structural integrity, finish quality, and overall aesthetic before approval. This meticulous quality control ensures that only our finest work reaches you.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
  },
];

const highlights = [
  {
    icon: Hammer,
    title: "Handmade Craftmanship",
    description:
      "Each piece is meticulously crafted by hand, respecting generations of Tumang artisans' skill and quality.",
  },
  {
    icon: Palette,
    title: "Custom Copper Design",
    description:
      "Go creative with us! Let the year-long, bring the ever-creating bespoke copper pieces into your ideal place.",
  },
  {
    icon: Sparkles,
    title: "High Quality Materials",
    description:
      "Crafted from premium copper. We guarantee the availability, excellence of the finish, and our dedication. a lasting legacy.",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    description:
      "Professional heritage-to-your doorstep. We safely deliver the copper craft forms far across all corners of the world.",
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600"
            alt="Process"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Process
          </h1>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-[400px] rounded-lg overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-copper-600 font-semibold mb-2">
                    {step.title}
                  </p>
                  <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                    {step.subtitle}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <highlight.icon className="text-gray-900" size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              See Our Process
            </h2>
            <p className="text-gray-600">
              Watch how we transform raw copper into beautiful works of art
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-900 border-b-8 border-b-transparent ml-1"></div>
              </div>
              <p className="text-gray-600">
                Click to watch our crafting process
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
