"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["All", "Hotel", "Villa", "Private Home"];

const galleryImages = [
  {
    id: 1,
    category: "Hotel",
    url: "https://images.unsplash.com/photo-1584346651592-3aacc3c99075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 2,
    category: "Villa",
    url: "https://images.unsplash.com/photo-1566838371988-fdbd6fdb44a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 3,
    category: "Hotel",
    url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
  },
  {
    id: 4,
    category: "Private Home",
    url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
  },
  {
    id: 5,
    category: "Hotel",
    url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800",
  },
  {
    id: 6,
    category: "Villa",
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
  },
  {
    id: 7,
    category: "Private Home",
    url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
  },
  {
    id: 8,
    category: "Hotel",
    url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600"
            alt="Gallery"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Gallery
          </h1>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Gallery
            </h2>
            <p className="text-gray-600 max-w-4xl">
              Find inspiration for your next project through our diverse
              portfolio. This collection highlights the versatility and beauty
              of our pieces in various interior styles and architectural spaces.
              Let these images guide you in visualizing the potential for your
              own space.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={`Gallery ${image.id}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
