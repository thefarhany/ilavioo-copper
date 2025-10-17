import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Define types for request body
type HighlightInput = {
  icon: string;
  text: string;
};

type ImageInput = {
  url: string;
  isFeatured: boolean;
  isCatalog: boolean;
};

type SpecificationInput = {
  size?: string;
  finishing?: string;
  material?: string;
  price?: string;
};

type ProductUpdateBody = {
  name: string;
  slug: string;
  description?: string;
  details?: string;
  notes?: string;
  specifications?: SpecificationInput;
  highlights: HighlightInput[];
  images: ImageInput[];
};

// ✅ FIXED: GET single product - params is now Promise
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ await params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
        highlights: true,
        specifications: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ FIXED: PUT update product - params is now Promise
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // ✅ await params
    const body = (await request.json()) as ProductUpdateBody;
    const {
      name,
      slug,
      description,
      details,
      notes,
      specifications,
      highlights,
      images,
    } = body;

    const productId = parseInt(id);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Check if slug is taken by another product
    if (slug !== existingProduct.slug) {
      const slugTaken = await prisma.product.findUnique({
        where: { slug },
      });
      if (slugTaken) {
        return NextResponse.json(
          { message: "Product with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Delete existing related data
    await prisma.productHighlight.deleteMany({
      where: { productId },
    });
    await prisma.productImage.deleteMany({
      where: { productId },
    });
    await prisma.productSpecification.deleteMany({
      where: { productId },
    });

    // Update product with new data
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        slug,
        description,
        details,
        notes,
        specifications:
          specifications &&
          (specifications.size ||
            specifications.finishing ||
            specifications.material ||
            specifications.price)
            ? {
                create: {
                  size: specifications.size,
                  finishing: specifications.finishing,
                  material: specifications.material,
                  price: specifications.price,
                },
              }
            : undefined,
        highlights: {
          create: highlights.map((h: HighlightInput) => ({
            icon: h.icon,
            text: h.text,
          })),
        },
        images: {
          create: images.map((img: ImageInput) => ({
            imageUrl: img.url,
            isFeatured: img.isFeatured,
            isCatalog: img.isCatalog,
          })),
        },
      },
      include: {
        specifications: true,
        highlights: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ FIXED: DELETE product - params is now Promise
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // ✅ await params
    const productId = parseInt(id);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Delete product (cascade will handle related data)
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
