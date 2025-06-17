import { ObjectId } from "mongodb";
import mongoose, { models, Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        //userId: {type: Schema.Types.ObjectId, ref:'User',required: true},
        amount: {type: Number, required: true},
        date: {type: Date, required: true, },
        total:{type: Number, required:true,},
        status: {
            type: String, 
            enum:[
                'pending', 
                'validated', 
                'processing', 
                'delivery', 
                'completed', 
                'cancelled', 
                'paid', 
                'delivered'
            ]
        },
        shipping: {
            address: {type: String},
            city: {type: String},
            number: {type: Number}
    },
    {
        timestamps: true
    }
);

export const Order = models.Order || mongoose.model('Order', OrderSchema);