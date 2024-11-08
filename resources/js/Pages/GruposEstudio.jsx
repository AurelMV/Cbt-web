import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function GruposEstudio() {
    const [aforo, setAforo] = useState(0);
    const [nombreGrupo, setNombreGrupo] = useState('');
    const [estadoGrupo, setEstadoGrupo] = useState('');
    const [ciclo, setCiclo] = useState('');

    const incrementarAforo = () => setAforo(aforo + 1);
    const limpiarFormulario = () => {
        setNombreGrupo('');
        setAforo(0);
        setEstadoGrupo('');
        setCiclo('');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Grupos de Estudio" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Grupos de Estudio
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-md font-medium mb-4">Datos del Grupo de Estudio</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre del Grupo"
                                        value={nombreGrupo}
                                        onChange={(e) => setNombreGrupo(e.target.value)}
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={aforo}
                                            readOnly
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={incrementarAforo}
                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                        >
                                            Aumentar Aforo
                                        </button>
                                    </div>
                                    <select
                                        value={estadoGrupo}
                                        onChange={(e) => setEstadoGrupo(e.target.value)}
                                        className="w-full border p-2 rounded-md"
                                        required
                                    >
                                        <option value="">Estado del Grupo</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Ciclo al que pertenece"
                                        value={ciclo}
                                        onChange={(e) => setCiclo(e.target.value)}
                                        className="w-full border p-2 rounded-md"
                                        required
                                    />
                                    <div className="space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
                                        >
                                            Agregar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={limpiarFormulario}
                                            className="inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-500"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-medium mb-4">Grupos de Estudio Registrados</h3>
                                <div className="flex items-center space-x-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Buscar grupo"
                                        className="w-full border p-2 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                    >
                                        Buscar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-500"
                                    >
                                        Recargar
                                    </button>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 border mb-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Nombre del Grupo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Aforo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Ciclo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Grupo 1
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                25
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Activo
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                2024-A
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
                                    >
                                        Estudiantes Registrados
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                                    >
                                        Estudiantes Deudores Registrados
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
