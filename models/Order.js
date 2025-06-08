import { Schema } from "mongoose";
import { models, model } from "mongoose";

const OrderSchema = new Schema({
    line_items:Object,
    name:String,
    email:String,
    postalCode:String,
    streetAddress:String,
    country:String,
    paid:Boolean,
});

export const Order = models?.Order || model('Order', OrderSchema);