import React from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia'; // Importar correctamente Inertia

const ListaInscripciones = () => {
    // Obtener datos de props enviados por Inertia
    const { inscripciones } = usePage().props;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Inscripciones</h2>
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Turno
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estudiante
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Programa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ciclo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grupo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado de Pago
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {inscripciones.data.map((inscripcion) => (
                        <tr key={inscripcion.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{inscripcion.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{inscripcion.turno}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {`${inscripcion.estudiante.nombres} ${inscripcion.estudiante.aPaterno} ${inscripcion.estudiante.aMaterno}`}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {inscripcion.programa_estudio.nombre_programa}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{inscripcion.ciclo_inscripcion.nombre}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{inscripcion.grupo.nombre}</td>
                            <td
                                className={`px-6 py-4 text-sm font-medium ${
                                    inscripcion.estadopago === "1"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {inscripcion.estadopago === "1" ? "Pagado" : "Pendiente"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botones de Paginación */}
            <div className="mt-4 flex justify-center">
                {inscripciones.links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (link.url) {
                                Inertia.get(link.url);
                            }
                        }}
                        disabled={!link.url}
                        className={`px-4 py-2 mx-1 text-sm font-medium rounded ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        } ${!link.url && "cursor-not-allowed opacity-50"}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListaInscripciones;
