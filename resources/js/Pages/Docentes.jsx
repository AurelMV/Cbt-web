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
    const [idDocente, setIdDocente] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        Inertia.put(route("docentes.update", idDocente), {
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

    const handleEdit = (docente) => {
        setIdDocente(docente.id);
        setNombre(docente.nombre);
        setApellidoPaterno(docente.aPaterno);
        setApellidoMaterno(docente.aMaterno);
        setDni(docente.dni);
        setSexo(docente.sexo);
        setCelular(docente.celular);
        setFechaNacimiento(docente.fechaNacimiento);
        setEmail(docente.email);
        setEstado(docente.estado === "Activo" ? "1" : "0");
        setIsModalOpen(true);
    };

    const clearForm = () => {
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setDni("");
        setSexo("");
        setCelular("");
        setFechaNacimiento("");
        setEmail("");
        setEstado("");
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Docentes" />
            <h2 className="text-xl font-semibold leading-tight text-black">
                DOCENTES
            </h2>
            <p className="leading-tight text-gray-400">
                Registre y administre a sus docentes
            </p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <h3 className="text-md font-medium mb-4 text-blue-900">
                                    Datos del Docente
                                </h3>
                                <form
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-3 gap-3"
                                >
                                    <div>
                                        <label
                                            htmlFor="nombre"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Nombres
                                        </label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombres"
                                            value={nombre}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="apellido_paterno"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Apellido Paterno
                                        </label>
                                        <input
                                            id="apellido_paterno"
                                            type="text"
                                            placeholder="Apellido Paterno"
                                            value={apellido_paterno}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setApellidoPaterno(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="apellido_materno"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Apellido Materno
                                        </label>
                                        <input
                                            id="apellido_materno"
                                            type="text"
                                            placeholder="Apellido Materno"
                                            value={apellido_materno}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setApellidoMaterno(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="dni"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            DNI
                                        </label>
                                        <input
                                            id="dni"
                                            type="text"
                                            placeholder="DNI"
                                            value={dni}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setDni(e.target.value)
                                            }
                                            pattern="[0-9]{8}"
                                            inputMode="numeric"
                                            onInput={(e) =>
                                                (e.target.value =
                                                    e.target.value.slice(0, 8))
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="sexo"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Sexo
                                        </label>
                                        <select
                                            id="sexo"
                                            value={sexo}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setSexo(e.target.value)
                                            }
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
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="celular"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Celular
                                        </label>
                                        <input
                                            id="celular"
                                            type="tel"
                                            placeholder="Número de Celular"
                                            value={celular}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setCelular(e.target.value)
                                            }
                                            pattern="[0-9]{9}"
                                            inputMode="numeric"
                                            onInput={(e) =>
                                                (e.target.value =
                                                    e.target.value.slice(0, 9))
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="fecha_nacimiento"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            id="fecha_nacimiento"
                                            type="date"
                                            placeholder="Fecha de Nacimiento"
                                            value={fecha_nacimiento}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setFechaNacimiento(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Correo Electrónico
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="estado"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            Estado
                                        </label>
                                        <select
                                            id="estado"
                                            value={estado}
                                            onChange={(e) =>
                                                setEstado(e.target.value)
                                            }
                                            className="col-span-1 border p-2 rounded-md w-full"
                                            required
                                        >
                                            <option value="" selected disabled>
                                                Estado
                                            </option>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                    </div>
                                    <div className="space-x-2 grid grid-cols-3 items-center">
                                        <button
                                            type="submit"
                                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-md font-medium mb-4 text-blue-900">
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
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Acciones
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
                                                <td
                                                    onClick={() =>
                                                        handleEdit(docente)
                                                    }
                                                    className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
                                            Editar Docente
                                        </h3>
                                        <div>
                                            <form
                                                onSubmit={handleSubmitEdit}
                                                className="space-y-4 mt-4"
                                            >
                                                <input
                                                    type="hidden"
                                                    value={idDocente}
                                                />
                                                <div>
                                                    <label
                                                        htmlFor="nombre"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Nombres
                                                    </label>
                                                    <input
                                                        id="nombre"
                                                        type="text"
                                                        placeholder="Nombres"
                                                        value={nombre}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setNombre(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="apellido_paterno"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Apellido Paterno
                                                    </label>
                                                    <input
                                                        id="apellido_paterno"
                                                        type="text"
                                                        placeholder="Apellido Paterno"
                                                        value={apellido_paterno}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setApellidoPaterno(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="apellido_materno"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Apellido Materno
                                                    </label>
                                                    <input
                                                        id="apellido_materno"
                                                        type="text"
                                                        placeholder="Apellido Materno"
                                                        value={apellido_materno}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setApellidoMaterno(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="dni"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        DNI
                                                    </label>
                                                    <input
                                                        id="dni"
                                                        type="text"
                                                        placeholder="DNI"
                                                        value={dni}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setDni(
                                                                e.target.value
                                                            )
                                                        }
                                                        pattern="[0-9]{8}"
                                                        inputMode="numeric"
                                                        onInput={(e) =>
                                                            (e.target.value =
                                                                e.target.value.slice(
                                                                    0,
                                                                    8
                                                                ))
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="sexo"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Sexo
                                                    </label>
                                                    <select
                                                        id="sexo"
                                                        value={sexo}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setSexo(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            selected
                                                            disabled
                                                        >
                                                            Sexo
                                                        </option>
                                                        <option value="Masculino">
                                                            Masculino
                                                        </option>
                                                        <option value="Femenino">
                                                            Femenino
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="celular"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Celular
                                                    </label>
                                                    <input
                                                        id="celular"
                                                        type="tel"
                                                        placeholder="Número de Celular"
                                                        value={celular}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setCelular(
                                                                e.target.value
                                                            )
                                                        }
                                                        pattern="[0-9]{9}"
                                                        inputMode="numeric"
                                                        onInput={(e) =>
                                                            (e.target.value =
                                                                e.target.value.slice(
                                                                    0,
                                                                    9
                                                                ))
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="fecha_nacimiento"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Fecha de Nacimiento
                                                    </label>
                                                    <input
                                                        id="fecha_nacimiento"
                                                        type="date"
                                                        placeholder="Fecha de Nacimiento"
                                                        value={fecha_nacimiento}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setFechaNacimiento(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Correo Electrónico
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="estado"
                                                        className="block text-sm font-medium text-gray-800"
                                                    >
                                                        Estado
                                                    </label>
                                                    <select
                                                        id="estado"
                                                        value={estado}
                                                        onChange={(e) =>
                                                            setEstado(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="col-span-1 border p-2 rounded-md w-full"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            selected
                                                            disabled
                                                        >
                                                            Estado
                                                        </option>
                                                        <option value="1">
                                                            Activo
                                                        </option>
                                                        <option value="0">
                                                            Inactivo
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-end space-x-3 mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={clearForm}
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
