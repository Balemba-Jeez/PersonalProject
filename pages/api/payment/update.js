import { mongooseConnect } from '@/lib/mongoose';
import { Payment } from '@/models/Payment';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Only PUT allowed' });
  }

  const { reference, orderId } = req.body;

  if (!reference || !orderId) {
    return res.status(400).json({ error: 'Missing reference or orderId' });
  }

  try {
    const updated = await Payment.findOneAndUpdate(
      { reference },
      { orderId },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json({ success: true, payment: updated });
  } catch (error) {
    console.error('Update payment error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
