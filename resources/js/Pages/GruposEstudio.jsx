import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function GruposEstudio() {
    const { ciclos, grupos } = usePage().props;
    const [aforo, setAforo] = useState(0);
    const [nombre, setNombreGrupo] = useState("");
    const [estado, setEstadoGrupo] = useState("");
    const [idciclo, setCiclo] = useState("");

    const incrementarAforo = () => setAforo(aforo + 1);
    const reducirAforo = () => setAforo((prev) => (prev > 0 ? prev - 1 : 0));
    const limpiarFormulario = () => {
        setNombreGrupo("");
        setAforo(40);
        setEstadoGrupo("");
        setCiclo("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("grupos.store"), {
            nombre,
            aforo,
            estado,
            idciclo,
        });
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
                                <h3 className="text-md font-medium mb-4">
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
                                    <div >
                                        <label htmlFor="aforo">Aforo</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                id="aforo"
                                                value={aforo}
                                                onChange={(e) => setAforo(Number(e.target.value))}
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
                                            value={estado}
                                            onChange={(e) =>
                                                setEstadoGrupo(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        >
                                            <option value="" disabled selected>
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
                                            value={idciclo}
                                            onChange={(e) =>
                                                setCiclo(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md"
                                            required
                                        >
                                            <option value="" disabled selected>
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
                                <h3 className="text-md font-medium mb-4">
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
                                                Nombre del Grupo:
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Aforo:
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Estado:
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Ciclo:
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
                                                    {grupo.estado}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {grupo.ciclo}
                                                </td>
                                            </tr>
                                        ))}
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
