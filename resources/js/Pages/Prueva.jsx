


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GestionPagos() {
    const [pagos, setPagos] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
    const [pagoEdit, setPagoEdit] = useState(null); // Estado para almacenar el pago a editar
    const [nombre, setNombreFiltro] = useState('');
    const [nroDocumento, setNroDocumentoFiltro] = useState('');

    // Función para obtener pagos de una página específica
    const fetchPagos = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`/gestion-pagos?page=${page}`, {
                params: {
                    nombre: nombre,
                    nroDocumento: nroDocumento
                }
            });
            setPagos(response.data.data);
            setPaginationInfo(response.data);
        } catch (error) {
            console.error('Error al obtener los pagos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPagos(); // Cargar la primera página al montar el componente
    }, []); 
    const handleBlur = () => {
        fetchPagos(1, nombre, nroDocumento); 
    };

    const handleEdit = (pago) => {
        setPagoEdit(pago);
        setModalOpen(true); // Abrir el modal al seleccionar un pago
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setPagoEdit(null); // Limpiar el estado del pago editado
    };
    const handleNombreChange = (e) => setNombreFiltro(e.target.value);
    const handleNroDocumentoChange = (e) => setNroDocumentoFiltro(e.target.value);

    const handleSave = async () => {
        try {
            // Actualizar el pago en la base de datos (sin tocar la inscripción)
            await axios.put(`/editar-pago/${pagoEdit.id}`, pagoEdit);
            fetchPagos(); // Refrescar los pagos
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            console.error('Error al guardar el pago:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    const { current_page, last_page, links } = paginationInfo;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Lista de Pagos</h1>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nombre}
                    onBlur={handleBlur}
                    onChange={handleNombreChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Filtrar por Nro Documento"
                    value={nroDocumento}
                    onBlur={handleBlur}
                    onChange={handleNroDocumentoChange}
                    className="ml-4 p-2 border border-gray-300 rounded-md"
                />
            </div>
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Medio de Pago</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nro Voucher</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Estado Pago</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Estudiante</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Acción</th> {/* Columna de acción */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pagos.length > 0 ? (
                            pagos.map((pago) => (
                                <tr key={pago.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.monto}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.fecha}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.medioPago}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.nroVoucher}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{pago.estado_pago}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {pago.inscripcion?.estudiante?.nombres || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <button
                                            onClick={() => handleEdit(pago)} // Al hacer clic, se abre el modal con los datos del pago
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-sm text-gray-500 text-center">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Navegación de Paginación */}
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    Página {current_page} de {last_page}
                </p>
                <nav className="inline-flex shadow-sm rounded-md" aria-label="Pagination">
                    {links &&
                        links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const page = new URL(link.url || '').searchParams.get('page');
                                    if (page) {
                                        fetchPagos(page);
                                    }
                                }}
                                disabled={!link.url || link.active}
                                className={`px-4 py-2 border text-sm ${
                                    link.active
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </button>
                        ))}
                </nav>
            </div>

            {/* Modal de Edición */}
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Editar Pago</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Monto</label>
                            <input
                                type="number"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={pagoEdit?.monto || ''}
                                onChange={(e) =>
                                    setPagoEdit((prev) => ({
                                        ...prev,
                                        monto: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Medio de Pago</label>
                            <input
                                type="text"

                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={pagoEdit?.medioPago || ''}
                                
                                onChange={(e) =>
                                    setPagoEdit((prev) => ({
                                        ...prev,
                                        medioPago: e.target.value,
                                    }))
                                }
                                readOnly
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Nro Voucher</label>
                            <input
                                type="text"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={pagoEdit?.nroVoucher || ''}
                                onChange={(e) =>
                                    setPagoEdit((prev) => ({
                                        ...prev,
                                        nroVoucher: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Guardar cambios
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GestionPagos;