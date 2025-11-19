import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "";
  const category = searchParams.get("category") ?? "";
  const featured = searchParams.get("featured");

  const assets = await prisma.galleryAsset.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { tags: { has: q } },
              ],
            }
          : {},
        type ? { type } : {},
        category ? { category } : {},
        featured ? { isFeatured: featured === "true" } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(assets);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.url || !body.type) {
    return NextResponse.json(
      { message: "url and type are required" },
      { status: 400 }
    );
  }

  const created = await prisma.galleryAsset.create({
    data: {
      title: body.title ?? null,
      description: body.description ?? null,
      url: body.url,
      type: body.type,
      category: body.category ?? null,
      tags: body.tags ?? [],
      isFeatured: !!body.isFeatured,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
