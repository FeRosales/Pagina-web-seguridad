"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  
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
    const decoded = token ? decodeJWT(token) : null;

    if (!decoded || decoded.role !== "admin") {
      router.push("/login"); 
    } else {
      setAdmin(decoded);
     
      setOfertas([
        { id: 1, titulo: "Desarrollador Backend", empresa: "Tech Corp", ubicacion: "CDMX" },
        { id: 2, titulo: "Analista de Datos", empresa: "Data Solutions", ubicacion: "Guadalajara" },
      ]);
    }
  }, [router]);

  if (admin === null) return <p className="p-6 text-center">Cargando dashboard...</p>;

  
  const agregarOferta = () => {
    if (!titulo || !empresa || !ubicacion) return;
    const nueva = { id: Date.now(), titulo, empresa, ubicacion };
    setOfertas([nueva, ...ofertas]);
    setTitulo(""); setEmpresa(""); setUbicacion("");
  };

  
  const eliminarOferta = (id) => {
    setOfertas(ofertas.filter((o) => o.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido Administrador, {admin.email}</h1>

      {/* Formulario agregar oferta */}
      <div className="mb-6 p-4 border rounded shadow bg-white max-w-md">
        <h2 className="font-bold mb-2">Agregar nueva oferta</h2>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="text" placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="text" placeholder="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <button onClick={agregarOferta} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Agregar</button>
      </div>

      {/* Lista de ofertas */}
      <h2 className="text-xl mb-4">Ofertas existentes:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertas.map((oferta) => (
          <div key={oferta.id} className="border rounded-lg p-4 shadow bg-white">
            <h3 className="font-bold text-lg">{oferta.titulo}</h3>
            <p className="text-gray-600">{oferta.empresa}</p>
            <p className="text-gray-500">{oferta.ubicacion}</p>
            <button onClick={() => eliminarOferta(oferta.id)} className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
