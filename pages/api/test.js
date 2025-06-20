import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  // Just insert one dummy order
  const order = await Order.create({
    amount: 1000,
    total: 1000,
    date: new Date(),
    status: "pending",
    shipping: {
      address: "Test Street",
      city: "Yaoundé",
      number: 123456789,
    },
  });

  res.status(200).json(order);
}
