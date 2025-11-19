export type GalleryAsset = {
  id: number;
  title: string | null;
  description: string | null;
  url: string;
  type: "image" | "video";
  category: string | null;
  tags: string[];
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
};
