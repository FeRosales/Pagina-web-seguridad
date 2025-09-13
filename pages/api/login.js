import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("mydatabase");

      const user = await db.collection("users").findOne({ email });
      if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

      // Crear token JWT
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Inicio de sesión correcto", token, role: user.role });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
