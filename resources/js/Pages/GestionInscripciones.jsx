import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import axios from "axios";

function Pagination({ links }) {
    const handlePagination = (url) => {
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <div className="flex justify-center mt-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => handlePagination(link.url)}
                    disabled={!link.url}
                    className={`px-4 py-2 mx-1 text-sm rounded-md ${
                        link.url
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-300 text-gray-500"
                    }`}
                >
                    {link.label}
                </button>
            ))}
        </div>
    );
}

export default function GestionInscripciones({ inscripciones }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
    const [inscripcionToEdit, setInscripcionToEdit] = useState(null); // Datos de la inscripción a editar

    // Función para abrir el modal con los datos de la inscripción
    const handleEditClick = (inscripcion) => {
        setInscripcionToEdit(inscripcion);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setInscripcionToEdit(null);
    };

    // Función para manejar la actualización de la inscripción
    const handleUpdate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        try {
            const response = await axios.post(
                `/api/inscripciones/${inscripcionToEdit.id}`,
                formData
            );
            // Manejar la respuesta (por ejemplo, actualizar la lista de inscripciones)
            alert("Inscripción actualizada exitosamente");
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar la inscripción");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Inscripciones" />
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Gestión de Inscripciones
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-md font-medium mb-4">
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
                                    {inscripciones.data.map((inscripcion) => (
                                        <tr key={inscripcion.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.turno}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.fechaInscripcion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.estadopago}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.estudiante_nombres}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.ciclo_nombre}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inscripcion.programa_nombre}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(
                                                            inscripcion
                                                        )
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
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

                            {/* Modal de edición */}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-md w-1/2">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Editar Inscripción
                                        </h3>
                                        <form onSubmit={handleUpdate}>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="turno"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Turno
                                                </label>
                                                <input
                                                    id="turno"
                                                    name="turno"
                                                    type="text"
                                                    defaultValue={
                                                        inscripcionToEdit.turno
                                                    }
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
                                                    type="text"
                                                    value={
                                                        inscripcionToEdit.fechaInscripcion
                                                    } // Asignamos el valor de la fecha que no se puede modificar
                                                    className="mt-1 block w-full border p-2 rounded-md bg-gray-100"
                                                    readOnly // Esto hace que el campo no sea editable
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="estadopago"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Estado de Pago
                                                </label>
                                                <input
                                                    id="estadopago"
                                                    name="estadopago"
                                                    type="text"
                                                    defaultValue={
                                                        inscripcionToEdit.estadopago
                                                    }
                                                    className="mt-1 block w-full border p-2 rounded-md"
                                                    required
                                                />
                                            </div>
                                            {/* Agrega los demás campos aquí... */}
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                                                >
                                                    Guardar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
