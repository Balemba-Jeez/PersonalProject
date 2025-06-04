import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    // console.log("Incoming cart IDs:", ids);

    res.json(await Product.find({_id:ids}));
}