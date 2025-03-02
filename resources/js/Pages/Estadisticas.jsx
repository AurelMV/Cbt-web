import DiagramaBarras from '@/Components/Diagrama2';
import DiagraPastel from '@/Components/Diagrama3';
import EnrollmentAnalysis from '@/Components/DiagramaCiclos';
import Mapa from '@/Components/diagramaMapa';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Estadisticas() {
    return (
        <AuthenticatedLayout>
            <Head title="Estudiantes" />
            
            <h2 className="text-xl font-semibold leading-tight text-black">
                GRÁFICOS
            </h2>
            <p className="leading-tight text-gray-400">Vea algunos gráficos y estadísticas de como está yendo el CBT</p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    <div className="grid grid-cols-1 gap-8">
                        <div className="border border-gray-200  overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Análisis de Inscripciones por Ciclo</h3>
                            <EnrollmentAnalysis />
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        <div className="border border-gray-200 overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Diagrama de Barras</h3>
                            <DiagramaBarras />
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        <div className="border border-gray-200 col-span-1 overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Diagrama de Pastel</h3>
                            <DiagraPastel />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
