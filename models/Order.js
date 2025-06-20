import { ObjectId } from "mongodb";
import mongoose, { models, Schema } from "mongoose";

// models/Order.js
const OrderSchema = new Schema({
    amount: Number,
    date: Date,
    total: Number,
    status: String,
    shipping: {
      address: String,
      city: String,
      number: Number,
    },
    products: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        amount: { type: Number }, // optional, can be computed
      }
    ]
  }, {
    timestamps: true,
  });
  

export const Order = models.Order || mongoose.model('Order', OrderSchema);
