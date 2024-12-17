import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ColegioServicio from "@/Components/ColegioServicio";
import Listado from "@/Components/DepartamentoServicio";
import ListaInscripcionesTemp from "@/Components/ListInscripcionsTemp";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

export default function Dashboard() {
    const [userId, setUserId] = useState("");
    const [ciclos, setCiclos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedGrupo, setSelectedGrupo] = useState("");

    const { inscripcionesTemporales, inscripcionPendiente } = usePage().props;
    console.log(inscripcionPendiente);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const today = new Date();

        const max = new Date(
            today.getFullYear() - 15,
            today.getMonth(),
            today.getDate()
        );
        const min = new Date(
            today.getFullYear() - 50,
            today.getMonth(),
            today.getDate()
        );

        setMaxDate(max.toISOString().split("T")[0]);
        setMinDate(min.toISOString().split("T")[0]);
    }, []);

    const [programas, setProgramas] = useState([]);
    const [programaSeleccionado, setProgramaSeleccionado] = useState("");

    const [inputValue, setInputValue] = useState("");
    const [distritos, setdistritos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [departamentos, setlistados] = useState([]);
    const [Cole, setCole] = useState([]);
    const [colegi, setcolegi] = useState({
        nombre: "",
    });
    const [error, setError] = useState(null);
    const [MensajeError, setMensajeError] = useState("");

    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Cole.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Cole.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [Seleeccion, setSeleeccion] = useState({
        Depar: "",
        Provin: "",
        Distri: "",
    });
    const [mapRef, setMapRef] = useState(null);

    const [ColegioDAta, setColegioDAta] = useState({
        nombrecolegio: "",
        codModular: "",
        modalidad: "",
        gestion: "",
        latitud: null, // Guardar latitud
        longitud: null, // Guardar longitud
        Distrito_idDistrito: "",
    });
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = () => setModalOpen2(true);
    const closeModal2 = () => setModalOpen2(false);

    const [modalInscripcionsTemp, setModalInscripcionsTemp] = useState(false);

    const [formData, setFormData] = useState({
        p_nombres: "",
        p_tipodocumento: "",
        p_nroDocumento: "",
        p_sexo: "",
        p_aPaterno: "",
        p_email: "",
        p_celularestudiante: "",
        p_fechaNacimiento: "",
        p_aMaterno: "",
        p_celularapoderado: "",

        p_direccion: "",
        p_Colegios_id: "",
        p_fechaPago: "",
        p_monto: "",
        p_medioPago: "",
        p_nroVoucher: "",
        p_turno: "",
        p_cicloinscripciones_id: "",
        p_fechaInscripcion: "",
        p_Usuarios_id: "",
        p_anoculminado: "",

        p_estadopago: "",
        p_Grupos_id: "",
        p_Programaestudios_id: "",
        archivo: null,
    });

    useEffect(() => {
        if (inscripcionPendiente) {
            setFormData({
                p_nombres: inscripcionPendiente.nombres,
                p_aPaterno: inscripcionPendiente.aPaterno,
                p_aMaterno: inscripcionPendiente.aMaterno,
                p_sexo: inscripcionPendiente.sexo,
                p_tipodocumento: inscripcionPendiente.tipodocumento,
                p_nroDocumento: inscripcionPendiente.nroDocumento,
                p_email: inscripcionPendiente.email,
                p_celularestudiante: inscripcionPendiente.celularestudiante,
                p_fechaNacimiento: inscripcionPendiente.fechaNacimiento,
                p_celularapoderado: inscripcionPendiente.celularapoderado,
                p_direccion: inscripcionPendiente.direccion,
                p_Colegios_id: inscripcionPendiente.idcolegio,
                p_fechaPago: inscripcionPendiente.fecha,
                p_monto: inscripcionPendiente.monto,
                p_medioPago: inscripcionPendiente.medioPago,
                p_nroVoucher: inscripcionPendiente.nroVoucher,
                p_cicloinscripciones_id: inscripcionPendiente.idciclo,
                p_anoculminado: inscripcionPendiente.anoculminado,
                p_estadopago: inscripcionPendiente.estado,
                p_Programaestudios_id: inscripcionPendiente.idprogramaestudios,
                archivo: null,
            })
        }
    }, [inscripcionPendiente]);

    const handleModalInscripcionsTemp = () => {
        setModalInscripcionsTemp(true);
    };
  
    const resetForm = () => {
        setFormData({
            p_nombres: '',
            p_tipodocumento: '',
            p_nroDocumento: '',
            p_sexo: '',
            p_aPaterno: '',
            p_aMaterno: '',
            p_email: '',
            p_celularestudiante: '',
            p_celularapoderado: '',
            p_direccion: '',
            p_fechaNacimiento: '',
            p_anoculminado: '',
            p_Colegios_id: '',
            
            p_fechaPago: "",
            p_monto: "",
            p_medioPago: "",
            p_nroVoucher: "",
            p_turno: "",
            p_fechaInscripcion: "",
            p_estadopago: "",
            p_cicloinscripciones_id: "",
            p_Grupos_id: "",
            p_Programaestudios_id: "",
            p_fotoComprobante: null,
        });
    };
    
    const handleChangeDAtaColegio = (e) => {
        const { name, value } = e.target;
        setColegioDAta((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await ColegioServicio.store(ColegioDAta);
            console.log("Colegio guardado con éxito:", response);
            alert("¡Colegio seleccionado con éxito!");
            closeModal2();
            // Aquí puedes hacer alguna acción adicional como cerrar el modal o limpiar los campos
        } catch (error) {
            console.error("Error al guardar el colegio:", error);
            alert("Error al guardar el colegio. Verifique los datos.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "p_celularestudiante") {
            const isValid = /^\d{0,9}$/.test(value);
            if (!isValid) return;
        }
        if (name === "p_celularapoderado") {
            const isValid = /^\d{0,9}$/.test(value);
            if (!isValid) return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [digitLimit, setDigitLimit] = useState(8);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === "p_tipodocumento") {
            const limit = value === "DNI" ? 8 : 12;

            setDigitLimit(limit);
            setFormData((prevData) => ({
                ...prevData,
                p_nroDocumento: "",
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;

        if (name === "p_nroDocumento") {
            const isValid = new RegExp(`^\\d{0,${digitLimit}}$`).test(value);
            if (!isValid) return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/api/registrar-inscripcion-pago", formData)
            .then((response) => {
                alert("Inscripción realizada con éxito!");
                resetForm();
            })
            .catch((error) => {
                if (error.response) {
                    // Muestra detalles adicionales si el servidor respondió con un error
                    console.error(
                        "Error en la respuesta:",
                        error.response.data
                    );
                    console.error("Código de estado:", error.response.status);
                    console.error("Encabezados:", error.response.headers);

                    alert(
                        `Error al realizar la inscripción: ${
                            error.response.data.message ||
                            "Revise los datos ingresados."
                        }`
                    );
                } else if (error.request) {
                    // La solicitud fue hecha, pero no se recibió respuesta
                    console.error(
                        "No se recibió respuesta del servidor:",
                        error.request
                    );
                    alert(
                        "Error al conectar con el servidor. Por favor, intente más tarde."
                    );
                } else {
                    // Otro error ocurrió durante la configuración de la solicitud
                    console.error(
                        "Error al configurar la solicitud:",
                        error.message
                    );
                    alert("Ocurrió un error inesperado.");
                }
            });
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setCole([]);
        setInputValue(value);

        if (value.trim() === "") {
            setCole([]);
            return;
        }

        try {
            const resultadosBusqueda = await Listado.BusquedaCodModular(value);
            setCole(resultadosBusqueda.slice(0, 20)); // Limitar a los primeros 5 resultados
            console.log(resultadosBusqueda);
        } catch (error) {
            console.error("Error al buscar los colegios:", error);
        }
    };

    const handleDepartamentoChange = async (event) => {
        const idDepartamento = event.target.value;
        setSeleeccion((prev) => ({
            ...prev,
            Depar: event.target.options[event.target.selectedIndex].text, // Obtener el nombre
            Provin: "", // Limpiar provincia al cambiar departamento
            Distri: "", // Limpiar distrito al cambiar departamento
        }));
        try {
            const data = await Listado.ConsultaProvi(idDepartamento);
            setProvincias(data);
        } catch (error) {
            console.error("Error al cargar provincias:", error);
        }
    };

    const handleProvinciaChange = async (event) => {
        const idProvincia = event.target.value;
        setSeleeccion((prev) => ({
            ...prev,
            Provin: event.target.options[event.target.selectedIndex].text, // Obtener el nombre
            Distri: "", // Limpiar distrito al cambiar provincia
        }));
        try {
            const data = await Listado.ConsultaDistri(idProvincia);
            setdistritos(data);
        } catch (error) {
            console.error("Error al cargar provincias:", error);
        }
    };
    const handleColegioChange = async (event) => {
        const idDistrito = event.target.value;
        setCole([]);
        setSeleeccion((prev) => ({
            ...prev,
            ...prev,
            Distri: event.target.options[event.target.selectedIndex].text,
        }));
        try {
            const data = await Listado.ConsultaColegio(idDistrito);
            setCole(data);
            setMensajeError("");
        } catch (error) {
            setCole([]);
        }
    };

    //filtrador de ciclos y grupos
    const handleCicloChange = (e) => {
        const cicloId = e.target.value;
        setSelectedCiclo(cicloId);

        // Filtrar grupos relacionados con el ciclo seleccionado
        const ciclo = ciclos.find((c) => c.id === parseInt(cicloId));
        if (ciclo) {
            setGrupos(ciclo.grupos);
        } else {
            setGrupos([]); // Si no hay grupos, vaciar el array
        }
    };

    const handleBothChanges = (e) => {
        handleChange(e); // Actualiza el estado general del formulario
        handleCicloChange(e); // Realiza lógica específica para ciclos
    };

    useEffect(() => {
        const fechaActual = new Date().toISOString().split("T")[0];
        setFormData((prev) => ({
            ...prev,
            p_fechaInscripcion: fechaActual,
        }));
        axios
            .get("users/show")
            .then((response) => {
                const user = response.data;
                const userIdWithName = `${user.id}`;
                setUserId(userIdWithName);
                setFormData((prevData) => ({
                    ...prevData,
                    p_Usuarios_id: userIdWithName,
                }));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });

        axios
            .get("/api/programas")
            .then((response) => {
                setProgramas(response.data); // Actualiza el estado con los datos
            })
            .catch((error) => {
                console.error("Error al cargar los programas:", error);
            });

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
    }, []);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    const ClickableMap = ({ setCoordinates }) => {
        // Manejar el clic en el mapa para actualizar las coordenadas
        const handleMapClick = (e) => {
            const { lat, lng } = e.latlng;
            setCoordinates((prevData) => ({
                ...prevData,
                latitud: lat,
                longitud: lng,
            }));
        };

        useMapEvents({
            click: handleMapClick, // Actualizar marcador al hacer clic
        });

        return null;
    };
    const handleSelectColegio = (id, nombrecolegio) => {
        setFormData((prevData) => ({
            ...prevData,
            p_Colegios_id: id,
        }));
        setcolegi(() => ({ nombre: nombrecolegio }));
        alert("¡Colegio seleccionado con éxito!");
    };
    const handleSearch = () => {
        const query =
            `${Seleeccion.Depar}, ${Seleeccion.Provin}, ${Seleeccion.Distri}`.trim();
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
        )}&countrycodes=pe`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setColegioDAta((prevData) => ({
                        ...prevData,
                        latitud: parseFloat(lat),
                        longitud: parseFloat(lon),
                    }));
                    if (mapRef) {
                        mapRef.setView([parseFloat(lat), parseFloat(lon)], 15);
                    }
                } else {
                    alert("No se encontró la ubicación.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Hubo un problema al realizar la búsqueda.");
            });
    };

    const DateOfBirthInput = () => {
        const [minDate, setMinDate] = useState("");
        const [maxDate, setMaxDate] = useState("");

        useEffect(() => {
            const today = new Date();

            const max = new Date(
                today.getFullYear() - 15,
                today.getMonth(),
                today.getDate()
            );
            const min = new Date(
                today.getFullYear() - 50,
                today.getMonth(),
                today.getDate()
            );

            setMaxDate(max.toISOString().split("T")[0]);
            setMinDate(min.toISOString().split("T")[0]);
        }, []);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        INSCRIPCIONES
                    </h2>
                    <p className="leading-tight text-gray-400">
                        Realize inscripciones de nuevos estudiantes y adjunte un
                        pago
                    </p>
                </div>
                <div>
                    <button onClick={handleModalInscripcionsTemp}>
                        <a className="rounded-md border border-transparent bg-green-500 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                            Inscripciones Pendientes
                        </a>
                    </button>
                </div>
            </div>

            {modalInscripcionsTemp && (<ListaInscripcionesTemp inscripcionesTemporales={inscripcionesTemporales} />)}

            <form onSubmit={handleSubmit}>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="mb-8 p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-semibold mb-4 text-blue-900">
                                        Ingrese Datos del Estudiante
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb6">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="nombre"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                name="p_nombres"
                                                onChange={handleChange}
                                                value={formData.p_nombres}
                                                placeholder="Nombre"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="tpoDocumento"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Tipo de Documento
                                            </label>
                                            <select
                                                id="tpoDocumento"
                                                onChange={handleSelectChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_tipodocumento" // Asegúrate de que el nombre sea exactamente "p_tipodocumento"
                                                value={
                                                    formData.p_tipodocumento ||
                                                    ""
                                                } // Evita que quede sin valor
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Seleccione tipo
                                                </option>
                                                <option value="DNI">DNI</option>
                                                <option value="Pasaporte">
                                                    Pasaporte
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="dni"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Nro de Documento
                                            </label>
                                            <input
                                                //dato que se envia
                                                id="dni"
                                                onChange={handleInputChange2}
                                                name="p_nroDocumento"
                                                value={formData.p_nroDocumento}
                                                type="text"
                                                placeholder="Nro de Documento"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="sexo"
                                                className="block text-sm font-medium text-gray-800 "
                                            >
                                                Sexo
                                            </label>

                                            <select
                                                id="sexo"
                                                name="p_sexo"
                                                onChange={handleChange}
                                                value={formData.p_sexo}
                                                className="border p-2 rounded-md mb-4 w-48"
                                                required
                                            >
                                                <option value="">
                                                    Seleccione sexo
                                                </option>
                                                <option value="M">
                                                    Masculino
                                                </option>
                                                <option value="F">
                                                    Femenino
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="APaterno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Apellido Paterno
                                            </label>
                                            <input
                                                id="APaterno"
                                                type="text"
                                                name="p_aPaterno"
                                                onChange={handleChange}
                                                value={formData.p_aPaterno}
                                                placeholder="Apellido Paterno"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Email"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Correo Electronico
                                            </label>
                                            <input
                                                id="Email"
                                                type="email"
                                                name="p_email"
                                                onChange={handleChange}
                                                value={formData.p_email}
                                                placeholder="Email"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Telefono"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                id="Telefono"
                                                type="text"
                                                name="p_celularestudiante"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_celularestudiante
                                                }
                                                placeholder="Teléfono"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="TApoderado"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Teléfono Apoderado
                                            </label>
                                            <input
                                                id="TApoderado"
                                                type="text"
                                                name="p_celularapoderado"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_celularapoderado
                                                }
                                                placeholder="Teléfono de Apoderado"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="AMaterno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Apellido Materno
                                            </label>
                                            <input
                                                id="AMaterno"
                                                type="text"
                                                name="p_aMaterno"
                                                onChange={handleChange}
                                                value={formData.p_aMaterno}
                                                placeholder="Apellido Materno"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="direccion"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Direccion
                                            </label>
                                            <input
                                                id="direccion"
                                                type="text"
                                                name="p_direccion"
                                                onChange={handleChange}
                                                value={formData.p_direccion}
                                                placeholder="Dirección"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Fnacimiento"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de Nacimiento
                                            </label>
                                            <input
                                                id="Fnacimiento"
                                                type="date"
                                                min={minDate}
                                                max={maxDate}
                                                name="p_fechaNacimiento"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_fechaNacimiento
                                                }
                                                placeholder="Fecha de Nacimiento"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="anoculminado"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Ultimo año cursado de Colegio
                                            </label>
                                            <input
                                                id="anoculminado"
                                                type="text"
                                                name="p_anoculminado"
                                                onChange={handleChange}
                                                value={formData.p_anoculminado}
                                                placeholder="Ultimo año cursado"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <button
                                                onClick={openModal}
                                                className="col-span-1 bg-blue-500 text-white p-2 rounded-md mt-5"
                                            >
                                                Seleccionar Colegio
                                            </button>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="idcolegio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Colegio Seleccionado
                                            </label>
                                            <input
                                                id="idcolegio"
                                                type="text"
                                                name="p_Colegios_id"
                                                onChange={handleChange}
                                                value={colegi.nombre}
                                                placeholder="Colegio"
                                                className="col-span-1 border p-2 rounded-md "
                                                required
                                                readOnlyc
                                            />
                                        </div>
                                        <div>
                                            {/*<label
                                                htmlFor="idusuario"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                id Usuario
                                            </label>*/}

                                            <input
                                                id="idusuario"
                                                type="text"
                                                name="p_Usuarios_id"
                                                onChange={handleChange}
                                                value={formData.p_Usuarios_id}
                                                placeholder="idusuario"
                                                className="col-span-1 border p-2 rounded-md hidden"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {modalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-8 rounded-lg shadow-lg flex w-full max-w-7xl">
                                            <div className="w-2/5 pl-6 border-r">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Seleccione Ubicación y
                                                    Colegio
                                                </h3>
                                                <div className="space-y-4">
                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleDepartamentoChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Departamento
                                                        </option>
                                                        {departamentos.map(
                                                            (depa) => (
                                                                <option
                                                                    key={
                                                                        depa.id
                                                                    }
                                                                    value={
                                                                        depa.id
                                                                    }
                                                                >
                                                                    {
                                                                        depa.nombredepartamento
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleProvinciaChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Provincia
                                                        </option>
                                                        {provincias.map(
                                                            (lista) => (
                                                                <option
                                                                    key={
                                                                        lista.id
                                                                    }
                                                                    value={
                                                                        lista.id
                                                                    }
                                                                >
                                                                    {
                                                                        lista.nombreprovincia
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleColegioChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Distrito
                                                        </option>
                                                        {distritos.map(
                                                            (lista) => (
                                                                <option
                                                                    key={
                                                                        lista.id
                                                                    }
                                                                    value={
                                                                        lista.id
                                                                    }
                                                                >
                                                                    {
                                                                        lista.nombredistrito
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <div className="w-11/12 mx-auto">
                                                        <input
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            placeholder="Buscar colegios..."
                                                            className="w-11/12 mx-auto border p-2 rounded-md"
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={openModal2}
                                                        className="w-11/12 mx-auto bg-indigo-600 text-white p-2 rounded-md mt-2"
                                                    >
                                                        Agregar Colegio
                                                    </button>
                                                </div>

                                                <div className="flex justify-end mt-4 space-x-2">
                                                    <button
                                                        onClick={closeModal}
                                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="w-3/5 pr-6 overflow-x-auto">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Colegios Seleccionados
                                                </h3>
                                                <table className="min-w-full border">
                                                    <thead>
                                                        <tr className="bg-gray-200">
                                                            <th className="border px-4 py-2">
                                                                Seleccion
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Nombre
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Codigo Modular
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Modalidad
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Gestion
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems.length >
                                                            0 &&
                                                            currentItems.map(
                                                                (
                                                                    resultado,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="border px-4 py-2">
                                                                            <button
                                                                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-1 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleSelectColegio(
                                                                                        resultado.id,
                                                                                        resultado.nombrecolegio
                                                                                    )
                                                                                }
                                                                            >
                                                                                Seleccionar
                                                                            </button>
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.nombrecolegio
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.codModular
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.modalidad
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.gestion
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>

                                                <div className="flex justify-center mt-4">
                                                    {pageNumbers.map(
                                                        (number) => (
                                                            <button
                                                                key={number}
                                                                onClick={() =>
                                                                    paginate(
                                                                        number
                                                                    )
                                                                }
                                                                className={`px-1.5 py-0.95 mx-1 rounded-md ${
                                                                    number ===
                                                                    currentPage
                                                                        ? "bg-blue-500 text-white"
                                                                        : "bg-gray-300"
                                                                }`}
                                                            >
                                                                {number}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalOpen2 && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full max-w-6xl overflow-hidden">
                                            <div className="flex w-full">
                                                <div className="w-1/2 pr-4 border-r">
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Agregar Colegio
                                                    </h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label>
                                                                Nombre del
                                                                Colegio
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="w-full border p-2 rounded-md"
                                                                name="nombrecolegio"
                                                                value={
                                                                    ColegioDAta.nombrecolegio
                                                                }
                                                                onChange={
                                                                    handleChangeDAtaColegio
                                                                }
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className="col-span-1">
                                                                <label>
                                                                    codModular
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                    name="codModular"
                                                                    value={
                                                                        ColegioDAta.codModular
                                                                    }
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    Modalidad
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                    name="modalidad"
                                                                    value={
                                                                        ColegioDAta.modalidad
                                                                    }
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    Gestión
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                    name="gestion"
                                                                    value={
                                                                        ColegioDAta.gestion
                                                                    }
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    Latitud
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                    name="latitud"
                                                                    value={
                                                                        ColegioDAta.latitud
                                                                            ? ColegioDAta.latitud.toFixed(
                                                                                  6
                                                                              )
                                                                            : "-"
                                                                    }
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <label>
                                                                    Longitud
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                    name="longitud"
                                                                    value={
                                                                        ColegioDAta.longitud
                                                                            ? ColegioDAta.longitud.toFixed(
                                                                                  6
                                                                              )
                                                                            : "-"
                                                                    }
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <label>
                                                                    Distrito
                                                                </label>
                                                                <select
                                                                    name="Distrito_idDistrito" // Asegúrate de que coincida con la propiedad del estado
                                                                    className="w-full border p-2 rounded-md"
                                                                    value={
                                                                        ColegioDAta.Distrito_idDistrito
                                                                    } // Valor actual del estado
                                                                    onChange={
                                                                        handleChangeDAtaColegio
                                                                    } // Manejador de cambio
                                                                >
                                                                    <option
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        Seleccione
                                                                        un
                                                                        distrito
                                                                    </option>
                                                                    {distritos.map(
                                                                        (
                                                                            lista
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    lista.id
                                                                                }
                                                                                value={
                                                                                    lista.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    lista.nombredistrito
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mt-4 space-x-2">
                                                        <button
                                                            onClick={
                                                                closeModal2
                                                            }
                                                            className="px-4 py-2 bg-gray-300 rounded-md"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleSave}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                        >
                                                            Guardar
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-1/2 pl-4 overflow-x-auto">
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Seleccione la Ubicación
                                                    </h3>
                                                    <div
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <h3>
                                                            Selección de
                                                            Coordenadas
                                                        </h3>
                                                        <div>
                                                            <p>
                                                                <strong>
                                                                    Departamento:
                                                                </strong>{" "}
                                                                {Seleeccion.Depar ||
                                                                    "No seleccionado"}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Provincia:
                                                                </strong>{" "}
                                                                {Seleeccion.Provin ||
                                                                    "No seleccionado"}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Distrito:
                                                                </strong>{" "}
                                                                {Seleeccion.Distri ||
                                                                    "No seleccionado"}
                                                            </p>
                                                        </div>
                                                        <button
                                                            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                            onClick={
                                                                handleSearch
                                                            }
                                                        >
                                                            Buscar
                                                        </button>
                                                    </div>
                                                    <div
                                                        id="map"
                                                        style={{
                                                            height: "300px",
                                                            width: "400px",
                                                            margin: "20px auto",
                                                            border: "1px solid #ccc",
                                                        }}
                                                    >
                                                        <MapContainer
                                                            center={
                                                                ColegioDAta.latitud &&
                                                                ColegioDAta.longitud
                                                                    ? [
                                                                          ColegioDAta.latitud,
                                                                          ColegioDAta.longitud,
                                                                      ]
                                                                    : [
                                                                          -10.4074729,
                                                                          -75.3347043,
                                                                      ]
                                                            }
                                                            zoom={
                                                                ColegioDAta.latitud &&
                                                                ColegioDAta.longitud
                                                                    ? 15
                                                                    : 6
                                                            }
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                            }}
                                                            whenCreated={
                                                                setMapRef
                                                            }
                                                        >
                                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                            <ClickableMap
                                                                setCoordinates={
                                                                    setColegioDAta
                                                                }
                                                            />
                                                            {ColegioDAta.latitud &&
                                                                ColegioDAta.longitud && (
                                                                    <Marker
                                                                        position={[
                                                                            ColegioDAta.latitud,
                                                                            ColegioDAta.longitud,
                                                                        ]}
                                                                        draggable={
                                                                            true
                                                                        }
                                                                        eventHandlers={{
                                                                            dragend:
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    const {
                                                                                        lat,
                                                                                        lng,
                                                                                    } =
                                                                                        e.target.getLatLng();
                                                                                    setColegioDAta(
                                                                                        (
                                                                                            prevData
                                                                                        ) => ({
                                                                                            ...prevData,
                                                                                            latitud:
                                                                                                lat,
                                                                                            longitud:
                                                                                                lng,
                                                                                        })
                                                                                    );
                                                                                },
                                                                        }}
                                                                    />
                                                                )}
                                                        </MapContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8 p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-medium mb-4 text-blue-900">
                                        Datos de Pago
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="fpago"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de pago
                                            </label>
                                            <input
                                                id="fpago"
                                                type="date"
                                                name="p_fechaPago"
                                                onChange={handleChange}
                                                value={formData.p_fechaPago}
                                                placeholder="Fecha de Pago"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Monto"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Monto de Pago
                                            </label>
                                            <input
                                                id="Monto"
                                                type="number"
                                                name="p_monto"
                                                onChange={handleChange}
                                                value={formData.p_monto}
                                                placeholder="Monto de Pago"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="medio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Medio de pago
                                            </label>

                                            <select
                                                id="medio"
                                                name="p_medioPago"
                                                value={formData.p_medioPago}
                                                onChange={handleChange}
                                                className="w-48 border p-2 rounded-md mb-4"
                                                required
                                            >
                                                <option value="" disabled>
                                                    Seleccione medio
                                                </option>

                                                <option value="CAJA">
                                                    CAJA
                                                </option>
                                                <option value="DEPOSITO">
                                                    DEPOSITO
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="NVaucher"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Numero de Voucher o Deposito
                                            </label>
                                            <input
                                                id="NVaucher"
                                                type="text"
                                                name="p_nroVoucher"
                                                onChange={handleChange}
                                                value={formData.p_nroVoucher}
                                                placeholder="Número de Voucher"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                                maxLength="10" // No permite más de 10 caracteres
                                                minLength="10" // Exige al menos 10 caracteres
                                                onBlur={(e) => {
                                                    if (
                                                        e.target.value
                                                            .length !== 10
                                                    ) {
                                                        alert(
                                                            "El número de documento debe tener exactamente 10 dígitos"
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-medium mb-4 text-blue-900">
                                        Datos de Inscripción
                                    </h3>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="turno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Turno
                                            </label>
                                            <select
                                                id="turno"
                                                onChange={handleChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_turno"
                                                value={formData.p_turno}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Seleccione Turno
                                                </option>
                                                <option value="mañana">
                                                    Mañana
                                                </option>
                                                <option value="tarde">
                                                    Tarde
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="finscripcion"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de Inscripción
                                            </label>
                                            <input
                                                id="Finscripcion"
                                                type="date"
                                                name="p_fechaInscripcion"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_fechaInscripcion
                                                }
                                                placeholder="Fecha de Inscripción"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="Epago"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Estado de pago
                                            </label>
                                            <select
                                                id="Epago"
                                                onChange={handleChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_estadopago"
                                                value={formData.p_estadopago}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Estado de Pago
                                                </option>
                                                <option value="1">
                                                    Pagado
                                                </option>
                                                <option value="0">
                                                    Pendiente
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="Gestudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Ciclo Academico
                                            </label>

                                            <select
                                                id="Cestudio"
                                                name="p_cicloinscripciones_id"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleCicloChange(e);
                                                }}
                                                value={
                                                    formData.p_cicloinscripciones_id
                                                }
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            >
                                                <option value="" disabled>
                                                    Seleccione ciclo
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

                                        <div>
                                            <label
                                                htmlFor="Gestudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Grupo de estudio
                                            </label>

                                            <select
                                                id="Gestudio"
                                                name="p_Grupos_id"
                                                onChange={handleChange}
                                                value={formData.p_Grupos_id}
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            >
                                                <option value="" disabled>
                                                    Seleccione grupo
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
                                            <label
                                                htmlFor="PEstudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Programa de estudio
                                            </label>

                                            <select
                                                id="PEstudio"
                                                name="p_Programaestudios_id"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_Programaestudios_id
                                                }
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            >
                                                <option value="" disabled>
                                                    Seleccione programa
                                                </option>
                                                {programas.map((programa) => (
                                                    <option
                                                        key={programa.id}
                                                        value={programa.id}
                                                    >
                                                        {
                                                            programa.nombre_programa
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="fotop"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Escaneo del comprobante de pago
                                            </label>
                                            <input
                                                id="fotop"
                                                type="file"
                                                onChange={handleChange}
                                                accept=".png, .jpg, .jpeg"
                                                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mt-2 ml-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                            >
                                Registrar Estudiante
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
