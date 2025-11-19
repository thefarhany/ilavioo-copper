import GalleryForm from "@/components/admin/gallery/GalleryForm";

export default function GalleryCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload New Asset</h1>
          <p className="text-gray-600 mt-2">
            Paste public URL dari Supabase Storage, isi metadata, lalu simpan.
          </p>
        </div>
        <GalleryForm mode="create" />
      </div>
    </div>
  );
}
