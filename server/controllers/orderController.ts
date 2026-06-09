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
    // looks up the product by id:
    // item.product = "abc123"
    // productMap["abc123"] = { name: "Apple", price: 2.99, stock: 10 }
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

  const subtotal = orderItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 20 ? 0 : 1.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  //   create new order
  const order = await prisma.order.create({
    data: {
      userId: req.user!.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      statusHistory: [
        {
          status: "Placed",
          note: "Order placed successfully",
          timestamp: new Date(),
        },
      ],
    },
  });

  if (paymentMethod === "card") {
    // stripe payment link
  }
  //  if cash
  res.json({ order }); // send order back to frontend

  //   Decrease stock
  for (const item of orderItems) {
    await prisma.product.update({
      where: { id: item.product },
      data: { stock: { decrement: item.quantity } },
    });
  }
};

// Get user's orders
// Get /api/orders
export const getUserOrders = async (req: Request, res: Response) => {
  const { status } = req.query;

  //   Get all my orders EXCEPT ones where:
  //- payment method is card AND payment is not done yet
  const where: any = {
    userId: req.user?.id,
    NOT: [{ paymentMethod: "card", isPaid: "false" }],
  };

  if (status && status !== "all") {
    where.status = status;
  }

  const orders = await prisma.order.findMany({
    where,
    // join the deliveryPartner table but only give me name and phone, nothing else
    include: { deliveryPartner: { select: { name: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json({ orders });
};
