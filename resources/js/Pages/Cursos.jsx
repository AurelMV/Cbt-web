import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Cursos() {
    const { cursos } = usePage().props;
    const [idCurso, setIdCurso] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("cursos.store"), {
            nombre,
            descripcion,
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        Inertia.put(route("cursos.update", idCurso), {
            nombre,
            descripcion,
        });
    };

    const handleEdit = (curso) => {
        setIdCurso(curso.id);
        setNombre(curso.nombre);
        setDescripcion(curso.descripcion);
        setIsModalOpen(true);
    };

    const clearForm = () => {
        setIsModalOpen(false);
        setNombre("");
        setDescripcion("");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cursos" />

            <h2 className="text-xl font-semibold leading-tight text-black">
                CURSOS
            </h2>
            <p className="leading-tight text-gray-400">
                Registre nuevos cursos o visualize los cursos que brinda el cbt
            </p>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-md font-medium mb-4 ">
                                    Nombre del Curso
                                </h3>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="nombre"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Nombre del Curso
                                        </label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre del Curso"
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="descripcion"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Descripción
                                        </label>
                                        <textarea
                                            id="descripcion"
                                            placeholder="Descripción del Curso"
                                            className="w-full border p-2 rounded-md"
                                            value={descripcion}
                                            onChange={(e) =>
                                                setDescripcion(e.target.value)
                                            }
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    >
                                        Agregar Curso
                                    </button>
                                </form>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-md font-medium text-blue-900">
                                        Listado de Cursos
                                    </h3>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Buscar curso"
                                            className="border p-2 rounded-md w-full"
                                        />
                                        <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Nombre del Curso
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Descripción
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {cursos.map((curso) => (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                    {curso.nombre}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                    {curso.descripcion}
                                                </td>
                                                <td
                                                    onClick={() => handleEdit(curso)}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-headline"
                                        >
                                            Editar Curso
                                        </h3>
                                        <div>
                                            <form
                                                onSubmit={handleSubmitEdit}
                                                className="space-y-4 mt-4"
                                            >
                                                <input
                                                    type="hidden"
                                                    value={idCurso}
                                                />
                                                <div>
                                                    <label
                                                        htmlFor="nombre"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Nombre del Curso
                                                    </label>
                                                    <input
                                                        id="nombre"
                                                        type="text"
                                                        placeholder="Nombre"
                                                        value={nombre}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setNombre(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="descripcion"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Descripción
                                                    </label>
                                                    <textarea
                                                        id="descripcion"
                                                        placeholder="Descripción del Curso"
                                                        className="w-full border p-2 rounded-md"
                                                        value={descripcion}
                                                        onChange={(e) =>
                                                            setDescripcion(
                                                                e.target.value
                                                            )
                                                        }
                                                        rows="4"
                                                    ></textarea>
                                                </div>
                                                <div className="flex justify-end space-x-3 mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={clearForm}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
