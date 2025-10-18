import { useState } from "react";
import { Search, RefreshCw, FileDown, MapPin } from "lucide-react";

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">MapExtractor</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Reportes</a>
          <a href="#" className="hover:underline">Configuración</a>
        </nav>
      </header>

      <section className="max-w-4xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Búsqueda de lugares en Google Maps</h2>
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ej. veterinarias en Monterrey"
            className="border rounded-lg p-2 w-2/3 shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Search size={18}/> Buscar
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Resultados de la búsqueda</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              <RefreshCw size={16}/> Actualizar
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              <FileDown size={16}/> Exportar
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando resultados...</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Dirección</th>
                <th className="border p-2 text-center">Calificación ⭐</th>
                <th className="border p-2 text-center">Teléfono</th>
                <th className="border p-2 text-center">Última actualización</th>
                <th className="border p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">Veterinaria Yak-C</td>
                <td className="border p-2">Av. Central 123, CDMX</td>
                <td className="border p-2 text-center">4.8</td>
                <td className="border p-2 text-center">(55) 1234-5678</td>
                <td className="border p-2 text-center">17/10/2025</td>
                <td className="border p-2 text-center">
                  <button className="text-blue-600 hover:underline flex items-center mx-auto gap-1">
                    <MapPin size={16}/> Ver mapa
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">Clínica Animal Norte</td>
                <td className="border p-2">Calle Reforma 55, Monterrey</td>
                <td className="border p-2 text-center">4.5</td>
                <td className="border p-2 text-center">(81) 9988-2211</td>
                <td className="border p-2 text-center">16/10/2025</td>
                <td className="border p-2 text-center">
                  <button className="text-blue-600 hover:underline flex items-center mx-auto gap-1">
                    <MapPin size={16}/> Ver mapa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>

      <footer className="mt-10 p-4 text-center text-gray-500 text-sm">
        © 2025 MapExtractor — Todos los derechos reservados.
      </footer>
    </div>
  );
}
