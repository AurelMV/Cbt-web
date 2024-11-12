import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function DocentesCursosGrupos() {
    const [curso, setCurso] = useState('');
    const [grupo, setGrupo] = useState('');
    const [docente, setDocente] = useState('');

    const limpiarFormulario = () => {
        setCurso('');
        setGrupo('');
        setDocente('');
    };

    // Datos de ejemplo para los docentes activos (esto debería venir de una fuente de datos real)
    const docentesActivos = [
        { id: 1, nombre: 'Docente A', estado: 'Activo' },
        { id: 2, nombre: 'Docente B', estado: 'Activo' },
    ];
    // Datos de ejemplo para cursos
    const cursos = [
        { id: 1, nombre: 'Matemáticas' },
        { id: 2, nombre: 'Historia' },
        { id: 3, nombre: 'Ciencia' },
    ];

    // Datos de ejemplo para grupos
    const grupos = [
        { id: 1, nombre: 'Grupo 1' },
        { id: 2, nombre: 'Grupo 2' },
        { id: 3, nombre: 'Grupo 3' },
    ];
    

    // Datos de ejemplo para la tabla de relaciones (esto debería venir de una fuente de datos real)
    const relacionesDocenteCursoGrupo = [
        { id: 1, docente: 'Docente A', curso: 'Matemáticas', grupo: 'Grupo 1' },
        { id: 2, docente: 'Docente B', curso: 'Historia', grupo: 'Grupo 2' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Docentes Cursos Grupos" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Docentes - Cursos - Grupos
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        {/* Tabla de Docentes Activos */}
                        <h3 className="text-md font-medium mb-4">Lista de Docentes Activos</h3>
                        <table className="min-w-full divide-y divide-gray-200 border mb-6">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Nombre del Docente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {docentesActivos.map((docente) => (
                                    <tr key={docente.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {docente.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {docente.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {docente.estado}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Formulario de Registro de Curso, Grupo, Docente */}
                        <h3 className="text-md font-medium mb-4">Registro de Curso, Grupo y Docente</h3>
                        <form className="space-y-4">
                        <select
                                value={curso}
                                onChange={(e) => setCurso(e.target.value)}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="">Selecciona un Curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.nombre}>
                                        {curso.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={grupo}
                                onChange={(e) => setGrupo(e.target.value)}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="">Selecciona un Grupo</option>
                                {grupos.map((grupo) => (
                                    <option key={grupo.id} value={grupo.nombre}>
                                        {grupo.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={docente}
                                onChange={(e) => setDocente(e.target.value)}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="">Selecciona un Docente</option>
                                {docentesActivos.map((docente) => (
                                    <option key={docente.id} value={docente.nombre}>
                                        {docente.nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="space-x-2">
                                <button
                                    type="button"
                                    onClick={limpiarFormulario}
                                    className="inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-500"
                                >
                                    Limpiar
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>

                        {/* Tabla de Relaciones Docente - Curso - Grupo */}
                        <h3 className="text-md font-medium mt-8 mb-4">Relación de Docentes, Cursos y Grupos</h3>
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Docente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Curso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Grupo
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {relacionesDocenteCursoGrupo.map((relacion) => (
                                    <tr key={relacion.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {relacion.docente}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.curso}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.grupo}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
