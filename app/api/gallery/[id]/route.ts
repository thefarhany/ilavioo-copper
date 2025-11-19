import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);
  const asset = await prisma.galleryAsset.findUnique({ where: { id } });
  if (!asset)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(asset);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);
  const body = await req.json();
  const updated = await prisma.galleryAsset.update({
    where: { id },
    data: {
      title: body.title ?? null,
      description: body.description ?? null,
      url: body.url ?? undefined,
      type: body.type ?? undefined,
      category: body.category ?? null,
      tags: body.tags ?? undefined,
      isFeatured: body.isFeatured ?? undefined,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);
  await prisma.galleryAsset.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
