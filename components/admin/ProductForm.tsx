"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    details: string | null;
    notes: string | null;
    highlights: Array<{ id: number; icon: string | null; text: string }>;
    specifications: {
      size: string | null;
      finishing: string | null;
      material: string | null;
      price: string | null;
    } | null;
    images: Array<{
      id: number;
      imageUrl: string;
      isFeatured: boolean;
      isCatalog: boolean;
    }>;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [details, setDetails] = useState(product?.details || "");
  const [notes, setNotes] = useState(product?.notes || "");

  const [size, setSize] = useState(product?.specifications?.size || "");
  const [finishing, setFinishing] = useState(
    product?.specifications?.finishing || ""
  );
  const [material, setMaterial] = useState(
    product?.specifications?.material || ""
  );
  const [price, setPrice] = useState(product?.specifications?.price || "");

  const [highlights, setHighlights] = useState<
    Array<{ icon: string; text: string }>
  >(
    product?.highlights.map((h) => ({
      icon: h.icon || "",
      text: h.text,
    })) || [{ icon: "", text: "" }]
  );

  const [images, setImages] = useState<
    Array<{ url: string; isFeatured: boolean; isCatalog: boolean }>
  >(
    product?.images.map((img) => ({
      url: img.imageUrl,
      isFeatured: img.isFeatured,
      isCatalog: img.isCatalog,
    })) || []
  );
  const [imageUrl, setImageUrl] = useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!product) {
      setSlug(generateSlug(value));
    }
  };

  const addHighlight = () => {
    setHighlights([...highlights, { icon: "", text: "" }]);
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const updateHighlight = (
    index: number,
    field: "icon" | "text",
    value: string
  ) => {
    const updated = [...highlights];
    updated[index][field] = value;
    setHighlights(updated);
  };

  const uploadImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select at least one image to upload.");
      }

      const files = Array.from(e.target.files);

      const uploadedImages: Array<{
        url: string;
        isFeatured: boolean;
        isCatalog: boolean;
      }> = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}-${Date.now()}-${i}.${fileExt}`;
        const filePath = `products/${fileName}`;

        console.log(`Uploading file ${i + 1}/${files.length}: ${fileName}`);

        const { data, error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error(
            `Failed to upload ${file.name}: ${uploadError.message}`
          );
        }

        console.log("Upload successful:", data);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        console.log("Public URL:", publicUrl);

        uploadedImages.push({
          url: publicUrl,
          isFeatured: false,
          isCatalog: false,
        });
      }

      setImages([
        ...images,
        ...uploadedImages.map((img, idx) => ({
          ...img,
          isFeatured: images.length === 0 && idx === 0,
        })),
      ]);

      e.target.value = "";
      alert(`Successfully uploaded ${uploadedImages.length} image(s)`);
    } catch (error) {
      console.error("Error uploading images:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Error uploading images: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setImages([
        ...images,
        {
          url: imageUrl,
          isFeatured: false,
          isCatalog: false,
        },
      ]);
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleFeatured = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isFeatured: i === index ? !img.isFeatured : false,
    }));
    setImages(updated);
  };

  const toggleCatalog = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isCatalog: i === index ? !img.isCatalog : img.isCatalog,
    }));
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      name,
      slug,
      description: description || null,
      details: details || null,
      notes: notes || null,
      specifications: {
        size: size || null,
        finishing: finishing || null,
        material: material || null,
        price: price || null,
      },
      highlights: highlights.filter((h) => h.text.trim() !== ""),
      images: images,
    };

    try {
      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Basic Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Product Name"
            className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Description"
            className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            placeholder="Details"
            className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Notes"
            className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
              placeholder="20 cm x 30 cm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
              placeholder="Fine Copper"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Finishing
            </label>
            <input
              type="text"
              value={finishing}
              onChange={(e) => setFinishing(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
              placeholder="Polished, Antique"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
              placeholder="Contact for Details"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Product Highlights
          </h2>
          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center text-sm gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Highlight
          </button>
        </div>

        {highlights.map((highlight, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={highlight.text}
              onChange={(e) => updateHighlight(index, "text", e.target.value)}
              placeholder="Product Highlights"
              className="flex-1 px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeHighlight(index)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Product Images
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={uploadImageFiles}
              className="hidden"
              disabled={uploading}
            />
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
              {uploading ? "Uploading..." : "Choose Files"}
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Upload multiple images from your computer
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or Add from URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/"
              className="flex-1 px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add URL
            </button>
          </div>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group border border-gray-200 rounded-lg overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={`Product ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(index)}
                    className={`p-2 rounded-full ${
                      img.isFeatured
                        ? "bg-yellow-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    title="Featured"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCatalog(index)}
                    className={`p-2 rounded-full ${
                      img.isCatalog
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    title="Catalog"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
