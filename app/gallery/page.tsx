import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FadeInView from "@/components/animations/FadeInView";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Ilavio - Tumang Copper Crafts",
  description:
    "Explore our stunning collection of handcrafted copper masterpieces from Tumang, Boyolali",
};

async function getGallery(sp?: {
  q?: string;
  type?: string;
  category?: string;
  featured?: string;
}) {
  const params = new URLSearchParams();
  if (sp?.q) params.set("q", sp.q);
  if (sp?.type) params.set("type", sp.type);
  if (sp?.category) params.set("category", sp.category);
  if (sp?.featured) params.set("featured", sp.featured);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/gallery${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return (await res.json()) as Array<{
    id: number;
    title: string | null;
    description: string | null;
    url: string;
    type: "image" | "video";
    category: string | null;
    tags: string[];
    isFeatured: boolean;
  }>;
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    featured?: string;
  }>;
}) {
  const sp = await searchParams;
  const items = await getGallery(sp);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-green-50">
      <section className="relative bg-gradient-to-r from-green-600 to-forest-600 text-white py-24 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/copper-pattern.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInView direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Gallery <span className="text-green-200">Collection</span>
              </h1>
              <p className="text-xl text-green-50 leading-relaxed max-w-3xl mx-auto">
                Discover stunning pieces crafted by master artisans from Tumang,
                Boyolali
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

      <section className="py-16 bg-gray-50 ">
        <div className="container mx-auto px-6">
          <GalleryGrid items={items} />
        </div>
      </section>

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
