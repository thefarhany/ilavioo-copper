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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Find inspiration for your next project through our diverse
            portfolio. This collection highlights the versatility and beauty of
            our pieces in various interior styles and architectural spaces. Let
            these images guide you in visualizing the potential for your own
            space.
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-8 py-3 font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition-all hover:shadow-2xl"
            >
              <Image
                src={image.url}
                alt={`${image.category} interior design`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
