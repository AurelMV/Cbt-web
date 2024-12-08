import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react"; // Solo importa una vez
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";

export default function Estudiantes({ queryParams: propsQueryParams = null }) {
    const { estudiantes, queryParams: inertiaQueryParams } = usePage().props;
    const queryParams = propsQueryParams || inertiaQueryParams;
    const [queryParamsState, setQueryParams] = useState(
        () => queryParams || {}
    );
    const [filterText, setFilterText] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
const [alertType, setAlertType] = useState(""); // 'success' o 'error'


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
        setModalVisible(false); // Cierra el modal
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
                    setAlertMessage("Estudiante actualizado con éxito.");
                    setAlertType("success");
                    setModalVisible(false);
                    router.get(route("estudiantes.index"));
                },
                
                onError: () => {
                    setAlertMessage("Ocurrió un error al actualizar el estudiante.");
                    setAlertType("error");
                },
            }
        );
    };
   

    const filteredEstudiantes = Array.isArray(estudiantes.data)
        ? estudiantes.data.filter(
              (estudiante) =>
                  estudiante.nombres
                      .toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                  estudiante.Nrodocumento.toLowerCase().includes(
                      filterText.toLowerCase()
                  )
          )
        : [];

    return (
        <AuthenticatedLayout>
            <div>
            {alertMessage && (
    <div
        className={`p-4 mb-4 rounded-md text-white font-semibold ${
            alertType === "success"
                ? "bg-green-500 border-l-4 border-green-700"
                : "bg-red-500 border-l-4 border-red-700"
        }`}
    >
        {alertMessage}
    </div>
)}



            </div>
            <div>
                <h2 className="text-xl font-semibold text-black">
                    GESTION DE ESTUDIANTES
                </h2>
                <p className="leading-tight text-gray-400">
                    Administra a los estudiantes que se han inscrito
                </p>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="mb-8 p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-semibold mb-4 text-blue-900">
                                        Filtros
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb6">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="idcolegio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Nombre del estudiante
                                            </label>
                                            <TextInput
                                                placeholder="Nombre del estudiante"
                                                defaultValue={
                                                    queryParamsState.name
                                                }
                                                onBlur={(e) =>
                                                    handleInputChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleInputChange(
                                                        "name",
                                                        e.target.value,
                                                        true
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="idcolegio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Número de documento
                                            </label>
                                            <input
                                                type="text" // Cambiar a "text" para un control más granular sobre la entrada
                                                className="w-52 border p-2 rounded-md"
                                                placeholder="Nro de Documento"
                                                defaultValue={
                                                    queryParamsState.documento
                                                }
                                                onBlur={(e) =>
                                                    handleInputChange(
                                                        "documento",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleInputChange(
                                                            "documento",
                                                            e.target.value,
                                                            true
                                                        );
                                                    }
                                                }}
                                                onInput={(e) => {
                                                    let value = e.target.value;

                                                    // Eliminar caracteres no numéricos y signos negativos
                                                    value = value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );

                                                    // Limitar a 8 caracteres
                                                    if (value.length > 8) {
                                                        value = value.slice(
                                                            0,
                                                            8
                                                        );
                                                    }

                                                    e.target.value = value; // Actualizar el valor en el campo de entrada
                                                }}
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            <label
                                                htmlFor="idcolegio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Correo Electronico
                                            </label>
                                            <TextInput
                                                placeholder="Email o correo"
                                                defaultValue={
                                                    queryParamsState.Email
                                                }
                                                onBlur={(e) =>
                                                    handleInputChange(
                                                        "Email",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleInputChange(
                                                        "Email",
                                                        e.target.value,
                                                        true
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Tabla de estudiantes */}
                                    <div className="mt-4">
                                        <h3 className="text-md font-semibold mb-4 text-blue-900">
                                            Lista de estudiantes
                                        </h3>
                                    </div>
                                    <div className="table-container overflow-x-auto">
                                        <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow mt-4 table-fixed">
                                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                                                {estudiantes.data.map(
                                                    (estudiante) => (
                                                        <tr key={estudiante.id}>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.nombres
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.aPaterno
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.aMaterno
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.sexo
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.tipodocumento
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.Nrodocumento
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.celularestudiante
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.celularapoderado
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.fechaNacimiento
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.direccion
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.email
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    estudiante.foto
                                                                }
                                                            </td>

                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditClick(
                                                                            estudiante
                                                                        )
                                                                    }
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Editar
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
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
                                                    href={
                                                        estudiantes.prev_page_url
                                                    }
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                ></Link>
                                            )}

                                            {/* Páginas */}
                                            {estudiantes.links &&
                                                estudiantes.links.map(
                                                    (link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={
                                                                link.url || "#"
                                                            }
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
                                                                .replace(
                                                                    "&laquo;",
                                                                    "«"
                                                                )
                                                                .replace(
                                                                    "&raquo;",
                                                                    "»"
                                                                )}
                                                        </Link>
                                                    )
                                                )}

                                            {/* Paginación Siguiente */}
                                            {estudiantes.next_page_url && (
                                                <Link
                                                    href={
                                                        estudiantes.next_page_url
                                                    }
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                ></Link>
                                            )}
                                        </nav>
                                    </div>

                                    {/* Modal para editar estudiante */}
                                    {modalVisible && selectedEstudiante && (
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                                            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                                                <h3 className="text-xl mb-4">
                                                    Editar Estudiante
                                                </h3>
                                                <form onSubmit={handleSubmit}>
                                                    <label
                                                        htmlFor="nombres"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Nombres
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="nombres"
                                                        name="nombres"
                                                        value={
                                                            selectedEstudiante.nombres
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="aPaterno"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Apellido Paterno
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="aPaterno"
                                                        name="aPaterno"
                                                        value={
                                                            selectedEstudiante.aPaterno
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="aMaterno"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Apellido Materno
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="aMaterno"
                                                        name="aMaterno"
                                                        value={
                                                            selectedEstudiante.aMaterno
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="sexo"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Sexo
                                                    </label>
                                                    <select
                                                        id="sexo"
                                                        name="sexo"
                                                        value={
                                                            selectedEstudiante.sexo
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    >
                                                        <option value="">
                                                            Selecciona el sexo
                                                        </option>
                                                        <option value="M">
                                                            Masculino
                                                        </option>
                                                        <option value="F">
                                                            Femenino
                                                        </option>
                                                    </select>

                                                    <label
                                                        htmlFor="Nrodocumento"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Número de Documento
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="Nrodocumento"
                                                        name="Nrodocumento"
                                                        value={
                                                            selectedEstudiante.Nrodocumento
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="celularestudiante"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Celular del Estudiante
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="celularestudiante"
                                                        name="celularestudiante"
                                                        value={
                                                            selectedEstudiante.celularestudiante
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="celularapoderado"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Celular del Apoderado
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="celularapoderado"
                                                        name="celularapoderado"
                                                        value={
                                                            selectedEstudiante.celularapoderado
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="fechaNacimiento"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Fecha de Nacimiento
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        value={
                                                            selectedEstudiante.fechaNacimiento
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Correo Electrónico
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={
                                                            selectedEstudiante.email
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <label
                                                        htmlFor="anoculminado"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Año Culminado
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="anoculminado"
                                                        name="anoculminado"
                                                        value={
                                                            selectedEstudiante.anoculminado
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <input
                                                        type="hidden"
                                                        name="idcolegios"
                                                        value={
                                                            selectedEstudiante.idcolegios
                                                        }
                                                    />

                                                    <label
                                                        htmlFor="tipodocumento"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Tipo de Documento
                                                    </label>
                                                    <select
                                                        id="tipodocumento"
                                                        name="tipodocumento"
                                                        value={
                                                            selectedEstudiante.tipodocumento
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    >
                                                        <option value="DNI">
                                                            DNI
                                                        </option>
                                                        <option value="PASAPORTE">
                                                            PASAPORTE
                                                        </option>
                                                    </select>

                                                    <label
                                                        htmlFor="direccion"
                                                        className="block mb-1 font-semibold"
                                                    >
                                                        Dirección
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="direccion"
                                                        name="direccion"
                                                        value={
                                                            selectedEstudiante.direccion
                                                        }
                                                        onChange={handleChange}
                                                        className="w-full border p-2 rounded-md mb-4"
                                                        required
                                                    />

                                                    <div className="flex justify-between">
                                                    <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-white font-semibold hover:bg-gray-500 mt-4"
                >
                    Cancelar
                </button>
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500"
                                                        >
                                                            Modificar Estudiante
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
