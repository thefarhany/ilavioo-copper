"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Upload,
  Sparkles,
  Image as ImageIcon,
  Star,
  BookOpen,
  Save,
  ArrowLeft,
  Loader2,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

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

  // Form States
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [details, setDetails] = useState(product?.details || "");
  const [notes, setNotes] = useState(product?.notes || "");

  // Specifications
  const [size, setSize] = useState(product?.specifications?.size || "");
  const [finishing, setFinishing] = useState(
    product?.specifications?.finishing || ""
  );
  const [material, setMaterial] = useState(
    product?.specifications?.material || ""
  );
  const [price, setPrice] = useState(product?.specifications?.price || "");

  // Highlights
  const [highlights, setHighlights] = useState<
    Array<{ icon: string; text: string }>
  >(
    product?.highlights.map((h) => ({
      icon: h.icon || "",
      text: h.text,
    })) || [{ icon: "", text: "" }]
  );

  // Images
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

  // Helper Functions
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

  // Highlights Functions
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

  // Image Upload Functions
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

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(
            `Failed to upload ${file.name}: ${uploadError.message}`
          );
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

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
        { url: imageUrl, isFeatured: false, isCatalog: false },
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

  // Form Submission
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
    <div className="max-w-5xl">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {product ? "Edit Product" : "Create New Product"}
        </h1>
        <p className="text-gray-600 mt-2">
          {product
            ? "Update product information and settings"
            : "Fill in the details below to create a new copper craft product"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Basic Information
              </h3>
              <p className="text-sm text-gray-500">Essential product details</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Handcrafted Copper Vase"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="handcrafted-copper-vase"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL-friendly version: /products/
                  <span className="font-semibold text-gray-700">
                    {slug || "slug"}
                  </span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief description of the product..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Details */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Detailed information about the product..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Additional notes or special instructions..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Specifications
              </h3>
              <p className="text-sm text-gray-500">
                Technical details and pricing
              </p>
            </div>
          </div>

          <div className="p-6 grid sm:grid-cols-2 gap-6">
            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Size
              </label>
              <input
                id="size"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="20 cm x 30 cm"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Material */}
            <div>
              <label
                htmlFor="material"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Material
              </label>
              <input
                id="material"
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Fine Copper"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Finishing */}
            <div>
              <label
                htmlFor="finishing"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Finishing
              </label>
              <input
                id="finishing"
                type="text"
                value={finishing}
                onChange={(e) => setFinishing(e.target.value)}
                placeholder="Polished, Antique"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contact for Details"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Product Highlights
                </h3>
                <p className="text-sm text-gray-500">
                  Key features and benefits
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Highlight
            </button>
          </div>

          <div className="p-6 space-y-4">
            {highlights.length === 0 ? (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No highlights added yet</p>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add First Highlight
                </button>
              </div>
            ) : (
              highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors group"
                >
                  <input
                    type="text"
                    value={highlight.icon}
                    onChange={(e) =>
                      updateHighlight(index, "icon", e.target.value)
                    }
                    placeholder="Icon (emoji)"
                    className="w-20 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-black focus:border-green-500 focus:outline-none text-center text-xl"
                  />
                  <input
                    type="text"
                    value={highlight.text}
                    onChange={(e) =>
                      updateHighlight(index, "text", e.target.value)
                    }
                    placeholder="Highlight text..."
                    className="flex-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-black focus:border-green-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Product Images
              </h3>
              <p className="text-sm text-gray-500">Upload or add image URLs</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Upload Images
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={uploadImageFiles}
                  multiple
                  accept="image/*"
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all ${
                    uploading
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-gray-50 hover:bg-gray-100 hover:border-green-500"
                  }`}
                >
                  {uploading ? (
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 text-green-600 mx-auto mb-3 animate-spin" />
                      <p className="text-sm text-gray-600 font-medium">
                        Uploading images...
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Or Add URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Or Add Image URL
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-green-500 focus:outline-none focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={addImage}
                  disabled={!imageUrl.trim()}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Images Grid */}
            {images.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Uploaded Images ({images.length})
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-300 transition-all"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={image.url}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 right-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFeatured(index)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                            image.isFeatured
                              ? "bg-green-600 text-white"
                              : "bg-white/90 text-gray-700 hover:bg-white"
                          }`}
                        >
                          <Star
                            className={`w-3 h-3 ${
                              image.isFeatured ? "fill-white" : ""
                            }`}
                          />
                          Featured
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCatalog(index)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                            image.isCatalog
                              ? "bg-blue-600 text-white"
                              : "bg-white/90 text-gray-700 hover:bg-white"
                          }`}
                        >
                          {image.isCatalog && <Check className="w-3 h-3" />}
                          Catalog
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No images added yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Upload images or add URLs above
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {product ? "Update Product" : "Create Product"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
