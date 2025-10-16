import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        highlights: true,
        specifications: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
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

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "Product with this slug already exists" },
        { status: 400 }
      );
    }

    // Create product with all related data
    const product = await prisma.product.create({
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
          create: highlights.map((h: any) => ({
            icon: h.icon,
            text: h.text,
          })),
        },
        images: {
          create: images.map((img: any) => ({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
