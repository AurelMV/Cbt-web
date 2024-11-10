import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProgramasEstudio() {
    return (
        <AuthenticatedLayout>
            <Head title="Progrmas de Estudio" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Programas de Estudios del CBT
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <h3 className="text-md font-medium mb-4">registro de Nuevos Programas de Estudios</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre del progrma"
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    
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
                                <h3 className="text-md font-medium mb-4">Listado de los Programas de Estudios Resgistrados </h3>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Nombre del progrma de estudio
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Enfermeria Tecnica
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
