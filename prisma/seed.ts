import { convertDecimal } from "@/server/api/routers/order";
import { FulfillmentStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = ["New York", "Los Angeles", "Chicago", "Houston"];
const states = ["NY", "CA", "IL", "TX"];
const statuses = Object.values(FulfillmentStatus);

const productData = [
  {
    name: "Gaming Laptop",
    description: "High-performance gaming laptop",
    price: 1299.99,
    sku: "LAPTOP001",
  },
  {
    name: "Smartphone",
    description: "Latest model smartphone",
    price: 799.99,
    sku: "PHONE001",
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones",
    price: 199.99,
    sku: "AUDIO001",
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch",
    price: 299.99,
    sku: "WATCH001",
  },
  {
    name: "Tablet",
    description: "Portable tablet for work and entertainment",
    price: 499.99,
    sku: "TABLET001",
  },
  {
    name: "Bluetooth Speaker",
    description: "High-quality portable Bluetooth speaker",
    price: 149.99,
    sku: "SPEAKER001",
  },
  {
    name: "4K Television",
    description: "Ultra HD television with smart features",
    price: 999.99,
    sku: "TV001",
  },
  {
    name: "Gaming Console",
    description: "Next-gen gaming console",
    price: 499.99,
    sku: "CONSOLE001",
  },
  {
    name: "E-reader",
    description: "E-reader with adjustable backlight",
    price: 129.99,
    sku: "EREADER001",
  },
  {
    name: "Digital Camera",
    description: "High-resolution camera for photography enthusiasts",
    price: 599.99,
    sku: "CAMERA001",
  },
];

async function main() {
  try {
    const usersData = Array.from({ length: 40 }).map((_, i) => ({
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      hashedPassword: "34e5yu7jiopkl[ertfyujhwesrpkolrtfghyj",
    }));

    await prisma.user.createMany({
      data: usersData,
      skipDuplicates: true,
    });

    await prisma.product.createMany({
      data: productData,
      skipDuplicates: true,
    });

    const users = await prisma.user.findMany();
    const products = await prisma.product.findMany();

    for (const user of users) {
      const orderCount = Math.floor(Math.random() * 4) + 1;

      for (let i = 0; i < orderCount; i++) {
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)] ??
          FulfillmentStatus.PENDING;
        const randomCity =
          cities[Math.floor(Math.random() * cities.length)] ?? "Los Angeles";
        const randomState =
          states[Math.floor(Math.random() * states.length)] ?? "CA";

        const orderItems = products
          .slice(0, Math.floor(Math.random() * products.length) + 1)
          .map((product) => ({
            productId: product.id,
            quantity: Math.floor(Math.random() * 3) + 1,
            price: product.price,
          }));

        const totalAmount = orderItems.reduce(
          (sum, item) => sum + convertDecimal(item.price) * item.quantity,
          0,
        );

        await prisma.order.create({
          data: {
            customerId: user.id,
            status: randomStatus,
            totalAmount,
            orderItems: { create: orderItems },
            shippingAddress: {
              create: {
                street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
                city: randomCity,
                state: randomState,
                zipCode: String(10000 + Math.floor(Math.random() * 90000)),
                country: "USA",
              },
            },
          },
        });
      }
    }
    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
