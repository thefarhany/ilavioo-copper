// components/gallery/GalleryGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string | null;
  description: string | null;
  url: string;
  type: "image" | "video";
  category: string | null;
  tags: string[];
  isFeatured: boolean;
};

type Props = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No gallery items yet</p>
      </div>
    );
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((it, index) => (
          <div
            key={it.id}
            onClick={() => openModal(index)}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image/Video Preview */}
            <div className="relative aspect-square bg-gray-100">
              {it.type === "image" ? (
                <Image
                  src={it.url}
                  alt={it.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="relative w-full h-full">
                  {/* Video with auto-generated thumbnail */}
                  <video
                    src={`${it.url}#t=0.5`}
                    preload="metadata"
                    className="w-full h-full object-cover"
                    muted
                  />

                  {/* Video Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play
                        className="w-8 h-8 text-emerald-600 ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Featured Badge */}
              {it.isFeatured && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                {it.title || "Untitled"}
              </h3>

              {/* Category & Tags */}
              <div className="flex flex-wrap gap-2 items-center">
                {it.category && (
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded">
                    {it.category}
                  </span>
                )}
                {it.tags?.length > 0 && (
                  <span className="text-xs text-gray-500">
                    #{it.tags.join(" #")}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {selectedIndex !== null && selectedIndex < items.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Container */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {selectedItem.type === "image" ? (
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={selectedItem.url}
                    alt={selectedItem.title || "Gallery image"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                </div>
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh]"
                  preload="metadata"
                />
              )}
            </div>

            {/* Image Counter */}
            <div className="text-center mt-4 text-white/70 text-sm">
              {selectedIndex !== null &&
                `${selectedIndex + 1} / ${items.length}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
