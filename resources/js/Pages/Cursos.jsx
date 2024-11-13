import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Cursos() {
    const { cursos } = usePage().props;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("cursos.store"), {
            nombre,
            descripcion,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Cursos" />
            
                <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                    Cursos que ofrese el CTB
                </h2>
        
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <div className="grid grid-cols-2 gap-8">

                                <div>
                                    <h3 className="text-md font-medium mb-4">Nombre del Curso</h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre del Curso"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <textarea
                                            id="descripcion"
                                            placeholder="Descripción del Curso"
                                            className="w-full border p-2 rounded-md"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            rows="4"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                        >
                                            Agregar Curso
                                        </button>
                                    </form>
                                </div>

 
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-md font-medium">Listado de Cursos</h3>
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
                                                    Acción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {cursos.map((curso) => (
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {curso.nombre}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button className="text-indigo-600 hover:text-indigo-900">
                                                            Ver Detalles
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
        </AuthenticatedLayout>
    );
}
