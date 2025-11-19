"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  assetId: number;
  redirectTo?: string;
}

export default function DeleteButton({
  assetId,
  redirectTo = "/admin/gallery",
}: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this item? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      console.log("🗑️ Deleting asset ID:", assetId);

      const res = await fetch(`/api/gallery/${assetId}`, {
        method: "DELETE",
      });

      console.log("📡 Response status:", res.status);

      // Log response body for debugging
      const data = await res.json();
      console.log("📦 Response data:", data);

      if (!res.ok) {
        throw new Error(
          data.message || `Delete failed with status ${res.status}`
        );
      }

      console.log("✅ Delete success!");

      // Redirect and refresh
      startTransition(() => {
        router.push(redirectTo);
        router.refresh();
      });
    } catch (error) {
      console.error("❌ Delete error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete asset. Please check console for details.";

      alert(errorMessage);
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting || isPending}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete asset"
    >
      {isDeleting || isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="w-4 h-4" />
          Delete
        </>
      )}
    </button>
  );
}
