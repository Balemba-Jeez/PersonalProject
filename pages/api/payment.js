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
    


    await mongooseConnect(); //connect to MongoDB

// pages/api/payment.js
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { amount, phoneNumber, description = 'Order Payment' } = req.body;

  if (!amount || !phoneNumber) {
    return res.status(400).json({ error: 'Amount and phone number are required' });
  }

  try {
    const response = await fetch('https://demo.campay.net/api/collect/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.CAMPAY_API_KEY}`, // store securely in .env
      },
      body: JSON.stringify({
        amount,
        from: '+237' + phoneNumber,
        description,
        external_reference: '', // optional
        currency: 'XAF',
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({
        success: true,
        paymentId: result.id,
        message: 'Payment initiated successfully',
        campayResponse: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result,
        message: 'Campay payment failed',
      });
    }
  } catch (error) {
    console.error('Campay error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
