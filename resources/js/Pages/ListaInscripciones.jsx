import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react'; // Para trabajar con props y navegación
import { Inertia } from '@inertiajs/inertia'; // Solo si usas directamente el objeto Inertia

const ListaInscripciones = () => {
    const { inscripciones } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editingInscripcion, setEditingInscripcion] = useState(null);
    const [opciones, setOpciones] = useState({ ciclos: [], programas: [] });
    const [gruposFiltrados, setGruposFiltrados] = useState([]);

    useEffect(() => {
        if (showModal) {
            fetch('/api/inscripcionesopciones')
                .then((res) => res.json())
                .then((data) => setOpciones(data));
        }
    }, [showModal]);

    const handleEditClick = (inscripcion) => {
        setEditingInscripcion(inscripcion);
        const ciclo = opciones.ciclos.find(c => c.id === inscripcion.idciclo);
        setGruposFiltrados(ciclo ? ciclo.grupos : []);
        setShowModal(true);
    };

    const handleCicloChange = (cicloId) => {
        const ciclo = opciones.ciclos.find(c => c.id === parseInt(cicloId));
        setGruposFiltrados(ciclo ? ciclo.grupos : []);
        setEditingInscripcion(prev => ({
            ...prev,
            idciclo: cicloId,
        }));
    };

    const handleSave = () => {
        Inertia.post(`/inscripciones/${editingInscripcion.id}/update`, {
            ciclo_id: editingInscripcion.idciclo,
            programa_id: editingInscripcion.idprogramaestudios,
            grupo_id: editingInscripcion.idGrupos,
        });
        setShowModal(false);
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gestión de Inscripciones</h2>
            <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Turno</th>
                        <th className="py-3 px-6 text-left">Ciclo</th>
                        <th className="py-3 px-6 text-left">Programa</th>
                        <th className="py-3 px-6 text-left">Grupo</th>
                        <th className="py-3 px-6 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {inscripciones.data.map((inscripcion) => (
                        <tr key={inscripcion.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{inscripcion.id}</td>
                            <td className="py-3 px-6">{inscripcion.turno}</td>
                            <td className="py-3 px-6">{inscripcion.ciclo_inscripcion.nombre}</td>
                            <td className="py-3 px-6">{inscripcion.programa_estudio.nombre_programa}</td>
                            <td className="py-3 px-6">{inscripcion.grupo.nombre}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleEditClick(inscripcion)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && editingInscripcion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Editar Inscripción</h3>
                        <form>
                            <label className="block text-gray-700 font-medium mb-2">Ciclo:</label>
                            <select
                                value={editingInscripcion.idciclo}
                                onChange={(e) => handleCicloChange(e.target.value)}
                                className="w-full mb-4 px-3 py-2 border rounded"
                            >
                                {opciones.ciclos.map((ciclo) => (
                                    <option key={ciclo.id} value={ciclo.id}>
                                        {ciclo.nombre}
                                    </option>
                                ))}
                            </select>
                            <label className="block text-gray-700 font-medium mb-2">Programa:</label>
                            <select
                                value={editingInscripcion.idprogramaestudios}
                                onChange={(e) =>
                                    setEditingInscripcion((prev) => ({
                                        ...prev,
                                        idprogramaestudios: e.target.value,
                                    }))
                                }
                                className="w-full mb-4 px-3 py-2 border rounded"
                            >
                                {opciones.programas.map((programa) => (
                                    <option key={programa.id} value={programa.id}>
                                        {programa.nombre_programa}
                                    </option>
                                ))}
                            </select>
                            <label className="block text-gray-700 font-medium mb-2">Grupo:</label>
                            <select
                                value={editingInscripcion.idGrupos}
                                onChange={(e) =>
                                    setEditingInscripcion((prev) => ({
                                        ...prev,
                                        idGrupos: e.target.value,
                                    }))
                                }
                                className="w-full mb-4 px-3 py-2 border rounded"
                            >
                                {gruposFiltrados.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>
                                        {grupo.nombre}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaInscripciones;
