import { Order } from '@/models/Order';
import { mongooseConnect } from '@/lib/mongoose';
import mongoose from "mongoose";

export default async function handle(req, res) {
    const {method} = req;
    const { latest } = req.query;


    await mongooseConnect(); //connect to MongoDB

    if (method === 'GET') {
        // Get single order with all its product details
        if (req.query?.id) {
          const order = await Order.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "orderId",
                as: "productDetails"
              }
            }
            // ❌ remove $unwind to keep array of products
          ]);
          return res.json(order[0]); // return first match
        }
      
        // Get latest 5 orders with all their product details
        else if (latest === 'true') {
          const latestOrders = await Order.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "orderId",
                as: "productDetails"
              }
            }
          ]);
          return res.status(200).json(latestOrders);
        }
      
        // Get all orders with their product details
        else {
          const allOrders = await Order.aggregate([
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "orderId",
                as: "productDetails"
              }
            }
          ]);
          return res.json(allOrders);
        }
      }
      
    

      if (method === 'POST') {
        const { amount, date, total, status, shipping, products } = req.body;
      
        const orderDoc = await Order.create({
          amount, date, total, status, shipping, products
        });
      
        res.json(orderDoc);
      }
      
      if (method === 'PUT') {
        const { _id, status } = req.body;
      
        // Only update status if it's provided
        if (_id && status) {
          await Order.updateOne({ _id }, { status });
          return res.json({ success: true });
        }
      
        // Fall back to full update
        const { amount, date, total, shipping, products } = req.body;
        await Order.updateOne({ _id }, { amount, date, total, status, shipping, products });
        return res.json({ success: true });
      }
      

    if (method === 'DELETE'){
        if (req.query?.id) {
            await Order.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}