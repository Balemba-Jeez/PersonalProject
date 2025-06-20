
import { ObjectId } from "mongodb";
import mongoose, { models, Schema } from "mongoose";

const AdminSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      image: {type: String},
    },
    {
      timestamps: true,
    }
  );
  
  export const Admin = models.Admin || mongoose.model('Admin', AdminSchema);