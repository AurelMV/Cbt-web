import React, { useEffect, useState } from "react";
import ColegioServicio from "@/Components/ColegioServicio";
import Listado from "@/Components/DepartamentoServicio";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import axios from "axios";



const InscripcionForm = () => {
    
    const [serverErrors, setServerErrors] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [ciclos, setCiclos] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };
    const [inputValue, setInputValue] = useState("");
    const [distritos, setdistritos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [departamentos, setlistados] = useState([]);
    const [Cole, setCole] = useState([]);
    const [colegi, setcolegi] = useState({
        nombre:""
    });
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

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };
 
    const [formData, setFormData] = useState({
        nombres: "",
        tipodocumento: "",
        Nrodocumento: "",
        sexo: "",
        aPaterno: "",
        email: "",
        celularestudiante: "",
        fechaNacimiento: "",
        aMaterno: "",
        celularapoderado: "",
        fotoDNI: null,

        direccion: "",
        idcolegio: "",
        fecha: "",
        monto: "",
        medioPago: "",
        nroVoucher: "",
        p_turno: "",//aun es opcional despues se le puede agregar normal
        idciclo: "",
        p_fechaInscripcion: "",// ya se completa en la otra 
        estado: 'Pendiente',
        anoculminado: "",

        p_estadopago: "",//El docente lo pone en el dashboart
       
        idprogramaestudios: "",
        fotoVoucher: null,
    });
    useEffect(() => {
        axios
            .get("/api/programas")
            .then((response) => {
                setProgramas(response.data); // Actualiza el estado con los datos
            })
            .catch((error) => {
                console.error("Error al cargar los programas:", error);
            });

        axios
            .get("/api/cicloslistar")
            .then((response) => {
                setCiclos(response.data); // Guardar los ciclos y sus grupos
            })
            .catch((error) => {
                console.error("Error al cargar los ciclos y grupos:", error);
            });
    }, []);
 
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
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0], // Guardamos el archivo seleccionado
        }));
    };


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














 
    const [grupos, setGrupos] = useState([]);
    const [selectedCiclo, setSelectedCiclo] = useState("");
 


    const [programaSeleccionado, setProgramaSeleccionado] = useState("");

 
    const [error, setError] = useState(null);
    const [MensajeError, setMensajeError] = useState("");

  
   


 
 

    const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = () => setModalOpen2(true);
    const closeModal2 = () => setModalOpen2(false);

 
    const handleChangeDAtaColegio = (e) => {
        const { name, value } = e.target;
        setColegioDAta((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


 


    const [digitLimit, setDigitLimit] = useState(8)

    

 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Crear un FormData para enviar los archivos y otros datos
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        });
    
        try {
          // Realizar el envío de datos al backend
          await axios.post('/inscripcion-temporals', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          alert('Inscripción registrada exitosamente.');
        } catch (error) {
          console.error('Error al registrar la inscripción:', error);
          alert('Hubo un error al registrar la inscripción.');
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
        const fechaActual = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({
            ...prev,
            p_fechaInscripcion: fechaActual,
        }));
        axios
           

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

    const handleSelectColegio = (id,nombrecolegio) => {
        setFormData((prevData) => ({
            ...prevData,
            idcolegio: id, 
        }));
        setcolegi(() => ({nombre:nombrecolegio}));
        alert("¡Colegio seleccionado con éxito!");
    };
  








































    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10 mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-4">
                    Formulario de Inscripción
                </h1>
                <h2 className="text-lg md:text-xl text-gray-700 mb-6">
                    ¡Asegura tu lugar en el programa de tus sueños!
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                    <strong>
                        Ten en cuenta antes de completar el formulario:
                    </strong>
                    <ul className="list-inside list-disc mt-2 text-left">
                        <li>
                            1.- Ya se ha debido realizar un pago en la caja de
                            la institución
                        </li>
                        <li>
                            2.- Cualquier error en el formulario hará que este
                            no tenga validez
                        </li>
                    </ul>
                </p>
                <p className="text-sm md:text-base text-gray-600">
                    Completa este formulario con tus datos personales y del pago
                    para formalizar tu inscripción. ¡Estamos emocionados de
                    tenerte con nosotros!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10 mt-3">
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nombres:
                            </label>
                            <input
                                type="text"
                                name="nombres"
                                onChange={handleChange}
                                value={formData.nombres}
                                maxLength="80"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Apellido Paterno:
                            </label>
                            <input
                                type="text"
                                name="aPaterno"
                                onChange={handleChange}
                                value={formData.aPaterno}
                                maxLength="120"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Apellido Materno:
                            </label>
                            <input
                                type="text"
                                name="aMaterno"
                                onChange={handleChange}
                                value={formData.aMaterno}
                                maxLength="120"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Sexo:
                            </label>
                            <select
                                name="sexo"
                                onChange={handleChange}
                                value={formData.sexo}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Seleccione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="tpoDocumento"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Tipo de Documento
                            </label>
                            <select
                                                id="tpoDocumento"
                                                onChange={handleSelectChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="tipodocumento" // Asegúrate de que el nombre sea exactamente "p_tipodocumento"
                                                value={
                                                    formData.tipodocumento ||
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
                        <div>
                            <label
                                htmlFor="dni"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Nro de Documento
                            </label>
                            <input
                                                //dato que se envia
                                                id="dni"
                                                onChange={handleInputChange2}
                                                name="Nrodocumento"
                                                value={formData.Nrodocumento}
                                                type="text"
                                                placeholder="Nro de Documento"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                                
                                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Celular Estudiante:
                            </label>
                            <input
                                type="text"
                                name="celularestudiante"
                                onChange={handleChange}
                                value={
                                    formData.celularestudiante
                                }
                                maxLength="9"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Celular Apoderado:
                            </label>
                            <input
                                type="text"
                                name="celularapoderado"
                                onChange={handleChange}
                                value={
                                    formData.celularapoderado
                                }
                                maxLength="9"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Fecha de Nacimiento:
                            </label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                onChange={handleChange}
                                value={
                                    formData.fechaNacimiento
                                }
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                maxLength="220"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-gray-700 font-medium mb-1"
                                htmlFor="direccion"
                            >
                                Direccion
                            </label>
                            <input
                              name="direccion"
                              onChange={handleChange}
                              value={formData.direccion}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Ultimo año cursado en el colegio
                            </label>
                            <input
                                id="anoculminado"
                                type="text"
                                name="anoculminado"
                                onChange={handleChange}
                                value={formData.anoculminado}
                                placeholder="Ultimo año cursado"
                                className="w-48 col-span-1 border p-2 rounded-md"
                                required
                            />
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
                                value={formData.p_Programaestudios_id}
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
                                        {programa.nombre_programa}
                                    </option>
                                ))}
                            </select>
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
                                                readOnly
                                            />
                                        </div>
                        <div>
                            <label
                                htmlFor="fotop"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Foto de DNI
                            </label>
                            <input
                type="file"
                name="fotoDNI"
                onChange={handleFileChange}
                accept=".jpeg,.jpg,.png"
            />
                        </div>
                    </div>
                )}
                {modalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-8 rounded-lg shadow-lg flex w-full max-w-7xl">
                                            <div className="w-2/5 pl-6 border-r">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Seleccione Ubicación y Colegio
                                                </h3>
                                                <div className="space-y-4">
                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={handleDepartamentoChange}
                                                    >
                                                        <option value="">Departamento</option>
                                                        {departamentos.map((depa) => (
                                                            <option key={depa.id} value={depa.id}>
                                                                {depa.nombredepartamento}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={handleProvinciaChange}
                                                    >
                                                        <option value="">Provincia</option>
                                                        {provincias.map((lista) => (
                                                            <option key={lista.id} value={lista.id}>
                                                                {lista.nombreprovincia}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <select
                                                        className="w-11/12 mx-auto border p-2 rounded-md"
                                                        required
                                                        onChange={handleColegioChange}
                                                    >
                                                        <option value="">Distrito</option>
                                                        {distritos.map((lista) => (
                                                            <option key={lista.id} value={lista.id}>
                                                                {lista.nombredistrito}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="w-11/12 mx-auto">
                                                        <input
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={handleInputChange}
                                                            placeholder="Buscar colegios..."
                                                            className="w-11/12 mx-auto border p-2 rounded-md"
                                                        />
                                                    </div>

                                                    
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
                                                            currentItems.map((resultado, index) => (
                                                                <tr key={index}>
                                                                    <td className="border px-4 py-2">
                                                                        <button
                                                                            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-1 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleSelectColegio(
                                                                                    resultado.id,resultado.nombrecolegio
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
                                                                onClick={() => paginate(number)}
                                                                className={`px-1.5 py-0.95 mx-1 rounded-md ${number ===
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

                {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                            Fecha de pago
                            </label>
                            <input
                                                id="fpago"
                                                type="date"
                                                name="fecha"
                                                onChange={handleChange}
                                                value={formData.fecha}
                                                placeholder="Fecha de Pago"
                                                className="w-48 col-span-1 border p-2 rounded-md"
                                                required
                                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Monto Pagado
                            </label>
                            <input
                                                id="Monto"
                                                type="number"
                                                name="monto"
                                                onChange={handleChange}
                                                value={formData.monto}
                                                placeholder="Monto de Pago"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Medio de Pago
                            </label>
                            <select
                                                id="medio"
                                                name="medioPago"
                                                value={formData.medioPago}
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
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Numero de Voucher
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
                                                    if (e.target.value.length !== 10) {
                                                        alert('El número de documento debe tener exactamente 10 dígitos');
                                                    }
                                                }}
                                            />
                        </div>
                        <div>
                            <label
                                htmlFor="fotop"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Escaneo del comprobante de pago
                            </label>




                            <input
                type="file"
                name="fotoVoucher"
                onChange={handleFileChange}
                accept=".jpeg,.jpg,.png"
            />

                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Turno:
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
                            <label className="block text-gray-700 font-medium mb-1">
                                Programa de Estudio:
                            </label>
                            <select
                                                id="PEstudio"
                                                name="idprogramaestudios"
                                                onChange={handleChange}
                                                value={
                                                    formData.idprogramaestudios
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
                        <div>
                                            <label
                                                htmlFor="Gestudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Ciclo Academico
                                            </label>

                                            <select
                                                id="Cestudio"
                                                name="idciclo"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                  
                                                }}
                                                value={
                                                    formData.idciclo
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
                    </div>
                )}



                <div className="mt-6 text-center flex justify-between gap-4">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Anterior
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Siguiente
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button
                            type="submit"
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Enviar Inscripción
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InscripcionForm;
