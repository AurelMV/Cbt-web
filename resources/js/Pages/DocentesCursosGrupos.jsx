import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function DocentesCursosGrupos() {
    const { docentesActivos, grupos, docenteCursos, cursos } = usePage().props;
    const [curso, setCurso] = useState("");
    const [grupo, setGrupo] = useState("");
    const [docente, setDocente] = useState("");

    const limpiarFormulario = () => {
        setCurso("");
        setGrupo("");
        setDocente("");
    };

    const seleccionarDocente = (docente) => {
        setDocente(docente.nombre_completo);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Docentes Cursos Grupos" />

            <h2 className=" text-xl font-semibold leading-tight text-black">
                DOCENTES - CURSOS - GRUPOS
            </h2>
            <p className="leading-tight text-gray-400">
                Registre a un docente a los cursos que dictara y al grupo al que
                pertenecera
            </p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                        {/* Tabla de Docentes Activos */}
                        <h3 className="text-md font-medium mb-4 text-blue-900">
                            Lista de Docentes Activos
                        </h3>
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
                                        Acción
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
                                            {docente.nombre_completo}
                                        </td>
                                        <td onClick={() => seleccionarDocente(docente)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-indigo-600 hover:text-indigo-900">
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3 className="text-md font-medium mb-4 text-blue-900">
                            Registro y Relación de Curso, Grupo y Docente
                        </h3>
                        <form className="space-y-4">
                            <select
                                id="curso"
                                value={curso}
                                onChange={(e) => setCurso(e.target.value)}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="" disabled>
                                    Selecciona un Curso
                                </option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>
                                        {curso.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="grupo"
                                value={grupo}
                                onChange={(e) => setGrupo(e.target.value)}
                                className="w-full border p-2 rounded-md"
                                required
                            >
                                <option value="" disabled>
                                    Selecciona un Grupo
                                </option>
                                {grupos.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>
                                        {grupo.nombre}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                id="docente"
                                value={docente}
                                onChange={(e) => setDocente(e.target.value)}
                                placeholder="Nombre Completo del Docente"
                                className="border p-2 rounded-md w-full"
                                disabled
                            />
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
                        <h3 className="text-md font-medium mt-8 mb-4 text-blue-900">
                            Relación de Docentes, Cursos y Grupos
                        </h3>
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
                                {docenteCursos.map((relacion) => (
                                    <tr key={relacion.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {relacion.idDocente}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.idCurso}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.idGrupo}
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
