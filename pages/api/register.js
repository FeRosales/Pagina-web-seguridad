import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password, adminKey } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("mydatabase");

      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Rol seguro
      const role = adminKey === process.env.ADMIN_KEY ? "admin" : "user";

      await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
        role,
      });

      res.status(200).json({ message: `Usuario registrado como ${role}` });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
