import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Inscripción Estudiantes
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">
                                        Ingrese Datos del Estudiante
                                    </h3>{" "}
                                    <div className="grid grid-cols-4 gap-4">
                                        <input
                                            //dato que se envia
                                            onChange={handleChange}
                                            type="text"
                                            name="p_nombres"
                                            value={formData.p_nombres}
                                            placeholder="p_nombres"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <select
                                            onChange={handleChange}
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                            name="p_tipodocumento" // Asegúrate de que el nombre sea exactamente "p_tipodocumento"
                                            value={formData.p_tipodocumento || ""} // Evita que quede sin valor
                                        >
                                            <option value="">
                                                Seleccione Tipo de Documento
                                            </option>
                                            <option value="DNI">DNI</option>
                                            <option value="Pasaporte">
                                                Pasaporte
                                            </option>
                                        </select>

                                        <input
                                            //dato que se envia
                                            onChange={handleChange}
                                            name="p_nroDocumento"
                                            value={formData.p_nroDocumento}
                                            type="number"
                                            placeholder="p_nroDocumento"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            //dato que se envia
                                            onChange={handleChange}
                                            name="p_sexo"
                                            value={formData.p_sexo}
                                            type="text"
                                            placeholder="p_sexo"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            //dato que se envia
                                            onChange={handleChange}
                                            name="p_aPaterno"
                                            value={formData.p_aPaterno}
                                            type="text"
                                            placeholder="Apellido Paterno"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_email"
                                            value={formData.p_email}
                                            type="text"
                                            placeholder="p_email"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_celularestudiante"
                                            value={formData.p_celularestudiante}
                                            type="number"
                                            placeholder="Teléfono"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <h1>Fecha de Nacimiento</h1>
                                        <input
                                            onChange={handleChange}
                                            name="p_aMaterno"
                                            value={formData.p_aMaterno}
                                            type="text"
                                            placeholder="Apellido Materno"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_celularapoderado"
                                            value={formData.p_celularapoderado}
                                            type="text"
                                            placeholder="Teléfono de Apoderado"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="p_direccion"
                                            value={formData.p_direccion}
                                            placeholder="Dirección"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            type="date"
                                            name="p_fechaNacimiento"
                                            value={formData.p_fechaNacimiento}
                                            placeholder="Fecha de Nacimiento"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />

                                        <input
                                            onChange={handleChange}
                                            type="date"
                                            name="p_fechaInscripcion"
                                            value={formData.p_fechaInscripcion}
                                            placeholder="Fecha de Nacimiento"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />

                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="p_Usuarios_id"
                                            value={formData.p_Usuarios_id}
                                            placeholder="idusuario"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />

                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="p_anoculminado"
                                            value={formData.p_anoculminado}
                                            placeholder="año de culminacion"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            //zona provicional de id p_Colegios_id
                                            onChange={handleChange}
                                            type="text"
                                            name="p_Colegios_id"
                                            value={formData.p_Colegios_id}
                                            placeholder="p_Colegios_id"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                            //--------------------------------------------------------------------------------
                                        />
                                        <button
                                            onChange={handleChange}
                                            onClick={openModal}
                                            className="col-span-1 bg-indigo-600 text-white p-2 rounded-md"
                                        >
                                            Seleccionar Colegio
                                        </button>
                                    </div>
                                </div>

                                {modalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                            <h3 className="text-lg font-semibold mb-4">
                                                Seleccione Ubicación y Colegio
                                            </h3>

                                            <div className="space-y-4">
                                                <select
                                                    className="w-full border p-2 rounded-md"
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Departamento
                                                    </option>
                                                    <option value="departamento1">
                                                        Departamento 1
                                                    </option>
                                                    <option value="departamento2">
                                                        Departamento 2
                                                    </option>
                                                </select>
                                                <select
                                                    className="w-full border p-2 rounded-md"
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Provincia
                                                    </option>
                                                    <option value="provincia1">
                                                        Provincia 1
                                                    </option>
                                                    <option value="provincia2">
                                                        Provincia 2
                                                    </option>
                                                </select>
                                                <select
                                                    className="w-full border p-2 rounded-md"
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Distrito
                                                    </option>
                                                    <option value="distrito1">
                                                        Distrito 1
                                                    </option>
                                                    <option value="distrito2">
                                                        Distrito 2
                                                    </option>
                                                </select>

                                                <input
                                                    type="text"
                                                    placeholder="Buscar Colegio"
                                                    className="w-full border p-2 rounded-md"
                                                />
                                                <div className="h-32 overflow-y-auto border rounded-md p-2">
                                                    <p>Colegio 1</p>
                                                    <p>Colegio 2</p>
                                                    <p>Colegio 3</p>
                                                </div>

                                                <button className="w-full bg-indigo-600 text-white p-2 rounded-md mt-2">
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
                                                    onClick={closeModal}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                >
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">
                                        Datos de Pago
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            onChange={handleChange}
                                            name="p_fechaPago"
                                            value={formData.p_fechaPago}
                                            type="date"
                                            placeholder="Fecha de Pago"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_monto"
                                            value={formData.p_monto}
                                            type="number"
                                            placeholder="p_monto de Pago"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="p_medioPago"
                                            value={formData.p_medioPago}
                                            placeholder="Medio de Pago"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="p_nroVoucher"
                                            value={formData.p_nroVoucher}
                                            placeholder="Número de Voucher"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">
                                        Datos de Inscripción
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <select
                                            onChange={handleChange}
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                            name="p_turno"
                                            value={formData.p_turno}
                                        >
                                            <option value="">
                                                Seleccione p_turno
                                            </option>
                                            <option value="mañana">
                                                Mañana
                                            </option>
                                            <option value="tarde">Tarde</option>
                                        </select>

                                        <input
                                            onChange={handleChange}
                                            type="date"
                                            name="p_fechaInscripcion"
                                            value={formData.p_fechaInscripcion}
                                            placeholder="Fecha de Inscripción"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <select
                                            onChange={handleChange}
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                            name="p_estadopago"
                                            value={formData.p_estadopago}
                                        >
                                            <option value="">
                                                Estado de Pago
                                            </option>
                                            <option value="1">Pagado</option>
                                            <option value="0">Pendiente</option>
                                        </select>
                                        <input
                                            onChange={handleChange}
                                            name="p_Grupos_id"
                                            value={formData.p_Grupos_id}
                                            type="text"
                                            placeholder="Grupo de Estudio"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_Programaestudios_id"
                                            value={formData.p_Programaestudios_id}
                                            type="text"
                                            placeholder="Programa de Estudio"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            onChange={handleChange}
                                            name="p_cicloinscripciones_id"
                                            value={
                                                formData.p_cicloinscripciones_id
                                            }
                                            type="text"
                                            placeholder="idciclo"
                                            className="col-span-1 border p-2 rounded-md"
                                            required
                                        />

                                        <input
                                            onChange={handleChange}
                                            name="imagen"
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            //------------------------------------------------------------------------------------------------------------------------------
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Registrar Estudiante
                        </button>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
