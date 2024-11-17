import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react'; // Solo importa una vez
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';

export default function Estudiantes() {

    const { estudiantes } = usePage().props;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);

    // Función para mostrar el modal y cargar los datos del estudiante
    const handleEditClick = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setModalVisible(true);
    };

    // Función para manejar el cambio de datos en el formulario
    const handleChange = (e) => {
        setSelectedEstudiante({
            ...selectedEstudiante,
            [e.target.name]: e.target.value,
        });
    };


    const closeModal = () => {
        Inertia.reload(); 
      };

    // Función para enviar el formulario de actualización
    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.put(`/estudiantes/${selectedEstudiante.id}`, selectedEstudiante, {
            onSuccess: () => {
                setModalVisible(false); // Cerrar el modal después de actualizar
                // Si deseas actualizar la lista sin recargar la página, puedes usar:
                // Inertia.visit('/ruta-de-los-estudiantes', { method: 'get' }); 
                // o redirigir al listado
                Inertia.visit('/estudiantes.index'); // Redirige a la página de estudiantes
            },
            onError: () => {
                console.error('Error al actualizar el estudiante');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div>
                <h2 className="text-xl font-semibold text-black">GESTION DE ESTUDIANTES</h2>
                <p className="leading-tight text-gray-400">Administra a los estudiantes que se han inscrito</p>
                <div>
                    {/*tmr x q no hay los otros div xd....aqui dentro tenia que ir con sus propiedades pex */}
                </div>
                {/* Tabla de estudiantes */}
              
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Paterno</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Materno</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante) => (
                            <tr key={estudiante.id}>
                                <td className="px-6 py-4 text-sm text-gray-900">{estudiante.nombres}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{estudiante.aPaterno}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{estudiante.aMaterno}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEditClick(estudiante)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para editar estudiante */}
                {modalVisible && selectedEstudiante && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                            <h3 className="text-xl mb-4">Editar Estudiante</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="nombres"
                                    value={selectedEstudiante.nombres}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="aPaterno"
                                    value={selectedEstudiante.aPaterno}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="aMaterno"
                                    value={selectedEstudiante.aMaterno}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <select
                                    name="sexo"
                                    value={selectedEstudiante.sexo}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                >
                                    <option value="">Selecciona el sexo</option>
                                    <option value="m">Masculino</option>
                                    <option value="f">Femenino</option>
                                </select>
                                <input
                                    type="text"
                                    name="Nrodocumento"
                                    value={selectedEstudiante.Nrodocumento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="celularestudiante"
                                    value={selectedEstudiante.celularestudiante}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="celularapoderado"
                                    value={selectedEstudiante.celularapoderado}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={selectedEstudiante.fechaNacimiento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedEstudiante.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="anoculminado"
                                    value={selectedEstudiante.anoculminado}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="idcolegios"
                                    value={selectedEstudiante.idcolegios}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <select
                                    name="tipodocumento"
                                    value={selectedEstudiante.tipodocumento}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={selectedEstudiante.direccion}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md mb-4"
                                    required
                                />
                                <button
                                  href={route('estudiantes.index')}
                                    type="submit"
                                    className="w-full inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500"
                                    
                                >
                                    Modificar Estudiante
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

