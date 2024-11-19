import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function GruposEstudio() {
    const { ciclos, grupos, estudiantes, estudiantesDeudores } =
        usePage().props;
    const [aforo, setAforo] = useState(0);
    const [idGrupo, setIdGrupo] = useState("");
    const [id_grupo, setId_Grupo] = useState("");
    const [nombre, setNombreGrupo] = useState("");
    const [estado, setEstadoGrupo] = useState("");
    const [ciclo, setCiclo] = useState("");
    const [showButtons, setShowButtons] = useState(false);
    const [showEstudiantes, setShowEstudiantes] = useState(false);
    const [showDeudores, setShowDeudores] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const incrementarAforo = () => setAforo(aforo + 1);
    const reducirAforo = () => setAforo((prev) => (prev > 0 ? prev - 1 : 0));
    const limpiarFormulario = () => {
        setNombreGrupo("");
        setAforo(0);
        setEstadoGrupo("");
        setCiclo("");
        setIsModalOpen(false);
    };

    const filterByGrupo = (grupoId) => {
        Inertia.get(route("grupos.index"), { grupo_id: grupoId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("grupos.store"), {
            nombre,
            aforo,
            estado,
            idciclo: ciclo,
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(idGrupo, nombre, aforo, estado, ciclo);
        Inertia.put(route("grupos.update", idGrupo), {
            nombre,
            aforo,
            estado,
            idciclo: ciclo,
        });
    };

    const handleEdit = (grupo) => {
        setIsModalOpen(true);
        setIdGrupo(grupo.id);
        setNombreGrupo(grupo.nombre);
        setAforo(grupo.aforo);
        setEstadoGrupo(grupo.estado);
        setCiclo(grupo.idciclo);
    };

    const showButtonsView = (grupo) => {
        setShowButtons(true);
        setId_Grupo(grupo.id);
    };

    const viewEstudiantes = () => {
        Inertia.get(route("grupos.index"), { grupo_id: id_grupo });
        setShowEstudiantes(true);
        setShowDeudores(false);
    }

    const viewDeudores = () => {
        Inertia.get(route("grupos.index"), { grupo_id: id_grupo });
        setShowDeudores(true);
        setShowEstudiantes(false);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Grupos de Estudio" />

            <h2 className="text-xl font-semibold leading-tight text-black">
                GRUPO DE ESTUDIO
            </h2>
            <p className="leading-tight text-gray-400 ">
                Registre grupos de estudio{" "}
            </p>
            <input type="hidden" value={id_grupo} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-md font-medium mb-4 text-blue-900">
                                    Datos del Grupo de Estudio
                                </h3>
                                <form
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label htmlFor="nombre">
                                            Nombre del Grupo
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombreGrupo(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="aforo">Aforo</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                id="aforo"
                                                value={aforo}
                                                onChange={(e) =>
                                                    setAforo(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-20 border p-2 text-center rounded-md"
                                                min="0"
                                            />
                                            <button
                                                type="button"
                                                onClick={incrementarAforo}
                                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                            >
                                                Aumentar Aforo
                                            </button>
                                            <button
                                                type="button"
                                                onClick={reducirAforo}
                                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                            >
                                                Reducir Aforo
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="estado">Estado</label>
                                        <select
                                            id="estado"
                                            value={estado}
                                            onChange={(e) =>
                                                setEstadoGrupo(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        >
                                            <option value="" disabled>
                                                Estado del Grupo
                                            </option>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="ciclo">Ciclo</label>
                                        <select
                                            id="ciclo"
                                            value={ciclo}
                                            onChange={(e) =>
                                                setCiclo(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        >
                                            <option value="" disabled>
                                                Seleccione Ciclo
                                            </option>
                                            {ciclos.map((ciclo) => (
                                                <option
                                                    key={ciclo.id}
                                                    value={ciclo.id}
                                                >
                                                    {ciclo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
                                        >
                                            Guardar Grupo
                                        </button>
                                        <button
                                            type="button"
                                            onClick={limpiarFormulario}
                                            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                                        >
                                            Limpiar Formulario
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-medium mb-4 text-blue-900">
                                    Grupos de Estudio Registrados
                                </h3>
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
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {grupos.map((grupo) => (
                                            <tr key={grupo.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {grupo.nombre}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {grupo.aforo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {grupo.estadonombre}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {grupo.ciclo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(grupo)
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900 pr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            showButtonsView(
                                                                grupo
                                                            )
                                                        }
                                                        className="text-green-600 hover:text-green-900 pl-2"
                                                    >
                                                        Detalles
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {showButtons && (
                        <div className="flex space-x-4 py-5">
                            <button
                                onClick={() => viewEstudiantes()}
                                type="button"
                                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
                            >
                                Estudiantes Registrados
                            </button>
                            <button
                                onClick={() => viewDeudores()}
                                type="button"
                                className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                            >
                                Estudiantes Deudores Registrados
                            </button>
                        </div>
                    )}

                    {showEstudiantes && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                            <table className="min-w-full divide-y divide-gray-200 border mb-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Nombre Completo del Estudiante
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Estado de Pago
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {estudiantes.map((estudiante) => (
                                        <tr key={estudiante.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {estudiante.nombre_completo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {estudiante.estadopago}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showDeudores && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                            <table className="min-w-full divide-y divide-gray-200 border mb-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Nombre Completo del Estudiante
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Estado de Pago
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {estudiantesDeudores.map((estudiante) => (
                                        <tr key={estudiante.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {estudiante.nombre_completo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {estudiante.estadopago}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
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
                                                    value={idGrupo}
                                                />
                                                <div>
                                                    <label htmlFor="nombre">
                                                        Nombre del Grupo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="nombre"
                                                        value={nombre}
                                                        onChange={(e) =>
                                                            setNombreGrupo(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="aforo">
                                                        Aforo
                                                    </label>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="number"
                                                            id="aforo"
                                                            value={aforo}
                                                            onChange={(e) =>
                                                                setAforo(
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-20 border p-2 text-center rounded-md"
                                                            min="0"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                incrementarAforo
                                                            }
                                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                                        >
                                                            Aumentar Aforo
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                reducirAforo
                                                            }
                                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                                                        >
                                                            Reducir Aforo
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="estado">
                                                        Estado
                                                    </label>
                                                    <select
                                                        id="estado"
                                                        value={estado}
                                                        onChange={(e) =>
                                                            setEstadoGrupo(
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
                                                            Estado del Grupo
                                                        </option>
                                                        <option value="1">
                                                            Activo
                                                        </option>
                                                        <option value="0">
                                                            Inactivo
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="ciclo">
                                                        Ciclo
                                                    </label>
                                                    <select
                                                        id="ciclo"
                                                        value={ciclo}
                                                        onChange={(e) =>
                                                            setCiclo(
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
                                                            Seleccione Ciclo
                                                        </option>
                                                        {ciclos.map((ciclo) => (
                                                            <option
                                                                key={ciclo.id}
                                                                value={ciclo.id}
                                                            >
                                                                {ciclo.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
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
