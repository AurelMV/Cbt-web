import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function DocentesCursosGrupos() {
    const { docentesActivos, grupos, docenteCursos, cursos } = usePage().props;
    const [curso, setCurso] = useState("");
    const [grupo, setGrupo] = useState("");
    const [docente, setDocente] = useState("");
    const [idDocente, setIdDocente] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [relacionId, setRelacionId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(curso, grupo, docente, idDocente);
        Inertia.post(route("docenteCursos.store"), {
            idCurso: curso,
            idGrupo: grupo,
            idDocente,
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(curso, grupo, docente, idDocente, relacionId);
        Inertia.put(route("docenteCursos.update", relacionId), {
            idCurso: curso,
            idGrupo: grupo,
            idDocente,
        });
    };

    const handleEdit = (relacion) => {
        setRelacionId(relacion.id);
        setCurso(relacion.idCurso);
        setGrupo(relacion.idGrupo);
        setDocente(relacion.docente);
        setIdDocente(relacion.idDocente);
        setIsModalOpen(true);
    };

    const limpiarFormulario = () => {
        setIsModalOpen(false);
        setCurso("");
        setGrupo("");
        setDocente("");
        setIdDocente("");
    };

    const seleccionarDocente = (docente) => {
        setDocente(docente.nombre_completo);
        setIdDocente(docente.id);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Docentes Cursos Grupos" />

            <h2 className=" text-xl font-semibold leading-tight text-black">
                DOCENTES - CURSOS - GRUPOS
            </h2>
            <p className="leading-tight text-gray-400">
                Registre a un docente en los cursos que dictará y al grupo al
                que pertenecerá
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
                                        Docente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {docentesActivos.map((docente) => (
                                    <tr key={docente.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {docente.nombre_completo}
                                        </td>
                                        <td
                                            onClick={() =>
                                                seleccionarDocente(docente)
                                            }
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    value={idDocente}
                                    onChange={(e) =>
                                        setIdDocente(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="docente"
                                    value={docente}
                                    onChange={(e) => setDocente(e.target.value)}
                                    placeholder="Nombre Completo del Docente"
                                    className="border p-2 rounded-md w-full"
                                    required
                                    disabled
                                />
                            </div>
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
                                        Docente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Curso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Grupo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {docenteCursos.map((relacion) => (
                                    <tr key={relacion.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            {relacion.docente}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.curso}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {relacion.grupo}
                                        </td>
                                        <td
                                            onClick={() => handleEdit(relacion)}
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
                                            Editar Relación de Docente - Curso -
                                            Grupo
                                        </h3>
                                        <h3 className="text-md font-medium mb-4 text-blue-900">
                                            Lista de Docentes Activos
                                        </h3>
                                        <table className="min-w-full divide-y divide-gray-200 border mb-6">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Docente
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Acción
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {docentesActivos.map(
                                                    (docente) => (
                                                        <tr key={docente.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {
                                                                    docente.nombre_completo
                                                                }
                                                            </td>
                                                            <td
                                                                onClick={() =>
                                                                    seleccionarDocente(
                                                                        docente
                                                                    )
                                                                }
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                            >
                                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                                    Seleccionar
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        <div>
                                            <form
                                                onSubmit={handleSubmitEdit}
                                                className="space-y-4 mt-4"
                                            >
                                                <div>
                                                    <label
                                                        htmlFor="curso"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Nombre del Curso
                                                    </label>
                                                    <select
                                                        id="curso"
                                                        value={curso}
                                                        onChange={(e) =>
                                                            setCurso(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Selecciona un Curso
                                                        </option>
                                                        {cursos.map((curso) => (
                                                            <option
                                                                key={curso.id}
                                                                value={curso.id}
                                                            >
                                                                {curso.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="grupo"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Nombre del Grupo
                                                    </label>
                                                    <select
                                                        id="grupo"
                                                        value={grupo}
                                                        onChange={(e) =>
                                                            setGrupo(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Selecciona un Grupo
                                                        </option>
                                                        {grupos.map((grupo) => (
                                                            <option
                                                                key={grupo.id}
                                                                value={grupo.id}
                                                            >
                                                                {grupo.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <input
                                                        type="hidden"
                                                        value={idDocente}
                                                        onChange={(e) =>
                                                            setIdDocente(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        type="hidden"
                                                        value={relacionId}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="docente"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Nombre Completo del
                                                        Docente
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="docente"
                                                        value={docente}
                                                        onChange={(e) =>
                                                            setDocente(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Nombre Completo del Docente"
                                                        className="border p-2 rounded-md w-full"
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-3 mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            limpiarFormulario
                                                        }
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
