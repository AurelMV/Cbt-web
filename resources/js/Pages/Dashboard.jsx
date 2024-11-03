import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />
            
                <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                    Incripcion estudiantes 
                </h2>
            
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">Ingrese Datos del Estudiante</h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        <input type="text" placeholder="Nombre" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Tipo de Documento" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="DNI" className="col-span-1 border p-2 rounded-md" required />                            
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="" disabled selected>Departamento</option>
                                            <option value="">Gei el q lo lea</option>
                                        </select>
                                        <input type="text" placeholder="Apellido Paterno" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Sexo" className="col-span-1 border p-2 rounded-md" required />
                                        
                                        <input type="date" placeholder="Fecha de Nacimiento" className="col-span-1 border p-2 rounded-md" required />
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="" disabled selected>Provincia</option>
                                            <option value="">Gei el q siga leendo</option>                   
                                        </select>
                                        <input type="text" placeholder="Apellido Materno" className="col-span-1 border p-2 rounded-md" required /> 
                                        <input type="text" placeholder="Teléfono" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Email" className="col-span-1 border p-2 rounded-md" required />
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="" disabled selected>Distrito</option>
                                            <option value="">Enserio?</option>
                                        </select> 
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="" disabled selected>Nivel de Estudio</option>
                                            <option value="">lic.uadora</option>
                                        </select> 
                                        <input type="text" placeholder="Teléfono de Apoderado" className="col-span-1 border p-2 rounded-md" required />

                                        <input type="text" placeholder="Dirección" className="col-span-1 border p-2 rounded-md" required />
                                                          
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="" disabled selected>colegio</option>
                                            <option value="">uwu?</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">Datos de Pago</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="date" placeholder="Fecha de Pago" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="number" placeholder="Monto de Pago" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Medio de Pago" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Número de Voucher" className="col-span-1 border p-2 rounded-md" required />
                                    </div>
                                </div>


                                <div className="mb-8">
                                    <h3 className="text-md font-medium mb-4">Datos de Inscripción</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="">Seleccione Turno</option>
                                            <option value="mañana">Mañana</option>
                                            <option value="tarde">Tarde</option>
                                        </select>
                                        <input type="date" placeholder="Fecha de Inscripción" className="col-span-1 border p-2 rounded-md" required />
                                        <select className="col-span-1 border p-2 rounded-md" required>
                                            <option value="">Estado de Pago</option>
                                            <option value="pagado">Pagado</option>
                                            <option value="pendiente">Pendiente</option>
                                        </select>
                                        <input type="text" placeholder="Grupo de Estudio" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="text" placeholder="Programa de Estudio" className="col-span-1 border p-2 rounded-md" required />
                                        <input type="file" accept=".png, .jpg, .jpeg" />
                                    </div>
                                </div>

                                <button type="submit" className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                                    Registrar Estudiante
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

        </AuthenticatedLayout>
    );
}
