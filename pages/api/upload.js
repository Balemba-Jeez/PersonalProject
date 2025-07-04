import multiparty from 'multiparty'
import { resolve } from 'styled-jsx/css';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import mongoose from 'mongoose';
import { mongooseConnect } from '@/lib/mongoose';
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
const bucketName = 'jesse-next-ecommerce'


export default async function handle(req,res){
    await mongooseConnect();
    await isAdminRequest(req,res);
    
    const form = new multiparty.Form()
    const {fields, files} = await new Promise((resolve,reject) => {
            form.parse(req,  (err, fields, files) => {
        if (err) reject(err);
        resolve({fields,files})

        })
    })
        console.log('length', files.file.length);
        const client = new S3Client({
            region: 'eu-north-1',
            credentials:{
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
            },
        });
        const links = []
        for (const file of files.file){
            const ext = file.originalFilename.split('.').pop();
            const newFilename = Date.now() + '.' + ext;
            await client.send(new PutObjectCommand({
                    Bucket: bucketName,
                    Key: newFilename,
                    Body: fs.readFileSync(file.path),
                    ACL: 'public-read',
                    ContentType: mime.lookup(file.path),
            }
        ));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
        }


        res.json({links})
        //Ended at time: 2:21:59
}

export const config = {
    api : {bodyParser: false}
}