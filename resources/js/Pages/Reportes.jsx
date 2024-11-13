import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Reportes({ datos = [] }) {
    const [cicloFiltrado, setCicloFiltrado] = useState('');
   
    // Función para manejar el cambio de ciclo seleccionado
    const handleCicloChange = (e) => {
        setCicloFiltrado(e.target.value);
    };

    // Filtrar los datos por el ciclo seleccionado
    const datosFiltrados = datos.filter((dato) =>
        cicloFiltrado === '' || dato.ciclo === cicloFiltrado
    );

    // Función para generar el PDF
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Inscripciones', 20, 10);
        doc.autoTable({
            head: [['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Edad', 'Estado de Pago', 'Programa de Estudio', 'Grupo', 'Ciclo']],
            body: datosFiltrados.map((dato) => [
                dato.nombre,
                dato.apellidoPaterno,
                dato.apellidoMaterno,
                dato.edad,
                dato.estadoPago,
                dato.programaEstudio,
                dato.grupo,
                dato.ciclo
            ]),
        });
        doc.save('reporte_estudiantes.pdf');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Reportes" />
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                REPORTES
            </h2>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <label htmlFor="ciclo" className="block text-sm font-medium text-gray-700">
                                    Filtrar por ciclo:
                                </label>
                                <select
                                    id="ciclo"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={cicloFiltrado}
                                    onChange={handleCicloChange}
                                >
                                    <option value="">Todos los ciclos</option>
                                    <option value="Ciclo 1">Ciclo 1</option>
                                    <option value="Ciclo 2">Ciclo 2</option>
                                    <option value="Ciclo 2">Ciclo intensivo</option>
                                </select>
                            </div>

                            <button
                                onClick={handleExportPDF}
                                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Imprimir PDF
                            </button>

                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-4 py-2">Nombre</th>
                                        <th className="border px-4 py-2">Apellido Paterno</th>
                                        <th className="border px-4 py-2">Apellido Materno</th>
                                        <th className="border px-4 py-2">Edad</th>
                                        <th className="border px-4 py-2">Estado de Pago</th>
                                        <th className="border px-4 py-2">Programa de Estudio</th>
                                        <th className="border px-4 py-2">Grupo</th>
                                        <th className="border px-4 py-2">Ciclo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosFiltrados.map((dato, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border px-4 py-2">{dato.nombre}</td>
                                            <td className="border px-4 py-2">{dato.apellidoPaterno}</td>
                                            <td className="border px-4 py-2">{dato.apellidoMaterno}</td>
                                            <td className="border px-4 py-2">{dato.edad}</td>
                                            <td className="border px-4 py-2">{dato.estadoPago}</td>
                                            <td className="border px-4 py-2">{dato.programaEstudio}</td>
                                            <td className="border px-4 py-2">{dato.grupo}</td>
                                            <td className="border px-4 py-2">{dato.ciclo}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
