import { images } from "@/next.config";
import mongoose, { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema({
    amount: Number,
    total: Number,
    status: String,
    orderId: {type: mongoose.Types.ObjectId, ref: 'Order'},
    method: String
}, {
    timestamps: true,
});




export const Payment = models.Payment || model('Payment', PaymentSchema);