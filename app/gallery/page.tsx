"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["All", "Hotel", "Villa", "Private Home"];

const galleryImages = [
  {
    id: 1,
    category: "Hotel",
    url: "/assets/images/hotel-1.jpg",
  },
  {
    id: 2,
    category: "Hotel",
    url: "/assets/images/hotel-2.jpg",
  },
  {
    id: 3,
    category: "Hotel",
    url: "/assets/images/hotel-3.jpg",
  },
  {
    id: 4,
    category: "Private Home",
    url: "/assets/images/gallery-5.jpg",
  },
  {
    id: 5,
    category: "Hotel",
    url: "/assets/images/hotel-4.jpg",
  },
  {
    id: 6,
    category: "Villa",
    url: "/assets/images/gallery-2.jpg",
  },
  {
    id: 7,
    category: "Private Home",
    url: "/assets/images/gallery-3.jpg",
  },
  {
    id: 8,
    category: "Hotel",
    url: "/assets/images/hotel-5.jpg",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000"
            alt="Gallery Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 to-copper-800/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Gallery</h1>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={image.url}
                  alt={`${image.category} - ${image.id}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
