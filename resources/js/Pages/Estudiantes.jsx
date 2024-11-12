import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Edit({ mustVerifyEmail, status }) {

    return (
        <AuthenticatedLayout
        >
            <Head title="Estudiantes" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Gestión de Estudiantes Inscritos
            </h2>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <div className='grid grid-cols-6'></div>
                            <div className="grid grid-cols-5 gap-8">
                                <div className='col-span-1'>
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

           
                                <div className='col-span-4'>
                                    <h3 className="text-md font-medium mb-4">Foto del Estudiante</h3>
                                    <div className="mb-4">
                                        <img src="https://i.pinimg.com/originals/90/b2/6a/90b26ac18df70f2e8eaa45627fb4aa47.jpg" alt="Foto del Estudiante" className="w-52 h-52 object-cover rounded-md" />
                                    </div>
                                    <h3 className="text-md font-medium mb-4">Lista de Estudiantes</h3>
                                    <table className="min-w-full divide-y divide-gray-200 border">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Paterno</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Apellido Materno</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Sexo</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Celular</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Celular_Apoderado</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nacimiento</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
 
                                            <tr>
                                                <td className="px-6 py-4 text-sm text-gray-900">Royer</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">Quispe</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">Delgado</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">Todos los dias... (...La vida me coge) </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">xiaomi 9 </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">calidad-precio papa</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">si</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                                                </td>
                                            </tr>
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
