import { Order } from '@/models/Order';
import { mongooseConnect } from '@/lib/mongoose';


export default async function handle(req, res) {
    const {method} = req;
    const { latest } = req.query;


    await mongooseConnect(); //connect to MongoDB

    if (method === 'GET') {
        if (req.query?.id){
            return res.json(await Order.findOne({_id:req.query.id}));
            
        } else if (latest === 'true') {
            const latestOrders = await Order.find()
              .sort({ createdAt: -1 }) // newest first
              .limit(5);
            return res.status(200).json(latestOrders);

          } else {
            return res.json(await Order.find());
        }
    }

    if (method === 'POST') {
        const {amount,date,total, status, shipping,} = req.body;
        const orderDoc = await Order.create({
            amount,date,total, status, shipping,
        })
        res.json(productDoc);
    }

    if (method === 'PUT'){
        const {amount,date,total, status, shipping, _id} = req.body;
        await Order.updateOne({_id}, {title, description, price,images, category, properties,});
        res.json(true);
    }

    if (method === 'DELETE'){
        if (req.query?.id) {
            await Order.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}