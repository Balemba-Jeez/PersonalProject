import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/admin";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { name, email, password } = req.body;


    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "We don't recognize that username or password. You can try again" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "We don't recognize that username or password. You can try again" });
    }

    // For now just return the user info (later we add sessions or JWT)
    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  }
}
