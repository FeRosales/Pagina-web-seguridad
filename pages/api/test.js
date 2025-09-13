import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase"); // mismo nombre que pusiste en URI
    const collections = await db.listCollections().toArray();
    res.status(200).json({ collections });
  } catch (err) {
    res.status(500).json({ message: "Error conectando a MongoDB", error: err.message });
  }
}
