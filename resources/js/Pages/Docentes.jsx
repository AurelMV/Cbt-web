import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Docentes() {
    const { docentes } = usePage().props;
    const [nombre, setNombre] = useState("");
    const [apellido_paterno, setApellidoPaterno] = useState("");
    const [apellido_materno, setApellidoMaterno] = useState("");
    const [dni, setDni] = useState("");
    const [sexo, setSexo] = useState("");
    const [celular, setCelular] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [email, setEmail] = useState("");
    const [estado, setEstado] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("docentes.store"), {
            nombre,
            aPaterno: apellido_paterno,
            aMaterno: apellido_materno,
            dni,
            sexo,
            celular,
            fechaNacimiento: fecha_nacimiento,
            email,
            estado,
        });  
    };

    return (
        <AuthenticatedLayout>
            <Head title="Docentes" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Docentes
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <h3 className="text-md font-medium mb-4">
                                    Datos del Docente
                                </h3>
                                <form
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-3 gap-3"
                                >
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={nombre}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido Paterno"
                                        value={apellido_paterno}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setApellidoPaterno(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apellido Materno"
                                        value={apellido_materno}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setApellidoMaterno(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="DNI"
                                        value={dni}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setDni(e.target.value)}
                                        pattern="[0-9]{8}"
                                        inputMode="numeric"
                                        onInput={(e) => e.target.value = e.target.value.slice(0, 8)}
                                        required
                                    />
                                    <select
                                        value={sexo}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setSexo(e.target.value)}
                                        required
                                    >
                                        <option value="" selected disabled>
                                            Sexo
                                        </option>
                                        <option value="Masculino">
                                            Masculino
                                        </option>
                                        <option value="Femenino">
                                            Femenino
                                        </option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Número de Celular"
                                        value={celular}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setCelular(e.target.value)}
                                        pattern="[0-9]{9}"
                                        inputMode="numeric"
                                        onInput={(e) => e.target.value = e.target.value.slice(0, 9)}
                                        required
                                    />
                                    <input
                                        type="date"
                                        placeholder="Fecha de Nacimiento"
                                        value={fecha_nacimiento}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setFechaNacimiento(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        className="col-span-1 border p-2 rounded-md"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <select
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        className="col-span-1 border p-2 rounded-md"
                                        required
                                    >
                                        <option value="" selected disabled>
                                            Estado
                                        </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                    <div className="space-x-2 grid grid-cols-3 items-center">
                                        <button
                                            type="submit"
                                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-medium mb-4">
                                    Listado de Docentes
                                </h3>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Apellido Paterno
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Apellido Materno
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                DNI
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Sexo
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Celular
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Fecha de Nacimiento
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Estado
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {docentes.map((docente) => (
                                            <tr>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.nombre}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.aPaterno}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.aMaterno}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.dni}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.sexo}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.celular}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.fechaNacimiento}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.email}
                                                </td>
                                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {docente.estado}
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
