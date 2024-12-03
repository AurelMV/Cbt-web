import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

// Componente del formulario
const CicloForm = ({ onSubmit, nombre, setNombre, fechaInicio, setFechaInicio, fechaFin, setFechaFin, estado, setEstado, errors, setErrors }) => {
    const validateDates = (start, end) => {
        if (!start || !end) return;
        
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        if (endDate < startDate) {
            setErrors({...errors, fecha_fin: 'La fecha final no puede ser anterior a la fecha de inicio'});
            return false;
        }
        
        // Calculate difference in months
        const diffTime = endDate - startDate;
        const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
        
        if (diffMonths < 3) {
            setErrors({...errors, fecha_fin: 'El ciclo debe tener una duración mínima de 3 meses'});
            return false;
        }
        
        setErrors({});
        return true;
    };

    const handleFechaInicioChange = (e) => {
        const startDate = e.target.value;
        setFechaInicio(startDate);

        // Calcular la fecha de finalización (3 meses después)
        if (startDate) {
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 3);
            
            // Formatear la fecha al formato YYYY-MM-DD
            const formattedEndDate = endDate.toISOString().split('T')[0];
            setFechaFin(formattedEndDate);
        }
    };

    return (
        <div className="transition-all duration-300 ease-in-out">
            <h3 className="text-md font-medium mb-4 text-blue-900">Datos del Ciclo</h3>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-800"
                    >nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del Ciclo"
                        className="w-full border p-2 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <label
                    htmlFor="finico"
                    className="block text-sm font-medium text-gray-800"
                >Fecha de inicio</label>
                <input
                    id="finico"
                    type="date"
                    placeholder="Fecha de Inicio"
                    className="w-full border p-2 rounded-md"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    required
                />
                <label
                    htmlFor="ffinal"
                    className="block text-sm font-medium text-gray-800"
                >Fecha de finalización</label>
                <input
                    id='ffinal'
                    type="date"
                    placeholder="Fecha de Finalización"
                    className={`w-full border p-2 rounded-md ${errors.fecha_fin ? 'border-red-500' : ''}`}
                    value={fechaFin}
                    onChange={(e) => {
                        setFechaFin(e.target.value);
                        validateDates(fechaInicio, e.target.value);
                    }}
                    required
                />
                {errors.fecha_fin && (
                    <p className="text-red-500 text-sm mt-1">{errors.fecha_fin}</p>
                )}
                <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-gray-800"
                >Estado</label>
                <select
                    id="estado"
                    className="w-full border p-2 rounded-md"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                >
                    <option value="En curso">En curso</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
                <div className="space-x-2">
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 focus:outline-none"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

// Modificar el componente CiclosTable para mostrar mensaje cuando no hay registros
const CiclosTable = ({ ciclos, onEdit, isExpanded }) => (
    <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'h-[calc(100vh-300px)]' : 'h-[500px]'}`}>
        <div className="overflow-auto h-full">
            {ciclos.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No hay ciclos registrados
                </div>
            ) : (
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
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Estado
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {ciclos.map((ciclo) => (
                            <tr key={ciclo.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {ciclo.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ciclo.fecha_inicio}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ciclo.fecha_fin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ciclo.estado}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => onEdit(ciclo)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
);

export default function Ciclos({ ciclos: initialCiclos }) {
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('En curso');
    const [listaCiclos, setListaCiclos] = useState(initialCiclos);

    const [selectedCiclo, setSelectedCiclo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editNombre, setEditNombre] = useState('');
    const [editFechaInicio, setEditFechaInicio] = useState('');
    const [editFechaFin, setEditFechaFin] = useState('');
    const [editEstado, setEditEstado] = useState('En curso');

    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Cambiar a 8 items por página

    const [errors, setErrors] = useState({});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = isExpanded 
        ? listaCiclos.slice(indexOfFirstItem, indexOfLastItem)
        : listaCiclos;
    
    // Agregar función para manejo de paginación
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Calcular total de páginas
    const totalPages = Math.ceil(listaCiclos.length / itemsPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/ciclos', {
                nombre,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                estado
            });

            const nuevoCiclo = response.data;
            setListaCiclos([...listaCiclos, nuevoCiclo]);
            setNombre('');
            setFechaInicio('');
            setFechaFin('');
            setEstado('En curso');
            setErrors({});
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
            console.error('Error al registrar el ciclo', error);
        }
    };

    const openEditModal = (ciclo) => {
        setEditNombre(ciclo.nombre);
        setEditFechaInicio(ciclo.fecha_inicio);
        setEditFechaFin(ciclo.fecha_fin);
        setEditEstado(ciclo.estado);
        setSelectedCiclo(ciclo.id);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`/ciclos/${selectedCiclo}`, {
                nombre: editNombre,
                fecha_inicio: editFechaInicio,
                fecha_fin: editFechaFin,
                estado: editEstado
            });
            setListaCiclos(listaCiclos.map(ciclo =>
                ciclo.id === selectedCiclo ? { ...ciclo, nombre: editNombre, fecha_inicio: editFechaInicio, fecha_fin: editFechaFin, estado: editEstado } : ciclo
            ));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error al modificar el ciclo', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ciclos" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 border border-gray-300">
                        <div className="flex justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-black">CICLOS</h2>
                                <p className='text-gray-400'>Registre periodos de tiempo por el cual los estudiantes asistirán a clases</p>
                            </div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                            </button>
                        </div>

                        <div className={`grid ${isExpanded ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
                            {!isExpanded && (
                                <CicloForm
                                    onSubmit={handleSubmit}
                                    nombre={nombre}
                                    setNombre={setNombre}
                                    fechaInicio={fechaInicio}
                                    setFechaInicio={setFechaInicio}
                                    fechaFin={fechaFin}
                                    setFechaFin={setFechaFin}
                                    estado={estado}
                                    setEstado={setEstado}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            )}

                            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'col-span-1' : ''}`}>
                                <CiclosTable
                                    ciclos={currentItems}
                                    onEdit={openEditModal}
                                    isExpanded={isExpanded}
                                />

                                {isExpanded && listaCiclos.length > itemsPerPage && (
                                    <div className="mt-4 flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            Anterior
                                        </button>
                                        
                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNumber = index + 1;
                                            // Mostrar siempre primera y última página, y 3 páginas alrededor de la página actual
                                            if (
                                                pageNumber === 1 ||
                                                pageNumber === totalPages ||
                                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => paginate(pageNumber)}
                                                        className={`px-3 py-1 rounded ${
                                                            currentPage === pageNumber
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-200 hover:bg-gray-300'
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            } else if (
                                                pageNumber === currentPage - 2 ||
                                                pageNumber === currentPage + 2
                                            ) {
                                                return <span key={index}>...</span>;
                                            }
                                            return null;
                                        })}
                                        
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <select
                            className="w-full border p-2 rounded-md mt-2"
                            value={editEstado}
                            onChange={(e) => setEditEstado(e.target.value)}
                            required
                        >
                            <option value="En curso">En curso</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
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
        </AuthenticatedLayout>
    );
}
