import { mongooseConnect } from '@/lib/mongoose';
import { Payment } from '@/models/Payment';
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default async function handle(req, res) {
  await cors(req, res);
  await mongooseConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  console.log('Incoming payment request:', req.body);
  console.log('Campay API Key:', process.env.CAMPAY_API_KEY);
  const { amount, phoneNumber, description = 'Order Payment', method, orderId = null, total } = req.body;

  if (!amount || !phoneNumber) {
    return res.status(400).json({ error: 'Amount and phone number are required' });
  }

  try {
    console.log('Sending to Campay:', {
      amount,
      from: '+237' + phoneNumber,
      description,
    });

    const response = await fetch('https://demo.campay.net/api/collect/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.CAMPAY_API_KEY}`,
      },
      body: JSON.stringify({
        amount: 50,
        from: '+237' + phoneNumber,
        description,
        external_reference: '',
        currency: 'XAF',
      }),
    });

    const result = await response.json();
    console.log('Campay response:', result);

    if (response.ok) {
      // ✅ Save the payment
      const savedPayment = await Payment.create({
        amount,
        total: total, // optional – update if needed
        status: result.status || 'pending', // or 'success' if Campay confirms
        orderId: orderId || null,
        method,
        reference: result.reference,
      });

      return res.status(200).json({
        success: true,
        paymentId: result.id,
        message: 'Payment initiated and saved',
        payment: savedPayment,
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
    console.error('Campay error:', error.message);
    console.error(error.stack);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
