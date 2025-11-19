"use client";

import { useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Reusable GalleryForm
 * - mode="create": drag&drop multi file + staging + Save All (POST /api/gallery)
 * - mode="edit": single record edit + Delete (PUT/DELETE /api/gallery/[id])
 */

export type GalleryAssetDTO = {
  id?: number;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: string[];
  isFeatured?: boolean;
  url: string;
  type: "image" | "video";
};

type Props = {
  mode: "create" | "edit";
  initial?: GalleryAssetDTO;
};

export default function GalleryForm({ mode, initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [items, setItems] = useState<GalleryAssetDTO[]>(
    mode === "edit" && initial
      ? [
          {
            id: initial.id,
            title: initial.title ?? "",
            description: initial.description ?? "",
            category: initial.category ?? "",
            tags: initial.tags ?? [],
            isFeatured: initial.isFeatured ?? false,
            url: initial.url,
            type: initial.type,
          },
        ]
      : []
  );

  const isCreate = mode === "create";

  function updateItem(idx: number, patch: Partial<GalleryAssetDTO>) {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    );
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    startTransition(async () => {
      const files = Array.from(e.target.files!);
      const uploaded: GalleryAssetDTO[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
        const isVideo = ["mp4", "webm", "mov"].includes(ext);
        const path = `gallery/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;
        const { error } = await supabase.storage
          .from("gallery-assets")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) {
          alert(error.message);
          continue;
        }
        const { data: pub } = supabase.storage
          .from("gallery-assets")
          .getPublicUrl(path);
        uploaded.push({
          url: pub.publicUrl,
          type: isVideo ? "video" : "image",
          title: "",
          description: "",
          category: "",
          tags: [],
          isFeatured: false,
        });
      }
      setItems((prev) => [...prev, ...uploaded]);
      if (e.target) e.target.value = "";
    });
  }

  async function onCreate() {
    if (items.length === 0) return;
    startTransition(async () => {
      for (const it of items) {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: it.title ?? "",
            description: it.description ?? "",
            category: it.category ?? "",
            tags: it.tags ?? [],
            isFeatured: !!it.isFeatured,
            url: it.url,
            type: it.type,
          }),
        });
        if (!res.ok) {
          alert("Failed to create some items");
          return;
        }
      }
      router.push("/admin/gallery");
      router.refresh();
    });
  }

  async function onUpdate() {
    if (!initial?.id || items.length !== 1) return;
    const it = items[0];
    startTransition(async () => {
      const res = await fetch(`/api/gallery/${initial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: it.title ?? "",
          description: it.description ?? "",
          category: it.category ?? "",
          tags: it.tags ?? [],
          isFeatured: !!it.isFeatured,
          url: it.url,
          type: it.type,
        }),
      });
      if (!res.ok) {
        alert("Failed to update");
        return;
      }
      router.push("/admin/gallery");
      router.refresh();
    });
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm("Delete this asset?")) return;
    startTransition(async () => {
      const res = await fetch(`/api/gallery/${initial.id}`, {
        method: "DELETE",
      });
      if (!res.ok) return alert("Failed to delete");
      router.push("/admin/gallery");
      router.refresh();
    });
  }

  function publicUrlToPath(publicUrl: string) {
    const marker = "/storage/v1/object/public/gallery-assets/";
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return publicUrl.slice(idx + marker.length);
  }

  async function deleteFromStorageByUrl(url: string) {
    const path = publicUrlToPath(url);
    if (!path) return;
    await supabase.storage.from("gallery-assets").remove([path]);
  }

  function removeItem(idx: number) {
    const target = items[idx];
    if (!target) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
    if (target.url) {
      deleteFromStorageByUrl(target.url).catch(() => {});
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {isCreate && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
            <label
              htmlFor="uploader"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl ${
                isPending
                  ? "bg-gray-100 border-gray-300"
                  : "bg-gray-50 hover:bg-gray-100 hover:border-green-500"
              } cursor-pointer transition`}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-2" />
                  <p className="text-gray-600">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Images (JPG/PNG/WEBP) or Videos (MP4/WEBM/MOV)
                  </p>
                </>
              )}
            </label>
            <input
              id="uploader"
              type="file"
              className="hidden"
              multiple
              accept="image/*,video/*"
              onChange={handleFiles}
            />
          </div>
        )}

        <div
          className={`grid ${
            isCreate ? "sm:grid-cols-2" : "grid-cols-1"
          } gap-6`}
        >
          {(items.length > 0 ? items : isCreate ? [] : [initial!]).map(
            (a, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden relative"
              >
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="absolute top-2 right-2 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200"
                  aria-label="Remove"
                  title="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586l4.95-4.95a1 1 0 011.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="relative aspect-video bg-black">
                  {(a.type ?? "image") === "image" ? (
                    <Image
                      src={a.url}
                      alt={a.title ?? "Gallery"}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  ) : (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full"
                      src={`${a.url}#t=0.001`}
                    />
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">
                        Title
                      </label>
                      <input
                        value={
                          isCreate
                            ? a.title ?? ""
                            : items[0]?.title ?? a.title ?? ""
                        }
                        onChange={(e) =>
                          isCreate
                            ? updateItem(i, { title: e.target.value })
                            : setItems([
                                {
                                  ...(items[0] ?? a),
                                  title: e.target.value,
                                },
                              ])
                        }
                        placeholder="Title"
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-black focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">
                        Category
                      </label>
                      <input
                        value={
                          isCreate
                            ? a.category ?? ""
                            : items[0]?.category ?? a.category ?? ""
                        }
                        onChange={(e) =>
                          isCreate
                            ? updateItem(i, { category: e.target.value })
                            : setItems([
                                {
                                  ...(items[0] ?? a),
                                  category: e.target.value,
                                },
                              ])
                        }
                        placeholder="Category"
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-black focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={
                        isCreate
                          ? a.description ?? ""
                          : items[0]?.description ?? a.description ?? ""
                      }
                      onChange={(e) =>
                        isCreate
                          ? updateItem(i, { description: e.target.value })
                          : setItems([
                              {
                                ...(items[0] ?? a),
                                description: e.target.value,
                              },
                            ])
                      }
                      placeholder="Description"
                      className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-black focus:border-green-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">
                        Tags (comma)
                      </label>
                      <input
                        value={
                          isCreate
                            ? (a.tags ?? []).join(", ")
                            : (items[0]?.tags ?? a.tags ?? []).join(", ")
                        }
                        onChange={(e) => {
                          const tags = e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          if (isCreate) {
                            updateItem(i, { tags });
                          } else {
                            setItems([{ ...(items[0] ?? a), tags }]);
                          }
                        }}
                        placeholder="Tags"
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-black focus:border-green-500"
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        checked={
                          !!(isCreate
                            ? a.isFeatured
                            : items[0]?.isFeatured ?? a.isFeatured)
                        }
                        onChange={(e) => {
                          if (isCreate) {
                            updateItem(i, { isFeatured: e.target.checked });
                          } else {
                            setItems([
                              {
                                ...(items[0] ?? a),
                                isFeatured: e.target.checked,
                              },
                            ]);
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          {mode === "edit" ? (
            <>
              <button
                onClick={onDelete}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={onUpdate}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-60"
                disabled={isPending || items.length !== 1}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={onCreate}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-60"
              disabled={isPending || items.length === 0}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Save All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
