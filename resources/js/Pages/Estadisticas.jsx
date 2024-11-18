import DiagramaBarras from '@/Components/Diagrama2';
import DiagraPastel from '@/Components/Diagrama3';
import EnrollmentAnalysis from '@/Components/DiagramaCiclos';
import Mapa from '@/Components/diagramaMapa';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Estadistias() {
    return (
        <AuthenticatedLayout>
            <Head title="Estudiantes" />
            
            <h2 className="text-xl font-semibold leading-tight text-black">
                GRAFICOS
            </h2>
            <p className="leading-tight text-gray-400">Vea algunos graficos y estadisticas de como esta llendo el cbt</p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border border-gray-200  overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Análisis de Inscripciones por Ciclo</h3>
                            <EnrollmentAnalysis />
                        </div>
                        <div className="border border-gray-200 overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Diagrama de Barras</h3>
                            <DiagramaBarras />
                        </div>
                        <div className="border border-gray-200 overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Diagrama de Pastel</h3>
                            <DiagraPastel />
                        </div>
                    </div>

 
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  
                        <div className="border border-gray-200 col-span-3 overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Mapa de Distritos</h3>
                            <Mapa />
                        </div>

      
                        <div className='overflow-hidden bg-white shadow-xl sm:rounded-lg'>
                        <div className="m-2 flex flex-col space-y-4 mt-8 ">
                            <div className="border border-gray-200 overflow-hidden p-4 shadow-xl sm:rounded-lg">
                                <h4 className="text-md font-semibold mb-2 text-blue-900">Top 1: Departamento A</h4>
                                <p>Descripción de las inscripciones</p>
                                <p>Descripción de las inscripciones</p>

                            </div>
                            <div className="border border-gray-200 overflow-hidden p-4 shadow-xl sm:rounded-lg">
                                <h4 className="text-md font-semibold mb-2 text-blue-900">Top 2: Departamento B</h4>
                                <p>Descripción de las inscripciones</p>
                                <p>Descripción de las inscripciones</p>
                            </div>
                            <div className="border border-gray-200 overflow-hidden p-4 shadow-xl sm:rounded-lg">
                                <h4 className="text-md font-semibold mb-2 text-blue-900">Top 3: Departamento C</h4>
                                <p>Descripción de las inscripciones</p>
                                <p>Descripción de las inscripciones</p>
                            </div>
                        </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
