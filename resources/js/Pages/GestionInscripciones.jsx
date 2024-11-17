import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => handlePagination(link.url)}
                    disabled={!link.url}
                    className="px-4 py-2 mx-1 text-sm text-white bg-indigo-600 rounded-md"
                >
                    {link.label}
                </button>
            ))}
        </div>
    );
}

export default function GestionInscripciones({ inscripciones }) {
    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Inscripciones" />

            <h2 className="text-xl font-semibold leading-tight text-black">
                GESTION DE INSCRIPCIONES

            </h2>
            <p className="leading-tight text-gray-400">Modifica algunas campos de una inscripcion (este proceso solo se puede realizar antes de que el ciclo haya empezado)</p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-300">
                        <div className="p-6 text-gray-900">

                        <h3 className="text-md font-medium mb-4 text-blue-900">Campos que se pueden modificar</h3>
                        <p className="leading-tight text-gray-400">Para que se llene el formulario precione el boton de editar en la tabla en la fila correspondiente a su eleccion</p>
                            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            
                            <div className="col-span-1">

                                    <label
                                        htmlFor="turno"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Turno
                                    </label>
                                    <input
                                        id="turno"
                                        type="text"
                                        placeholder="Turno"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="estudiante"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Estudiante
                                    </label>
                                    <input
                                        id="estudiante"
                                        type="text"
                                        placeholder="Estudiante"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="grupo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Grupo
                                    </label>
                                    <input
                                        id="grupo"
                                        type="text"
                                        placeholder="Grupo"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="fechaInscripcion"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Fecha de Inscripción
                                    </label>
                                    <input
                                        id="fechaInscripcion"
                                        type="date"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="ciclo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Ciclo
                                    </label>
                                    <input
                                        id="ciclo"
                                        type="text"
                                        placeholder="Ciclo"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="programa"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Programa de Estudio
                                    </label>
                                    <input
                                        id="programa"
                                        type="text"
                                        placeholder="Programa de Estudio"
                                        className="mt-1 block w-full border p-2 rounded-md"
                                        required
                                    />
                                </div>
                                
                            </div>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                        >
                                            Actualizar
                                        </button>
                            <h3 className="mt-4 text-md font-medium mb-4">

                                Lista de Inscripciones
                            </h3>
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Turno
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Valor de Pago
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Estudiante
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Ciclo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Programa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inscripciones.data.map(($inscripcion) => (
                                        <tr key={$inscripcion.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {$inscripcion.turno}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {$inscripcion.fechaInscripcion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {$inscripcion.estadopago}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                
                                           { $inscripcion.estudiante.nombres}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                
                                                {$inscripcion.idciclo}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {$inscripcion.idprogramaestudios}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Paginación (si estás usando paginación) */}
                            <div className="mt-4">
                                <Pagination links={inscripciones.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
