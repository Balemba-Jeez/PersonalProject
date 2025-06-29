import { Order } from '@/models/Order';
import { mongooseConnect } from '@/lib/mongoose';
import mongoose from "mongoose";
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware'; // helper to use middleware in Next.js API routes

const cors = initMiddleware(
  Cors({
    origin: '*', // or use your actual domain(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);


export default async function handle(req, res) {
    await cors(req, res);
    const {method} = req;
    const { latest, today, week, month } = req.query;


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
            { $sort: { createdAt: -1 } }, //descending order (latest dates first)
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
          console.log('latestOrders', latestOrders);
          return res.status(200).json(latestOrders);
        }
        else if (today === 'true') {
                const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);

          const todayOrders = await Order.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: startOfToday,
                  $lte: endOfToday
                }
              }
            }
          ]);
          // Send count
          return res.status(200).json({ count: todayOrders.length });
          
        }
        else if (week === 'true') {
          const now = new Date();
        
          // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          const day = now.getDay();
          const diffToMonday = day === 0 ? -6 : 1 - day; // Adjust if it's Sunday
        
          // Start of the week (Monday)
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() + diffToMonday);
          startOfWeek.setHours(0, 0, 0, 0);
        
          // End of the week (Sunday)
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);
        
          const weekOrders = await Order.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: startOfWeek,
                  $lte: endOfWeek,
                },
              },
            },
          ]);
        
          return res.status(200).json({ count: weekOrders.length });
        }
        else if (month === 'true') {
          const now = new Date();
        
          // Start of the month
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          // End of the month
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        
          const monthOrders = await Order.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: startOfMonth,
                  $lte: endOfMonth
                }
              }
            }
          ]);
        
          return res.status(200).json({ count: monthOrders.length });
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
          console.log('All orders:', allOrders);
          return res.json(allOrders);
        }
      }
      
    

if (method === 'POST') {
  try {
    const { amount, total, status, shipping, products, phone } = req.body;

    // 🪙 Call Campay to collect payment
    const campayRes = await fetch('https://demo.campay.net/api/collect/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.CAMPAY_API_TOKEN}`, // store your token in .env
      },
      body: JSON.stringify({
        amount,
        from: '+237' + phone, // Phone number from client
        description: 'Order payment',
        external_reference: '',
        currency: 'XAF',
      }),
    });

    const result = await campayRes.json();

    if (!campayRes.ok) {
      console.error('Campay Error:', result);
      return res.status(400).json({ error: 'Payment failed', details: result });
    }

    // 💾 Save order if payment is successful
    const orderDoc = await Order.create({
      amount,
      total,
      status: 'paid',
      shipping,
      products,
    });

    return res.status(201).json({
      message: 'Order placed and payment successful',
      order: orderDoc,
      payment: result,
    });

  } catch (err) {
    console.error('Error placing order:', err);
    return res.status(500).json({ error: 'Failed to place order' });
  }
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
            return res.json(true);
        }
    }
}