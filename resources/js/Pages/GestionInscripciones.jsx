import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react"; // Para trabajar con props y navegación
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";

export default function GestionInscripciones({
    queryParams: propsQueryParams = null,
}) {
    const { inscripciones, queryParams: inertiaQueryParams } = usePage().props;

    // Combina los queryParams de props con los de Inertia
    const queryParams = propsQueryParams || inertiaQueryParams;

    // Estado para manejar los parámetros de la búsqueda
    const [queryParamsState, setQueryParams] = useState(
        () => queryParams || {}
    );

    const [ciclos, setCiclos] = useState([]);
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedGrupo, setSelectedGrupo] = useState("");
    const [grupos, setGrupos] = useState([]);
    const [formData, setFormData] = useState({
        p_Ciclo_id: "",
        p_Grupos_id: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [editingInscripcion, setEditingInscripcion] = useState(null);
    const [opciones, setOpciones] = useState({ ciclos: [], programas: [] });
    const [gruposFiltrados, setGruposFiltrados] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [cicloSeleccionado, setCicloSeleccionado] = useState("");

    const handleInputChange = (name, value, isKeyPress = false) => {
        if (isKeyPress && value.trim() === "") return;

        const updatedQueryParams = {
            ...queryParamsState, // Asegúrate de usar el estado actual, no `queryParams` directamente
            [name]: value || undefined,
        };

        // Actualiza solo los parámetros que han cambiado, sin afectar los valores de los select
        setQueryParams(updatedQueryParams);

        // Enviar los parámetros al backend solo si es necesario
        router.get(route("gestInscripcion.index"), updatedQueryParams);
    };

    useEffect(() => {
        if (showModal) {
            fetch("/api/inscripcionesopciones")
                .then((res) => res.json())
                .then((data) => setOpciones(data));
        }
        axios
            .get("/api/ciclos")
            .then((response) => {
                setCiclos(response.data); // Guardar los ciclos y sus grupos
            })
            .catch((error) => {
                console.error("Error al cargar los ciclos y grupos:", error);
            });
        const listadoservice = async () => {
            try {
                const data = await Listado.indexDepa();
                setlistados(data);
            } catch (error) {
                setError("Error al obtener los datos: " + error.message);
            }
        };

        listadoservice();
    }, [showModal]);

    const handleEditClick = (inscripcion) => {
        setEditingInscripcion(inscripcion);
        const ciclo = opciones.ciclos.find((c) => c.id === inscripcion.idciclo);
        setGruposFiltrados(ciclo ? ciclo.grupos : []);
        setShowModal(true);
    };

    const handleCicloChange = (e) => {
        const cicloId = e.target.value;
        setSelectedCiclo(cicloId);
        const selectedValue = e.target.value;

        // Filtrar grupos relacionados con el ciclo seleccionado
        const ciclo = ciclos.find((c) => c.id === parseInt(cicloId));
        if (ciclo) {
            setGrupos(ciclo.grupos);
        } else {
            setGrupos([]); // Si no hay grupos, vaciar el array
        }
    };

    const handleSave = () => {
        // Usamos PUT en lugar de POST para la actualización
        Inertia.put(`/inscripciones/${editingInscripcion.id}`, {
            idciclo: editingInscripcion.idciclo,
            idprogramaestudios: editingInscripcion.idprogramaestudios,
            idGrupos: editingInscripcion.idGrupos,
        });
        setShowModal(false); // Cierra el modal después de guardar
    };

    // Filtra las inscripciones según el nombre o DNI
    const filteredInscripciones = inscripciones.data.filter((inscripcion) => {
        const fullName =
            `${inscripcion.estudiante.aPaterno} ${inscripcion.estudiante.aMaterno}`.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return (
            fullName.includes(searchTermLower) ||
            inscripcion.estudiante.dni.includes(searchTermLower)
        );
    });
    const handleClearFilters = () => {
        // Limpiar los valores de los select y otros filtros
        setQueryParams({});
        // Recargar la página sin filtros
        router.get(route("gestInscripcion.index"));
    };



    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Gestión de Inscripciones
                </h2>

                {/* Zona de búsqueda */}
                <div className="mb-4">
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
                    <select
                        name="p_cicloinscripciones_id"
                        value={queryParamsState.p_cicloinscripciones_id}
                        onBlur={(e) =>
                            handleInputChange(
                                "p_cicloinscripciones_id",
                                e.target.value
                            )
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleInputChange(
                                "p_cicloinscripciones_id",
                                e.target.value,
                                true
                            )
                        }
                        onChange={(e) => {
                            handleInputChange(
                                "p_cicloinscripciones_id",
                                e.target.value
                            );
                        }}
                    >
                        <option value="">Seleccione un ciclo</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id} value={ciclo.id}>
                                {ciclo.nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        name="p_cicloinscripciones_id"
                        defaultValue={queryParamsState.p_cicloinscripciones_id}
                        onChange={handleCicloChange}
                    >
                        <option value="">Seleccione un ciclo</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id} value={ciclo.id}>
                                {ciclo.nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        name="p_Grupos_id"
                        defaultValue={queryParamsState.p_Grupos_id}
                        onBlur={(e) =>
                            handleInputChange("p_Grupos_id", e.target.value)
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleInputChange(
                                "p_Grupos_id",
                                e.target.value,
                                true
                            )
                        }
                        onChange={(e) =>
                            handleInputChange("p_Grupos_id", e.target.value)
                        }
                    >
                        <option value="">Seleccione un grupo</option>
                        {grupos.map((grupo) => (
                            <option key={grupo.id} value={grupo.id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                    <button
                    onClick={handleClearFilters}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Limpiar Filtros
                </button>
                </div>

                <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Turno</th>
                            <th className="py-3 px-6 text-left">Nombres</th>
                            <th className="py-3 px-6 text-left">Apellidos</th>
                            <th className="py-3 px-6 text-left">Ciclo</th>
                            <th className="py-3 px-6 text-left">Programa</th>
                            <th className="py-3 px-6 text-left">Grupo</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {filteredInscripciones.map((inscripcion) => (
                            <tr
                                key={inscripcion.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6">
                                    {inscripcion.turno}
                                </td>
                                <td className="py-3 px-6">
                                    {inscripcion.estudiante.nombres}
                                </td>
                                <td className="py-3 px-6">
                                    {`${inscripcion.estudiante.aPaterno} ${inscripcion.estudiante.aMaterno}`}
                                </td>

                                <td className="py-3 px-6">
                                    {inscripcion.ciclo.nombre}
                                </td>
                                <td className="py-3 px-6">
                                    {
                                        inscripcion.programa_estudio
                                            .nombre_programa
                                    }
                                </td>
                                <td className="py-3 px-6">
                                    {inscripcion.grupo.nombre}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() =>
                                            handleEditClick(inscripcion)
                                        }
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
                        Página {inscripciones.current_page} de{" "}
                        {inscripciones.last_page}
                    </p>

                    <nav
                        className="inline-flex shadow-sm rounded-md"
                        aria-label="Pagination"
                    >
                        {/* Paginación Anterior */}
                        {inscripciones.prev_page_url && (
                            <Link
                                href={inscripciones.prev_page_url}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            ></Link>
                        )}

                        {/* Páginas */}
                        {inscripciones.links &&
                            inscripciones.links.map((link, index) => (
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
                        {inscripciones.next_page_url && (
                            <Link
                                href={inscripciones.next_page_url}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            ></Link>
                        )}
                    </nav>
                </div>

                {/* Modal */}
                {showModal && editingInscripcion && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">
                                Editar Inscripción
                            </h3>
                            <form>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Ciclo:
                                </label>
                                <select
                                    value={editingInscripcion.idciclo}
                                    onChange={(e) =>
                                        handleCicloChange(e.target.value)
                                    }
                                    className="w-full mb-4 px-3 py-2 border rounded"
                                >
                                    {opciones.ciclos.map((ciclo) => (
                                        <option key={ciclo.id} value={ciclo.id}>
                                            {ciclo.nombre}
                                        </option>
                                    ))}
                                </select>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Programa:
                                </label>
                                <select
                                    value={
                                        editingInscripcion.idprogramaestudios
                                    }
                                    onChange={(e) =>
                                        setEditingInscripcion((prev) => ({
                                            ...prev,
                                            idprogramaestudios: e.target.value,
                                        }))
                                    }
                                    className="w-full mb-4 px-3 py-2 border rounded"
                                >
                                    {opciones.programas.map((programa) => (
                                        <option
                                            key={programa.id}
                                            value={programa.id}
                                        >
                                            {programa.nombre_programa}
                                        </option>
                                    ))}
                                </select>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Grupo:
                                </label>
                                <select
                                    value={editingInscripcion.idGrupos}
                                    onChange={(e) =>
                                        setEditingInscripcion((prev) => ({
                                            ...prev,
                                            idGrupos: e.target.value,
                                        }))
                                    }
                                    className="w-full mb-4 px-3 py-2 border rounded"
                                >
                                    {gruposFiltrados.map((grupo) => (
                                        <option key={grupo.id} value={grupo.id}>
                                            {grupo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <div className="mt-4 flex justify-end space-x-3">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
