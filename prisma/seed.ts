// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Delete existing data
  await prisma.productImage.deleteMany();
  await prisma.productHighlight.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@ilavio.com",
      name: "Admin Ilavio",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: "Elegant Copper Vase",
      slug: "elegant-copper-vase",
      description:
        "The handmade copper vase from Tumang, Boyolali combines traditional artistry with a modern touch. Crafted entirely by skilled artisans, each vase showcases fine details, premium quality, and unique aesthetic value.",
      details:
        "Perfect for home decor, hotel interiors, restaurants, and even large-scale architectural projects. Every product is crafted to meet international export standards and ready to be shipped worldwide.",
      notes:
        "Imagine this stunning piece as the heart of your room, where light dances on its polished copper surface.",
      highlights: {
        create: [
          { icon: "✏️", text: "Custom design based on your request" },
          { icon: "🔨", text: "100% handmade by skilled artisans" },
          { icon: "✈️", text: "Export-quality, ready for global shipment" },
          { icon: "⭐", text: "Made from premium copper" },
          { icon: "💎", text: "Beautiful, durable, and long-lasting" },
        ],
      },
      specifications: {
        create: {
          size: "Medium",
          finishing: "Polished",
          material: "Fine Copper",
          price: "Contact for Price",
        },
      },
      images: {
        create: [
          {
            imageUrl:
              "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
            isFeatured: true,
            isCatalog: false,
          },
          {
            imageUrl:
              "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200",
            isFeatured: false,
            isCatalog: false,
          },
          {
            imageUrl:
              "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
            isFeatured: false,
            isCatalog: true,
          },
        ],
      },
    },
  });

  console.log("✅ Sample product created:", product1.name);
  console.log("\n📋 Admin Credentials:");
  console.log("Email: admin@ilavio.com");
  console.log("Password: admin123");
  console.log("\n🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
