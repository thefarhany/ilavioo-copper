import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ FIXED: GET product by slug - params is now Promise
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params; // ✅ await params
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: [{ isFeatured: "desc" }, { isCatalog: "desc" }],
        },
        highlights: {
          orderBy: { id: "asc" },
        },
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
