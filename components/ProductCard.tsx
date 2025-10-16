import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export default function ProductCard({
  name,
  slug,
  description,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`}>
      <div className="group cursor-pointer rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {imageUrl && imageUrl !== "" ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
