import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { Inertia } from "@inertiajs/inertia";
import Prueva from "./Prueva";
import TextInput from "@/Components/TextInput";
import React, { useState, useEffect } from "react";

import { router, usePage } from "@inertiajs/react";

export default function GestionPagos({ queryParams = null }) {
    // const [inscripciones, setInscripciones] = useState([]);
    const [queryParamsState, setQueryParams] = useState(
        () => queryParams || {}
    );
    const [nombreEstudiante, setNombreEstudiante] = useState("");
    const [documentoEstudiante, setDocumentoEstudiante] = useState("");
    const { inscripciones } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (name, value) => {
        setQueryParams((prev) => ({
            ...prev,
            [name]: value || undefined,
        }));
        router.get(route("pagos.index"), {
            ...queryParamsState,
            [name]: value,
        });
    };

    const filteredInscripciones = inscripciones.data.filter((inscripcion) => {
        const fullName =
            `${inscripcion.estudiante.aPaterno} ${inscripcion.estudiante.aMaterno}`.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return (
            fullName.includes(searchTermLower) ||
            inscripcion.estudiante.dni.includes(searchTermLower)
        );
    });

    ////------------------------------------------------------aqui se cierra la wea

    const [showStudentList, setShowStudentList] = useState(false);

    const handleNewPayment = () => {
        setShowStudentList(true);
    };

    const [selectedInscripcion, setSelectedInscripcion] = useState(null);

    const handleSelectClick = (inscripcion) => {
        document.querySelector('[name="nombre"]').value =
            inscripcion.estudiante.nombres;
        document.querySelector('[name="apellido"]').value =
            inscripcion.estudiante.aPaterno;
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
        Inertia.get(
            "/GestionPagos",
            {
                nombre_estudiante: nombreEstudiante,
                documento_estudiante: documentoEstudiante,
            },
            {
                preserveState: true, // Asegúrate de que preserveState esté configurado
                replace: true, // Usar replace si quieres que la URL cambie sin recargar la página
            }
        );
    };

    //filtrado para la inscripcion

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
                                            readOnly
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
                                            readOnly
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
                                      

                                        <Prueva />

                                        <div>
                                            <h3 className="text-md font-medium mb-4 text-blue-900">
                                                Lista de Estudiantes Inscritos
                                            </h3>
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

                                            <input
                                                type="number"
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
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleInputChange(
                                                        "documento",
                                                        e.target.value,
                                                        true
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow">
                                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <tr>
                                                <th className="py-3 px-6 text-left">
                                                    Turno
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Nombres
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Apellidos
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Ciclo
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Programa
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Grupo
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm">
                                            {filteredInscripciones.map(
                                                (inscripcion) => (
                                                    <tr
                                                        key={inscripcion.id}
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6">
                                                            {inscripcion.turno}
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            {
                                                                inscripcion
                                                                    .estudiante
                                                                    .nombres
                                                            }
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            {`${inscripcion.estudiante.aPaterno} ${inscripcion.estudiante.aMaterno}`}
                                                        </td>

                                                        <td className="py-3 px-6">
                                                            {
                                                                inscripcion
                                                                    .ciclo
                                                                    .nombre
                                                            }
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            {
                                                                inscripcion
                                                                    .programa_estudio
                                                                    .nombre_programa
                                                            }
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            {
                                                                inscripcion
                                                                    .grupo
                                                                    .nombre
                                                            }
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <button
                                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                                onClick={() =>
                                                                    handleSelectClick(
                                                                        inscripcion
                                                                    )
                                                                }
                                                            >
                                                                Seleccionar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
