import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Docentes() {
    return (
        <AuthenticatedLayout>
            <Head title="Docentes" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Docentes
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <h3 className="text-md font-medium mb-4">Datos del Docente</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido Paterno"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido Materno"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="DNI"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <select
                                        className="w-full border p-2 rounded-md"
                                        required
                                    >
                                        <option value="">Sexo</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                    <input
                                        type="date"
                                        placeholder="Fecha de Nacimiento"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <select
                                        className="w-full border p-2 rounded-md"
                                        required
                                    >
                                        <option value="">Estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                    <div className="space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-medium mb-4">Listado de Docentes</h3>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Apellido Paterno
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Apellido Materno
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                DNI
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Sexo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Fecha de Nacimiento
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Estado
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Juan
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Pérez
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                García
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                12345678
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Masculino
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                01-01-1980
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                juan.perez@example.com
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Activo
                                            </td>
                                        </tr>
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
