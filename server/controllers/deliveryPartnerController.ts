// Login Delivery Partner

import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id, role: "delivery" }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// POST /api/delivery/login
export const loginPartner = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const partner = await prisma.deliveryPartner.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!partner) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!partner.isActive) {
    return res
      .status(403)
      .json({ message: "Your account has been deactivated" });
  }

  const isMatch = await bcrypt.compare(password, partner.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(partner.id);
  const { password: _, ...partnerData } = partner;

  res.json({ partner: partnerData, token });
};

// Get assigned deliveries
// GET /api/delivery/my-deliveries
export const getMyDeliveries = async (req: Request, res: Response) => {
  const { status } = req.query;

  const where: any = { deliveryPartnerId: req.partner!.id };

  if (status === "active") {
    where.status = { in: ["Assigned", "Packed", "Out for Delivery"] };
  } else if (status === "completed") {
    where.status = { in: ["Delivered", "Cancelled"] };
  }

  const orders = await prisma.order.findMany({
    where,
    include: { user: { select: { name: true, email: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json({ orders });
};
