import Link from "next/link";
import Image from "next/image";

interface FeaturedProductCardProps {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export default function FeaturedProductCard({
  name,
  slug,
  description,
  imageUrl,
}: FeaturedProductCardProps) {
  return (
    <Link
      href="/products"
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
