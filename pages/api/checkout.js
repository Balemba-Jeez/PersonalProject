import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { Order } from "@/models/Order";

export default async function handler(req, res){
    if (req.method !== 'POST') {
        res.json('should be a Post request');
        return;
    }
    const {
        name,email,city, 
        postalCode, streetAddress, country,
        products,
    } = req.body;
    await mongooseConnect();
    const productIds = products.split(',');
    //Creating a set of unique ids using Set from a and array of productIds
    const uniqueIds = [...new Set(productIds)];
    const productInfos = await Product.find({_id:uniqueIds});

    let line_items = [];
    for(const productId of uniqueIds){
        const productInfo = productInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
              quantity,
              price_data: {
                currency: 'USD',
                product_data: {name:productInfo.title},
                unit_amount: quantity * productInfo.price,
              }


            });
        }

    }


    const OrderDoc = await Order.create({
        line_items,name,email,city,postalCode,
        streetAddress, country, paid:false,
    });


}