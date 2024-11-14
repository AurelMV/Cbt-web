import DiagramaBarras from '@/Components/Diagrama2';
import DiagraPastel from '@/Components/Diagrama3';
import EnrollmentAnalysis from '@/Components/DiagramaCiclos';
import DistrictMap from '@/Components/diagramaMapa';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Estadistias() {
    return (
        <AuthenticatedLayout>
            <Head title="Estudiantes" />
            
            <h2 className="border-b-2 border-gray-400 text-xl font-semibold leading-tight text-yellow-600">
                Gestión de Estudiantes Inscritos
            </h2>
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Fila con tres gráficos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Análisis de Inscripciones por Ciclo</h3>
                            <EnrollmentAnalysis />
                        </div>
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Diagrama de Barras</h3>
                            <DiagramaBarras />
                        </div>
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Diagrama de Pastel</h3>
                            <DiagraPastel />
                        </div>
                    </div>

                    {/* Bloque grande para el mapa */}
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Mapa de Distritos</h3>
                        <DistrictMap />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
