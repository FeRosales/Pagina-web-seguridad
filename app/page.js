export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Encuentra tu Trabajo Ideal</h1>
      <p className="text-lg mb-8 text-center max-w-lg">
        Explora oportunidades laborales, regístrate y conecta con empresas que buscan tu talento.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Registrarse
        </a>
      </div>
    </main>
  );
}
