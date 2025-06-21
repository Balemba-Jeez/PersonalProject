import { ObjectId } from "mongodb";
import mongoose, { models, Schema } from "mongoose";

// models/Order.js
const OrderSchema = new Schema({
    amount: Number,
    total: Number,
    status: String,
    shipping: {
      name: String,
      email: String,
      address: String,
      city: String,
      number: Number,
      cni: String,
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
