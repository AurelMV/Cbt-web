import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function ProgramasEstudio({ programasEstudio: initialPrograma }) {
    const [nombre, setNombre] = useState('');
    const [listaProgramas, setlistaProgramas] = useState(initialPrograma);
    // Estado para el menú contextual
    const [showContextMenu, setShowContextMenu] = useState(false);
    // Posición del menú
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    // Programa seleccionado para eliminar o modificar
    const [selectedPrograma, setSelectedPrograma] = useState(null);

    // Estado para el modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Estado para el nombre en edición
    const [editNombre, setEditNombre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/programasEstudio', {
                nombre_programa: nombre
            });

            // Si `response.data` contiene el nuevo programa, úsalo para actualizar la lista
            const nuevoPrograma = response.data;

            // Actualizar el listado de programa
            setlistaProgramas([...listaProgramas, nuevoPrograma]);

            // Limpiar los campos del formulario
            setNombre('');
        } catch (error) {
            console.error('Error al registrar el programa', error);
        }
    };


    const handleContextMenu = (e, programaId) => {
        e.preventDefault(); // Prevenir el menú contextual por defecto
        setSelectedPrograma(programaId); // Establecer el programa seleccionado
        setContextMenuPosition({ x: e.clientX, y: e.clientY }); // Obtener la posición del clic
        setShowContextMenu(true); // Mostrar el menú contextual
    };

    const handleDelete = async () => {
       
        try {
            const response = await axios.delete(`/programasEstudio/${selectedPrograma}`);
       
            if (response.status === 200) {
                setlistaProgramas(listaProgramas.filter(programa => programa.id !== selectedPrograma));
                setShowContextMenu(false); // Ocultar el menú contextual
            } else {
                console.error('Error al eliminar el programa', response);
            }
        } catch (error) {
            console.error('Error al eliminar el programa', error);
        }
    };

    const handleCloseContextMenu = () => {
        setShowContextMenu(false); // Cerrar el menú contextual si se hace clic fuera de él
    };

    // Función para abrir el modal de edición y establecer los datos del programa seleccionado
    const openEditModal = (programa) => {
        setEditNombre(programa.nombre_programa);
        setSelectedPrograma(programa.id);
        setIsEditModalOpen(true);
        setShowContextMenu(false);
    };

    // Función para manejar la edición del programa
    const handleEditSubmit = async () => {
        try {
            await axios.put(`/programasEstudio/${selectedPrograma}`, {
                nombre_programa: editNombre,
            });
            setlistaProgramas(listaProgramas.map(programa =>
                programa.id === selectedPrograma ? { ...programa, nombre_programa: editNombre } : programa
            ));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error al modificar el programa', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Programas de Estudio" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Programas de Estudios
            </h2>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <h3 className="text-md font-medium mb-4">Registro de nuevos Programas de Estudios</h3>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Nombre del programa"
                                        className="w-full border p-2 rounded-md"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
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

                            <div>
                                <h3 className="text-md font-medium mb-4">Listado de los Programas de Estudios Resgistrados </h3>
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Nombre del programa de estudio
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {listaProgramas.map((programa) => (
                                            <tr
                                                key={programa.id}
                                                onContextMenu={(e) => handleContextMenu(e, programa.id)} // Detectar clic derecho
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {programa.nombre_programa}
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
                        <h3 className="text-lg font-medium mb-4">Editar Programa</h3>
                        <input
                            type="text"
                            placeholder="Nombre del Programa"
                            className="w-full border p-2 rounded-md"
                            value={editNombre}
                            onChange={(e) => setEditNombre(e.target.value)}
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
                        onClick={() => openEditModal(listaProgramas.find(p => p.id === selectedPrograma))}
                        className="block w-full text-black-600 px-4 py-2 text-sm text-left"
                    >
                        Modificar Programa
                    </button>
                    <button
                        onClick={handleDelete}
                        className="block w-full text-red-600 px-4 py-2 text-sm text-left"
                    >
                        Eliminar Programa
                    </button>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
