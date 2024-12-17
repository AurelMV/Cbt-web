import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ListInscripcionsTemp({ inscripcionesTemporales }) {
    const [selectedInscripcion, setSelectedInscripcion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (inscripcion) => {
        setSelectedInscripcion(inscripcion);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedInscripcion(null);
        setIsModalOpen(false);
    };

    const handleApprove = (e) => {
        e.preventDefault();
        Inertia.post(route("inscripcion.approve"), {
            nombres: selectedInscripcion.nombres,
            aPaterno: selectedInscripcion.aPaterno,
            aMaterno: selectedInscripcion.aMaterno,
            sexo: selectedInscripcion.sexo,
            celularestudiante: selectedInscripcion.celularestudiante,
            celularapoderado: selectedInscripcion.celularapoderado,
            fechaNacimiento: selectedInscripcion.fechaNacimiento,
            email: selectedInscripcion.email,
            anoculminado: selectedInscripcion.anoculminado,
            Nrodocumento: selectedInscripcion.nroDocumento,
            tipodocumento: selectedInscripcion.tipodocumento,
            direccion: selectedInscripcion.direccion,
            fotoDNI: null,
            fecha: selectedInscripcion.fecha,
            monto: selectedInscripcion.monto,
            medioPago: selectedInscripcion.medioPago,
            nroVoucher: selectedInscripcion.nroVoucher,
            fotoVoucher: null,
            estado: selectedInscripcion.estado,
            idprogramaestudios: selectedInscripcion.idprogramaestudios,
            idciclo: selectedInscripcion.idciclo,
            idcolegio: selectedInscripcion.idcolegio,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-2/4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium mb-4">
                            LISTA DE INSCRIPCIONES PENDIENTES
                        </h3>
                        <button
                            className="text-white bg-red-600 hover:bg-red-900 w-8 h-8 rounded-md flex items-center justify-center"
                            onClick={() => Inertia.visit("/dashboard")}
                        >
                            X
                        </button>
                    </div>
                    {inscripcionesTemporales.map((inscripcion) => (
                        <div
                            className="mx-auto max-w-7xl sm:px-6 lg:px-8"
                            key={inscripcion.id}
                        >
                            <h3 className="text-lg font-semibold text-blue-900">
                                Inscripción Pendiente #{inscripcion.id}
                            </h3>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-3 border border-gray-300">
                                <div className="grid grid-cols-6 gap-6 items-center justify-center">
                                    <div className="text-center">
                                        {inscripcion.nombres}
                                    </div>
                                    <div className="text-center">
                                        {inscripcion.apellidos}
                                    </div>
                                    <div className="text-center">
                                        {inscripcion.nombreCiclo}
                                    </div>
                                    <div className="text-center">
                                        {inscripcion.nombrePrograma}
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={() =>
                                                handleModal(inscripcion)
                                            }
                                            className="text-blue-600 hover:text-blue-900 px-4 rounded"
                                        >
                                            Ver
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <button className="text-red-600 hover:text-red-900 px-4 rounded">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedInscripcion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-3/5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium mb-4">
                                INSCRIPCIÓN PENDIENTE #{selectedInscripcion.id}
                            </h3>
                            <button
                                className="text-white bg-red-600 hover:bg-red-900 w-8 h-8 rounded-md flex items-center justify-center"
                                onClick={closeModal}
                            >
                                X
                            </button>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-3 border border-gray-300">
                            <div className="grid grid-cols-2 gap-6 items-center justify-center">
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Nombres:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.nombres}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Apellidos:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.apellidos}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Sexo:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.sexo}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Celular Estudiante:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.celularestudiante}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Celular Apoderado:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.celularapoderado}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Fecha de Nacimiento:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.fechaNacimiento}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Email:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.email}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Año Culminado:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.anoculminado}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Nro Documento:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.Nrodocumento}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Tipo Documento:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.tipodocumento}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Dirección:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.direccion}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Fecha:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.fecha}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Monto:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.monto}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Medio de Pago:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.medioPago}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Nro Voucher:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.nroVoucher}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Estado:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.estado}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Programa de Estudios:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.nombrePrograma}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Ciclo:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.nombreCiclo}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <h3 className="text-lg font-semibold text-blue-900 mr-2">
                                        Colegio:
                                    </h3>
                                    <p className="text-lg">
                                        {selectedInscripcion.nombreColegio}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-white bg-green-600 hover:bg-green-900 px-4 py-2 rounded-md mr-2"
                                onClick={handleApprove}
                            >
                                Aprobar
                            </button>
                            <button
                                className="text-white bg-red-600 hover:bg-red-900 px-4 py-2 rounded-md"
                                onClick={closeModal}
                            >
                                Rechazar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
