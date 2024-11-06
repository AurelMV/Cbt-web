import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-gray-800">
                Inscripción Estudiantes
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
                                    <input type="text" placeholder="Sexo" className="col-span-1 border p-2 rounded-md" required />
                                    <input type="text" placeholder="Apellido Paterno" className="col-span-1 border p-2 rounded-md" required />
                                    <input type="text" placeholder="Email" className="col-span-1 border p-2 rounded-md" required />
                                    <input type="text" placeholder="Teléfono" className="col-span-1 border p-2 rounded-md" required />
                                    <h1>Fecha de Nacimiento</h1> 
                                    <input type="text" placeholder="Apellido Materno" className="col-span-1 border p-2 rounded-md" required />                   
                                    <input type="text" placeholder="Teléfono de Apoderado" className="col-span-1 border p-2 rounded-md" required />
                                    <input type="text" placeholder="Dirección" className="col-span-1 border p-2 rounded-md" required />
                                    <input type="date" placeholder="Fecha de Nacimiento" className="col-span-1 border p-2 rounded-md" required />
                                    <button
                                        onClick={openModal}
                                        className="col-span-1 bg-indigo-600 text-white p-2 rounded-md"
                                    >
                                        Seleccionar Colegio
                                    </button>
                                </div>
                            </div>


                            {modalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h3 className="text-lg font-semibold mb-4">Seleccione Ubicación y Colegio</h3>
                                        

                                        <div className="space-y-4">
                                            <select className="w-full border p-2 rounded-md" required>
                                                <option value="" disabled selected>Departamento</option>
                                                <option value="departamento1">Departamento 1</option>
                                                <option value="departamento2">Departamento 2</option>
                                            </select>
                                            <select className="w-full border p-2 rounded-md" required>
                                                <option value="" disabled selected>Provincia</option>
                                                <option value="provincia1">Provincia 1</option>
                                                <option value="provincia2">Provincia 2</option>
                                            </select>
                                            <select className="w-full border p-2 rounded-md" required>
                                                <option value="" disabled selected>Distrito</option>
                                                <option value="distrito1">Distrito 1</option>
                                                <option value="distrito2">Distrito 2</option>
                                            </select>
                                            

                                            <input type="text" placeholder="Buscar Colegio" className="w-full border p-2 rounded-md" />
                                            <div className="h-32 overflow-y-auto border rounded-md p-2">
                                                <p>Colegio 1</p>
                                                <p>Colegio 2</p>
                                                <p>Colegio 3</p>

                                            </div>


                                            <button
                                                className="w-full bg-indigo-600 text-white p-2 rounded-md mt-2"
                                            >
                                                Agregar Colegio
                                            </button>
                                        </div>

                                        <div className="flex justify-end mt-4 space-x-2">
                                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">
                                                Cancelar
                                            </button>
                                            <button onClick={closeModal} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


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
