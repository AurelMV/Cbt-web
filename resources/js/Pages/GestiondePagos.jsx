import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
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

export default function GestionPagos({
    inscripciones,
    estudiantes,
    programaEstudio,
    ciclosInscripcion,
    grupos,
}) {
    const [showStudentList, setShowStudentList] = useState(false);

    const handleNewPayment = () => {
        setShowStudentList(true);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestion de Pagos" />
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Gestion de Pagos
            </h2>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-5 gap-8">
                                <div className="col-span-1">
                                    <h3 className="text-md font-medium mb-4">
                                        Formulario de Pago
                                    </h3>
                                    <form className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Número de Voucher"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Medio de Pago"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Monto"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            type="date"
                                            placeholder="Fecha de Pago"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nombre del Estudiante"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Apellido del Estudiante"
                                            className="w-full border p-2 rounded-md"
                                            required
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                            >
                                                Editar Pago
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
                                        <table className="min-w-full border divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        Id
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        Fecha
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        Monto
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        Medio de Pago
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        N° Voucher
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                                        fecha inscrita
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        asdasd
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {showStudentList && (
                                        <div>
                                            <h3 className="text-md font-medium mb-4">
                                                Lista de Estudiantes Inscritos
                                            </h3>
                                            <input
                                                type="text"
                                                placeholder="Buscar pago"
                                                className=" border p-2 rounded-md mb-4"
                                            />
                                            <table className="min-w-full divide-y divide-gray-200 border">
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
                                                                                handleEditClick(
                                                                                    inscripcion
                                                                                )
                                                                            }
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Editar
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
