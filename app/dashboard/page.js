"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const decoded = decodeJWT(token);
    if (!decoded || decoded.role !== "user") {
      router.push("/login");
      return;
    }
    setUser(decoded);
  }, []);

  if (!user) return <p>Cargando...</p>;

  
  const ofertas = [
    { id: 1, titulo: "Desarrollador Frontend", empresa: "Tech Solutions", ubicacion: "CDMX" },
    { id: 2, titulo: "Ingeniero de Datos", empresa: "DataCorp", ubicacion: "Guadalajara" },
    { id: 3, titulo: "Diseñador UX/UI", empresa: "Creativa", ubicacion: "Monterrey" },
    { id: 4, titulo: "Administrador de Sistemas", empresa: "NetSecure", ubicacion: "CDMX" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido, {user.email}</h1>
      <h2 className="text-xl mb-4">Ofertas de trabajo disponibles:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertas.map((oferta) => (
          <div key={oferta.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{oferta.titulo}</h3>
            <p className="text-gray-600">{oferta.empresa}</p>
            <p className="text-gray-500">{oferta.ubicacion}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Aplicar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
