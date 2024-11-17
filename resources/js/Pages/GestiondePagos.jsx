import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function GestionPagos() {
    const [showStudentList, setShowStudentList] = useState(false);

    const handleNewPayment = () => {
        setShowStudentList(true);
    };

    return (
        <AuthenticatedLayout

        >
            <Head title="Gestion de Pagos" />
            <h2 className="text-xl font-semibold leading-tight text-black">
                GESTION DE PAGOS 
            </h2>
            <p className="leading-tight text-gray-400">Mira los pagos hechos por los estudiantes o completa el pago de alguno</p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-300">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-5 gap-8">

                                <div className="col-span-1">
                                    <h3 className="text-md font-medium mb-4 text-blue-900">Formulario de Pago</h3>
                                    <form className="space-y-4">
                                        <input type="text" placeholder="Número de Voucher" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Medio de Pago" className="w-full border p-2 rounded-md" required />
                                        <input type="number" placeholder="Monto" className="w-full border p-2 rounded-md" required />
                                        <input type="date" placeholder="Fecha de Pago" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Nombre del Estudiante" className="w-full border p-2 rounded-md" required />
                                        <input type="text" placeholder="Apellido del Estudiante" className="w-full border p-2 rounded-md" required />
                                        <div className="flex space-x-2">
                                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Editar Pago</button>
                                           
                                        </div>
                                        <div>
                                        <button type="button" onClick={handleNewPayment} className="bg-green-600 text-white px-4 py-2 rounded-md">Generar Nuevo Pago</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-span-4">

                                    <div className="mb-8">
                                        <h3 className="text-md font-medium mb-4 text-blue-900">Lista de Pagos</h3>
                                        <input type="text" placeholder="Buscar pago" className=" border p-2 rounded-md mb-4" />
                                        <table className="min-w-full border divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Id</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Fecha</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Monto</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Medio de Pago</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">N° Voucher</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">fecha inscrita</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                    
                                                <tr>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">asdasd</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {showStudentList && (
                                        <div>
                                            <h3 className="text-md font-medium mb-4 text-blue-900">Lista de Estudiantes Inscritos</h3>
                                            <input type="text" placeholder="Buscar pago" className=" border p-2 rounded-md mb-4" />
                                            <table className="min-w-full border divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nombre</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Apellido Paterno</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Apellido Materno</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Fecha</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Monto</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Estado de Pago</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                        
                                                    <tr>
                                                        <td className="px-4 py-2 text-sm text-gray-900">Juan</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">Pérez</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">García</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">01/11/2024</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">$200</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">Pendiente</td>
                                                        <td className="px-4 py-2 text-sm">
                                                            <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-400 transition duration-150">
                                                                Editar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
