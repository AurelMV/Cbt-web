import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InertiaLink } from '@inertiajs/inertia-react'; 
import { Inertia } from '@inertiajs/inertia';
import Prueva from "./Prueva";

import React, { useState, useEffect } from "react";

function Pagination({ links }) {
    const handlePagination = (url) => {
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <div className="flex justify-center mt-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => handlePagination(link.url)}
                    disabled={!link.url}
                    className={`px-4 py-2 mx-1 text-sm rounded-md ${
                        link.url
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-300 text-gray-500"
                    }`}
                >
                    {link.label}
                </button>
            ))}
        </div>
    );
}

export default function GestionPagos({ inscripciones, estudiantes, programaEstudio, ciclosInscripcion, grupos }) {
    // const [inscripciones, setInscripciones] = useState([]);

    const [nombreEstudiante, setNombreEstudiante] = useState("");
    const [documentoEstudiante, setDocumentoEstudiante] = useState("");

    useEffect(() => {
        axios
            .get("/GestionPagos")
            .then((response) => {
                setEstudiantes(response.data.estudiantes);
              
            })
            .catch((error) => {
                console.error(
                    "Hubo un error al cargar las inscripciones",
                    error
                );
            });
    }, []);

    ////------------------------------------------------------aqui se cierra la wea

    const [showStudentList, setShowStudentList] = useState(false);

    const handleNewPayment = () => {
        setShowStudentList(true);
    };

    const [selectedInscripcion, setSelectedInscripcion] = useState(null);

    const handleSelectClick = (inscripcion) => {
        document.querySelector('[name="nombre"]').value =
            inscripcion.estudiante_nombres;
        document.querySelector('[name="apellido"]').value = inscripcion.turno;
        document.querySelector('[name="idInscripcion"]').value = inscripcion.id; // Aquí, por ejemplo, usas el ID de la inscripción
    };

    // ------------------------zona de registro de pago

    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const [medioPago, setMedioPago] = useState("");
    const [nroVoucher, setNroVoucher] = useState("");
    const [idInscripcion, setIdInscripcion] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    // Función para registrar el pago
    const handleSubmit = (e) => {
        e.preventDefault();

        const pagoData = {
            fecha: document.querySelector('[name="fecha"]').value,
            monto: parseInt(document.querySelector('[name="monto"]').value, 10),
            medioPago: document.querySelector('[name="medioPago"]').value,
            nroVoucher: document.querySelector('[name="nroVoucher"]').value,
            idInscripcion: parseInt(
                document.querySelector('[name="idInscripcion"]').value,
                10
            ),
        };

        // Enviar los datos directamente al controlador

        console.log("Datos enviados:", pagoData);

        axios
            .post("/api/registrar-pago", pagoData)
            .then((response) => {
                console.log("Pago registrado con éxito:", response.data);
                setFecha("");
                setMonto("");
                setMedioPago("");
                setNombre("");
                setApellido("");
                setNroVoucher("");
                setIdInscripcion("");
            })
            .catch((error) => {
                console.log("Datos enviados:", formData);
                console.error("Error al registrar el pago:", error);
            });
    };
    //fonita de filtrado de datos 
    const handleFilterChange = () => {
        Inertia.get('/GestionPagos', {
            nombre_estudiante: nombreEstudiante,
            documento_estudiante: documentoEstudiante,
        }, {
            preserveState: true, // Asegúrate de que preserveState esté configurado
            replace: true, // Usar replace si quieres que la URL cambie sin recargar la página
        });
    };
    

    return (
        <AuthenticatedLayout>
            <Head title="Gestion de Pagos" />
            <h2 className="text-xl font-semibold leading-tight text-black">
                GESTION DE PAGOS
            </h2>
            <p className="leading-tight text-gray-400">
                Mira los pagos hechos por los estudiantes o completa el pago de
                alguno
            </p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-300">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-5 gap-8">
                                <div className="col-span-1">
                                    <h3 className="text-md font-medium mb-4">
                                        Formulario de Pago
                                    </h3>
                                    <form
                                        className="space-y-4"
                                        onSubmit={handleSubmit}
                                    >
                                        <input
                                            name="nroVoucher"
                                            type="text"
                                            placeholder="Número de Voucher"
                                            className="w-full border p-2 rounded-md"
                                            required
                                            value={nroVoucher}
                                            onChange={(e) =>
                                                setNroVoucher(e.target.value)
                                            }
                                        />

                                        <select
                                            name="medioPago"
                                            value={medioPago}
                                            onChange={(e) =>
                                                setMedioPago(e.target.value)
                                            }
                                            className="w-full border p-2 rounded-md mb-4"
                                            required
                                        >
                                            <option value="CAJA">CAJA</option>
                                            <option value="DEPOSITO">
                                                DEPOSITO
                                            </option>
                                        </select>

                                        <input
                                            name="monto"
                                            type="number"
                                            placeholder="Monto del Pago"
                                            className="w-full border p-2 rounded-md"
                                            required
                                            value={monto}
                                            onChange={(e) =>
                                                setMonto(e.target.value)
                                            }
                                        />
                                        <input
                                            name="fecha"
                                            type="date"
                                            placeholder="Fecha de Pago"
                                            className="w-full border p-2 rounded-md"
                                            required
                                            value={fecha}
                                            onChange={(e) =>
                                                setFecha(e.target.value)
                                            }
                                        />

                                        <input
                                            name="nombre"
                                            type="text"
                                            placeholder="Nombre del Estudiante"
                                            className="w-full border p-2 rounded-md"
                                            required
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                        />

                                        <input
                                            name="apellido"
                                            type="text"
                                            placeholder="Apellido del Estudiante"
                                            className="w-full border p-2 rounded-md"
                                            required
                                            value={apellido}
                                            onChange={(e) =>
                                                setApellido(e.target.value)
                                            }
                                        />

                                        <input
                                            name="idInscripcion"
                                            type="hidden"
                                            className="w-full border p-2 rounded-md"
                                            value={idInscripcion}
                                            onChange={(e) =>
                                                setIdInscripcion(e.target.value)
                                            }
                                            required
                                        />

                                        <div className="flex space-x-2">
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                            >
                                                Registrar nuevo pago
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={handleNewPayment}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md"
                                            >
                                                Generar Nuevo Pago
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-span-4">
                                    <div className="mb-8">
                                        <h3 className="text-md font-medium mb-4">
                                            Lista de Pagos
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="Buscar pago"
                                            className=" border p-2 rounded-md mb-4"
                                        />

                                        <Prueva />

                                        <div>
                                            <h3 className="text-md font-medium mb-4 text-blue-900">
                                                Lista de Estudiantes Inscritos
                                            </h3>
                                            <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={nombreEstudiante}
                    onChange={(e) => setNombreEstudiante(e.target.value)}
                    onBlur={handleFilterChange}  // Filtro al salir del campo
                />
                <input
                    type="text"
                    placeholder="Buscar por documento"
                    value={documentoEstudiante}
                    onChange={(e) => setDocumentoEstudiante(e.target.value)}
                    onBlur={handleFilterChange}  // Filtro al salir del campo
                />
                                            <table className="min-w-full border divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Turno
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Fecha
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Valor de Pago
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Estudiante
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Apellidos
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Ciclo
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Programa
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Acciones
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {inscripciones &&
                                                    inscripciones.data ? (
                                                        inscripciones.data.map(
                                                            (inscripcion) => (
                                                                <tr
                                                                    key={
                                                                        inscripcion.id
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.turno
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.fechaInscripcion
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.estadopago
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.estudiante_nombres
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.aPaterno
                                                                        }
                                                                    </td>

                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.ciclo_nombre
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.programa_nombre
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleSelectClick(
                                                                                    inscripcion
                                                                                )
                                                                            }
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Seleccionar
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan="7"
                                                                className="px-6 py-4 text-sm text-gray-500 text-center"
                                                            >
                                                                No hay datos
                                                                disponibles
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <div className="mt-4">
                                                <Pagination
                                                    links={inscripciones.links}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {showStudentList && (
                                        <div>
                                            <h3 className="text-md font-medium mb-4 text-blue-900">
                                                Lista de Estudiantes Inscritos
                                            </h3>
                                            <input
                                                type="text"
                                                placeholder="Buscar pago"
                                                className=" border p-2 rounded-md mb-4"
                                            />
                                            <table className="min-w-full border divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Turno
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Fecha
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Valor de Pago
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Estudiante
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Ciclo
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Programa
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                                            Acciones
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {inscripciones &&
                                                    inscripciones.data ? (
                                                        inscripciones.data.map(
                                                            (inscripcion) => (
                                                                <tr
                                                                    key={
                                                                        inscripcion.id
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.turno
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.fechaInscripcion
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.estadopago
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.estudiante_nombres
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.ciclo_nombre
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inscripcion.programa_nombre
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleSelectClick(
                                                                                    inscripcion
                                                                                )
                                                                            }
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Seleccionar
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan="7"
                                                                className="px-6 py-4 text-sm text-gray-500 text-center"
                                                            >
                                                                No hay datos
                                                                disponibles
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <div className="mt-4">
                                                <Pagination
                                                    links={inscripciones.links}
                                                />
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
