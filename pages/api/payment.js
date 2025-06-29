import { Order } from '@/models/Order';
import { mongooseConnect } from '@/lib/mongoose';
import mongoose from "mongoose";
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware'; // helper to use middleware in Next.js API routes

const cors = initMiddleware(
  Cors({
    origin: '*', // or use your actual domain(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);


export default async function handle(req, res) {
    await cors(req, res);
    const {method} = req;
    const { latest, today, week, month } = req.query;


    await mongooseConnect(); //connect to MongoDB
    
    }