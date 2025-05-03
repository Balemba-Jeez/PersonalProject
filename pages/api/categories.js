import { Category } from "@/models/Category";

export default async function handle(req,res){
    const {method} = req;

    if(method === 'POSTS') {
        const {name} = req.body;
        const categoryDoc = await Category.create({name});
        res.json(categoryDoc);
        //Ended 3:15:17 
    }
}
