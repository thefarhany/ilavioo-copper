import { prisma } from "@/lib/prisma";
import GalleryForm from "@/components/admin/gallery/GalleryForm";
import { notFound } from "next/navigation";

async function getAsset(id: number) {
  return prisma.galleryAsset.findUnique({ where: { id } });
}

export default async function GalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await getAsset(Number(id));
  if (!asset) notFound();

  const initial = {
    id: asset.id,
    title: asset.title,
    description: asset.description,
    category: asset.category,
    tags: asset.tags,
    isFeatured: asset.isFeatured,
    url: asset.url,
    type: asset.type as "image" | "video",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Asset</h1>
          <p className="text-gray-600 mt-2">
            Perbarui metadata atau hapus asset.
          </p>
        </div>
        <GalleryForm mode="edit" initial={initial} />
      </div>
    </div>
  );
}
