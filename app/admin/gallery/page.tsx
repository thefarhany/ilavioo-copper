import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Video, Plus, Star, Play } from "lucide-react";

async function getAssets() {
  return prisma.galleryAsset.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function GalleryListPage() {
  const assets = await getAssets();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-1">
            Manage images and videos for the website gallery
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New
        </Link>
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No gallery items yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assets.map((a) => (
            <Link
              key={a.id}
              href={`/admin/gallery/${a.id}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-100">
                {a.type === "image" ? (
                  <Image
                    src={a.url}
                    alt={a.title || "Gallery image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={`${a.url}#t=0.5`}
                      preload="metadata"
                      className="w-full h-full object-cover"
                      muted
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="flex items-center justify-center gap-2 text-white">
                        <Play className="w-8 h-8" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-900/80 text-white text-xs font-medium rounded">
                    {a.type === "image" ? (
                      <>
                        <ImageIcon className="w-3 h-3" />
                        IMAGE
                      </>
                    ) : (
                      <>
                        <Video className="w-3 h-3" />
                        VIDEO
                      </>
                    )}
                  </span>
                </div>

                {a.isFeatured && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
                      <Star className="w-3 h-3" fill="currentColor" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {a.title || "Untitled"}
                </h3>

                {a.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-gray-500">
                      #{a.tags.join(" #")}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
