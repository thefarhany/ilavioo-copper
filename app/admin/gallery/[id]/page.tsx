// app/admin/gallery/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Star } from "lucide-react";
import DeleteButton from "@/components/admin/gallery/DeleteButton";

async function getAsset(id: number) {
  return prisma.galleryAsset.findUnique({ where: { id } });
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await getAsset(Number(id));

  if (!asset) notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </Link>

        <div className="flex gap-3">
          <Link
            href={`/admin/gallery/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <DeleteButton id={Number(id)} />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Media Preview */}
        <div className="relative bg-gray-900">
          {asset.type === "image" ? (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src={asset.url}
                alt={asset.title || "Gallery image"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <video
              src={asset.url}
              controls
              className="w-full max-h-[70vh]"
              preload="metadata"
            />
          )}

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-gray-900/80 text-white text-sm font-medium rounded-full">
              {asset.type === "image" ? "IMAGE" : "VIDEO"}
            </span>
            {asset.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                <Star className="w-4 h-4" fill="currentColor" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {asset.title || "Untitled"}
            </h1>
            {asset.description && (
              <p className="text-gray-600">{asset.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Category
              </h3>
              <p className="text-gray-900">
                {asset.category || (
                  <span className="text-gray-400">No category</span>
                )}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Tags
              </h3>
              {asset.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No tags</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Type
              </h3>
              <p className="text-gray-900 uppercase">{asset.type}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                URL
              </h3>
              <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 text-sm break-all"
              >
                {asset.url}
              </a>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Created: {new Date(asset.createdAt).toLocaleString("id-ID")}
              </span>
              <span>
                Updated: {new Date(asset.updatedAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
