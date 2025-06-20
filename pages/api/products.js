import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
// import { _id } from "@next-auth/mongodb-adapter";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    const { latest } = req.query;
    await mongooseConnect();
    // await isAdminRequest(req,res);
    
    
    if(method === 'GET'){
        if (req.query?.id){
            return res.json(await Product.findOne({_id:req.query.id}));
            
        } else if (latest === 'true') {
            const latestProducts = await Product.find()
              .sort({ createdAt: -1 }) // newest first
              .limit(5);
            return res.status(200).json(latestProducts);

          } else {
            return res.json(await Product.find());
        }
    }
    if (method === 'POST') {
        const {title,description,price, images, category, properties,} = req.body;
        const productDoc = await Product.create({
            title,description,price, images, category, properties,
        })
        res.json(productDoc);
    }

    if (method === 'PUT'){
        const {title,description,price, images, category, properties, _id, orderId} = req.body;
        await Product.updateOne({_id}, {title, description, price,images, category, properties, orderId});
        res.json(true);
    }

    if (method === 'DELETE'){
        if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}