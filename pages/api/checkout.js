import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

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
        const info = productInfos.find(p => p._id.toStrin() === productId);
        const quantity = products.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfos) {
            line_items.push({
              quantity,
              price_data: {
                currency: 'USD',
                product_data:
              }
//ended at 9:27:41

            })
        }

    }
}