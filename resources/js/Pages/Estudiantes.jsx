import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react"; // Solo importa una vez
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";

export default function Estudiantes({ queryParams: propsQueryParams = null, }) {

    const { estudiantes, queryParams: inertiaQueryParams } = usePage().props;
    const queryParams = propsQueryParams || inertiaQueryParams;
    const [queryParamsState, setQueryParams] = useState(
        () => queryParams || {}
    );
    const [filterText, setFilterText] = useState("");
  
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);

    const handleInputChange = (name, value, isKeyPress = false) => {
        if (isKeyPress && value.trim() === "") return;

        const updatedQueryParams = {
            ...queryParams,
            [name]: value || undefined,
        };
        setQueryParams(updatedQueryParams);

        router.get(route("estudiantes.index"), updatedQueryParams);
    };

    // Función para mostrar el modal y cargar los datos del estudiante
    const handleEditClick = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setModalVisible(true);
    };

    // Función para manejar el cambio de datos en el formulario
    const handleChange = (e) => {
        setSelectedEstudiante({
            ...selectedEstudiante,
            [e.target.name]: e.target.value,
        });
    };

    const closeModal = () => {
        Inertia.reload();
    };

    // Función para enviar el formulario de actualización
    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.put(
            `/estudiantes/${selectedEstudiante.id}`,
            selectedEstudiante,
            {
                onSuccess: () => {
                    setModalVisible(false); // Cerrar el modal después de actualizar
                    // Si deseas actualizar la lista sin recargar la página, puedes usar:
                    // Inertia.visit('/ruta-de-los-estudiantes', { method: 'get' });
                    // o redirigir al listado
                    Inertia.visit("/estudiantes.index"); // Redirige a la página de estudiantes
                },
                onError: () => {
                    console.error("Error al actualizar el estudiante");
                },
            }
        );
    };

    const filteredEstudiantes = Array.isArray(estudiantes.data) ? estudiantes.data.filter(
        (estudiante) =>
            estudiante.nombres
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
            estudiante.Nrodocumento.toLowerCase().includes(
                filterText.toLowerCase()
            )
    ) : [];
    

    

    return (
        <AuthenticatedLayout>
            <div>
                <h2 className="text-xl font-semibold text-black">
                    GESTION DE ESTUDIANTES
                </h2>
                <p className="leading-tight text-gray-400">
                    Administra a los estudiantes que se han inscrito
                </p>
                <div>
                    {/*tmr x q no hay los otros div xd....aqui dentro tenia que ir con sus propiedades pex */}
                    <TextInput
                        placeholder="Nombre del estudiante"
                        defaultValue={queryParamsState.name}
                        onBlur={(e) =>
                            handleInputChange("name", e.target.value)
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleInputChange("name", e.target.value, true)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Nro de Documento"
                        defaultValue={queryParamsState.documento}
                        onBlur={(e) =>
                            handleInputChange("documento", e.target.value)
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleInputChange("documento", e.target.value, true)
                        }
                    />

                    <TextInput
                        placeholder="Email o correo"
                        defaultValue={queryParamsState.Email}
                        onBlur={(e) =>
                            handleInputChange("Email", e.target.value)
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleInputChange("Email", e.target.value, true)
                        }
                    />
                </div>
                {/* Tabla de estudiantes */}

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Apellido Paterno
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Apellido Materno
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Sexo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Tipo de Documento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Nro de Documentro
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                telefono de estudiante
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                telefono de apoderado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                fecha de nacimiento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                direccion
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                foto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                Acción
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {estudiantes.data.map((estudiante) => (
                            <tr key={estudiante.id}>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.nombres}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.aPaterno}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.aMaterno}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.sexo}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.tipodocumento}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.Nrodocumento}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.celularestudiante}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.celularapoderado}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.fechaNacimiento}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.direccion}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {estudiante.foto}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <button
                                        onClick={() =>
                                            handleEditClick(estudiante)
                                        }
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                    <p className="text-sm text-gray-500">
                        Página {estudiantes.current_page} de{" "}
                        {estudiantes.last_page}
                    </p>

                    <nav
                        className="inline-flex shadow-sm rounded-md"
                        aria-label="Pagination"
                    >
                        {/* Paginación Anterior */}
                        {estudiantes.prev_page_url && (
                            <Link
                                href={estudiantes.prev_page_url}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            ></Link>
                        )}

                        {/* Páginas */}
                        {estudiantes.links &&
                            estudiantes.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                                        link.active
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    } ${
                                        !link.url
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    {link.label
                                        .replace("&laquo;", "«")
                                        .replace("&raquo;", "»")}
                                </Link>
                            ))}

                        {/* Paginación Siguiente */}
                        {estudiantes.next_page_url && (
                            <Link
                                href={estudiantes.next_page_url}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            ></Link>
                        )}
                    </nav>
                </div>

                {/* Modal para editar estudiante */}
                {modalVisible && selectedEstudiante && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                            <h3 className="text-xl mb-4">Editar Estudiante</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="nombres"
                                    value={selectedEstudiante.nombres}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="aPaterno"
                                    value={selectedEstudiante.aPaterno}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="aMaterno"
                                    value={selectedEstudiante.aMaterno}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <select
                                    name="sexo"
                                    value={selectedEstudiante.sexo}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                >
                                    <option value="">Selecciona el sexo</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                                <input
                                    type="text"
                                    name="Nrodocumento"
                                    value={selectedEstudiante.Nrodocumento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="celularestudiante"
                                    value={selectedEstudiante.celularestudiante}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="celularapoderado"
                                    value={selectedEstudiante.celularapoderado}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={selectedEstudiante.fechaNacimiento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedEstudiante.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="anoculminado"
                                    value={selectedEstudiante.anoculminado}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="hidden"
                                    name="idcolegios"
                                    value={selectedEstudiante.idcolegios}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <select
                                    name="tipodocumento"
                                    value={selectedEstudiante.tipodocumento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={selectedEstudiante.direccion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <button
                                    href={route("estudiantes.index")}
                                    type="submit"
                                    className="w-full inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500"
                                >
                                    Modificar Estudiante
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
