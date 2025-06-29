import { mongooseConnect } from '@/lib/mongoose';
import { Payment } from '@/models/Payment';
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    origin: '*',
    methods: ['GET'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  await mongooseConnect();

  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ error: 'Reference is required' });
  }

  try {
    const response = await fetch(`https://demo.campay.net/api/transaction/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.CAMPAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch transaction status', detail: result });
    }

    // Update status in DB if payment exists
    const updated = await Payment.findOneAndUpdate(
      { reference },
      { status: result.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Payment not found in database' });
    }

    return res.status(200).json({
      success: true,
      message: `Payment status is ${result.status}`,
      status: result.status,
      payment: updated,
    });
  } catch (err) {
    console.error('Campay verification error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
