import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Ciclos({ ciclos: initialCiclos }) {
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [listaCiclos, setListaCiclos] = useState(initialCiclos);
    // Estado para el menú contextual
    const [showContextMenu, setShowContextMenu] = useState(false);
    // Posición del menú
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    // Ciclo seleccionado para eliminar
    const [selectedCiclo, setSelectedCiclo] = useState(null);

    // Estado para el modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Estado para el nombre en edición
    const [editNombre, setEditNombre] = useState('');
    // Estado para la fecha de inicio en edición
    const [editFechaInicio, setEditFechaInicio] = useState('');
    // Estado para la fecha de finalización en edición
    const [editFechaFin, setEditFechaFin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/ciclos', {
                nombre,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            });

            // Si `response.data` contiene el nuevo ciclo, úsalo para actualizar la lista
            const nuevoCiclo = response.data;

            // Actualizar el listado de ciclos
            setListaCiclos([...listaCiclos, nuevoCiclo]);

            // Limpiar los campos del formulario
            setNombre('');
            setFechaInicio('');
            setFechaFin('');

        } catch (error) {
            console.error('Error al registrar el ciclo', error);
        }
    };

    const handleContextMenu = (e, cicloId) => {
        e.preventDefault(); // Prevenir el menú contextual por defecto
        setSelectedCiclo(cicloId); // Establecer el ciclo seleccionado
        console.log(selectedCiclo);
        setContextMenuPosition({ x: e.clientX, y: e.clientY }); // Obtener la posición del clic
        setShowContextMenu(true); // Mostrar el menú contextual
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/ciclos/${selectedCiclo}`);

            setListaCiclos(listaCiclos.filter(ciclo => ciclo.id !== selectedCiclo));
            setShowContextMenu(false); // Ocultar el menú contextual
        } catch (error) {
            console.error('Error al eliminar el ciclo', error);
        }
    };

    const handleCloseContextMenu = () => {
        setShowContextMenu(false); // Cerrar el menú contextual si se hace clic fuera de él
    };

    // Función para abrir el modal de edición y establecer los datos del ciclo seleccionado
    const openEditModal = (ciclo) => {
        setEditNombre(ciclo.nombre);
        setEditFechaInicio(ciclo.fecha_inicio);
        setEditFechaFin(ciclo.fecha_fin);
        setSelectedCiclo(ciclo.id);
        setIsEditModalOpen(true);
        setShowContextMenu(false);
    };

    // Función para manejar la edición del ciclo
    const handleEditSubmit = async () => {
        try {
            await axios.put(`/ciclos/${selectedCiclo}`, {
                nombre: editNombre,
                fecha_inicio: editFechaInicio,
                fecha_fin: editFechaFin
            });
            setListaCiclos(listaCiclos.map(ciclo =>
                ciclo.id === selectedCiclo ? { ...ciclo, nombre: editNombre, fecha_inicio: editFechaInicio, fecha_fin: editFechaFin } : ciclo
            ));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error al modificar el ciclo', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ciclos" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Ciclos
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-8">

                            {/* Formulario de creación */}
                            <div>
                                <h3 className="text-md font-medium mb-4">Datos del Ciclo</h3>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {/* Campos de entrada */}
                                    <input
                                        type="text"
                                        placeholder="Nombre del Ciclo"
                                        className="w-full border p-2 rounded-md"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    <h1 className="text-md font-medium mb-4">Fecha de Incio</h1>
                                    <input
                                        type="date"
                                        placeholder="Fecha de Inicio"
                                        className="w-full border p-2 rounded-md"
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                        required
                                    />
                                    <h1 className="text-md font-medium mb-4">Fecha de Finalizacion</h1>
                                    <input
                                        type="date"
                                        placeholder="Fecha de Finalización"
                                        className="w-full border p-2 rounded-md"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        required
                                    />
                                    <div className="space-x-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none"
                                        >
                                            Guardar
                                        </button>

                                        {/* <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-500 focus:outline-none"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none"

                                        >
                                            Eliminar
                                        </button> */}
                                    </div>
                                </form>
                            </div>

                            {/* Listado de ciclos */}
                            <div>
                                <h3 className="text-md font-medium mb-4">Listado de Ciclos</h3>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Nombre del Ciclo
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Fecha de Inicio
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Fecha de Finalización
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {listaCiclos.map((ciclo) => (
                                            <tr
                                                key={ciclo.id}
                                                onContextMenu={(e) => handleContextMenu(e, ciclo.id)} // Detectar clic derecho
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {ciclo.nombre}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {ciclo.fecha_inicio}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {ciclo.fecha_fin}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Modal de edición */}
             {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                        <h3 className="text-lg font-medium mb-4">Editar Ciclo</h3>
                        <input
                            type="text"
                            placeholder="Nombre del Ciclo"
                            className="w-full border p-2 rounded-md"
                            value={editNombre}
                            onChange={(e) => setEditNombre(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className="w-full border p-2 rounded-md mt-2"
                            value={editFechaInicio}
                            onChange={(e) => setEditFechaInicio(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className="w-full border p-2 rounded-md mt-2"
                            value={editFechaFin}
                            onChange={(e) => setEditFechaFin(e.target.value)}
                            required
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={handleEditSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Guardar Cambios
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*Abrir menú contextual*/}
            {showContextMenu && (
                <div
                    className="absolute bg-white border border-gray-300 shadow-lg rounded-md p-2"
                    style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
                    onClick={handleCloseContextMenu} // Cerrar menú al hacer clic fuera
                >
                    <button
                        onClick={() => openEditModal(listaCiclos.find(c => c.id === selectedCiclo))}
                        className="block w-full text-black-600 px-4 py-2 text-sm text-left"
                    >
                        Modificar Ciclo
                    </button>
                    <button
                        onClick={handleDelete}
                        className="block w-full text-red-600 px-4 py-2 text-sm text-left"
                    >
                        Eliminar Ciclo
                    </button>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
