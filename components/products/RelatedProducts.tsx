import ProductCard from "@/components/ProductCard";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface ProductSpecification {
  size?: string | null;
  finishing?: string | null;
  material?: string | null;
  price?: string | null;
}

interface ProductImage {
  id: number;
  imageUrl: string;
  isCatalog: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  images: ProductImage[];
  specifications?: ProductSpecification | null;
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard
            name={product.name}
            slug={product.slug}
            description={product.description}
            imageUrl={product.images[0]?.imageUrl || "/placeholder-product.jpg"}
            specifications={
              product.specifications
                ? {
                    size: product.specifications.size,
                    finishing: product.specifications.finishing,
                    material: product.specifications.material,
                    price: product.specifications.price,
                  }
                : null
            }
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
