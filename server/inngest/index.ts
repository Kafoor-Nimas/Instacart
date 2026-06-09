import { Inngest } from "inngest";
import { prisma } from "../config/prisma.js";

const LOW_STOCK_THRESHOLD = 10;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "grocery-delivery" });

// Low Stock alert to admin email
const checkLowStock = inngest.createFunction(
  {
    id: "check-low-stock",
    name: "Low Stock Alert",
    triggers: [{ event: "inventory/stock.updated" }],
  },
  async ({ event, step }) => {
    const { productId } = event.data;

    const product = await step.run("fetch-product", async () => {
      return await prisma.product.findUnique({ where: { id: productId } });
    });
    if (
      !product ||
      product.stock === null ||
      product.stock >= LOW_STOCK_THRESHOLD
    ) {
      return { skipped: true, stock: product?.stock };
    }

    await step.run("send-low-stock-email", async () => {
      const adminEmails = process.env.ADMIN_EMAILS
        ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim())
        : [];

      if (adminEmails.length === 0)
        return { skipped: true, reason: "No admin emails" };
    });
  },
);
export const functions = [];
