import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit({ estudiantes }) {
    return (
        <AuthenticatedLayout>
            <Head title="Estudiantes" />

            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Gestión de Estudiantes Inscritos
            </h2>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-6"></div>
                            <div className="grid grid-cols-5 gap-8">
                                <div className="col-span-1">
                                    <h3 className="text-md font-medium mb-4">Formulario de Estudiante</h3>

                                    <form className="space-y-4">
                                    <input type="text" placeholder="Nombre" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Apellido Paterno" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Apellido Materno" className="w-full border p-2 rounded-md" required />
                                        <select className="w-full border p-2 rounded-md" required>
                                            <option value="">Sexo</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                        </select>
                                        <input type="text" placeholder="DNI" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Número de Celular" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Número de Apoderado" className="w-full border p-2 rounded-md" required />
                                        <input type="date" placeholder="Fecha de Nacimiento" className="w-full border p-2 rounded-md" required />
                                        <input type="email" placeholder="Email" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Último Año Cursado" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Colegio de Procedencia" className="w-full border p-2 rounded-md" required />
                                        <select className="w-full border p-2 rounded-md" required>
                                            <option value="">Tipo de Documento</option>
                                            <option value="DNI">DNI</option>
                                            <option value="PASAPORTE">PASAPORTE</option>
                                        </select>
                                        <input type="text" placeholder="Dirección" className="w-full border p-2 rounded-md" required />
                                        <button type="submit" className="w-full inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500">
                                            Modificar Estudiante
                                        </button>
                                    </form>
                                   




                                </div>

                                <div className="col-span-4">
                                    <h3 className="text-md font-medium mb-4">Lista de Estudiantes</h3>
                                    <table className="min-w-full divide-y divide-gray-200 border">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Paterno</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Materno</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Sexo</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Celular</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Celular Apoderado</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nacimiento</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {estudiantes.map((estudiante) => (
                                                <tr key={estudiante.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.nombres}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.aPaterno}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.aMaterno}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.sexo}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.celularestudiante}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.celularapoderado}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{estudiante.fechaNacimiento}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
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
            </div>
        </AuthenticatedLayout>
    );
}
