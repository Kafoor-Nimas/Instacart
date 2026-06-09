import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Create order
// POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  // Check if order items are empty
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  //   Look up actual prices from the database
  const productIds = items.map((i: any) => i.product);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productMap: Record<string, (typeof products)[0]> = {};
  products.forEach((p: any) => (productMap[p.id] = p));

  //   Check if product is in stock
  for (const item of items) {
    const product = productMap[item.product];
    if (!product || (product.stock ?? 0) < item.quantity) {
      return res.status(404).json({ message: "Product out of stock" });
    }
  }

  const orderItems = items.map((item: any) => {
    const dbProduct = productMap[item.product];
    if (!dbProduct) throw new Error(`Product ${item.product} not found`);
    return {
      product: dbProduct.id,
      name: dbProduct.name,
      image: dbProduct.image,
      price: dbProduct.price,
      quantity: item.quantity,
      unit: dbProduct.unit,
    };
  });
};
