import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Video, Plus, Star, Play } from "lucide-react";
import DeleteButton from "@/components/admin/gallery/DeleteButton";

async function getAssets() {
  return prisma.galleryAsset.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function GalleryListPage() {
  const assets = await getAssets();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gallery</h1>
          <p className="text-gray-600">
            Manage images and videos for the website gallery
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      {/* Gallery Grid */}
      {assets.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg mb-4">No gallery items yet</p>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image/Video Preview */}
              <Link href={`/admin/gallery/${asset.id}`} className="block">
                <div className="relative aspect-square bg-gray-100">
                  {asset.type === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        src={asset.url}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="text-white" size={48} />
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                        <Video size={12} />
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={asset.url}
                        alt={asset.title || "Gallery image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                        <ImageIcon size={12} />
                        IMAGE
                      </div>
                    </div>
                  )}
                  {asset.isFeatured && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-4">
                <Link href={`/admin/gallery/${asset.id}`}>
                  <h3 className="font-semibold mb-1 hover:text-green-600 transition-colors line-clamp-1">
                    {asset.title || "Untitled"}
                  </h3>
                </Link>
                {asset.category && (
                  <p className="text-sm text-gray-500 mb-3">
                    #{asset.category}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/gallery/${asset.id}/edit`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton assetId={asset.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
