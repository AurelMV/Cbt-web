import { useState } from 'react';
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Reportes() {
    const { ciclos } =
        usePage().props;
    const [Data, setData] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [programa, setprograma] = useState([]);
    const [ciclo, setciclo] = useState([]);
    const [tipo, settipo] = useState([]);

    const handleBusqudaProgroma = async (event) => {
        setData([]);
        settipo([]);
        const id = event.target.value;
        const idciclo = ciclo;
        try {
            const response = await axios.get(`/grupos/DATAPrograma/${idciclo}/${id}`);
            console.log(response);
            setData(response.data);
            settipo('programa');
        } catch (error) {
            console.error("Error al cargar los grupos:", error);
        }
    }
    const handleBusqudaGrupo = async (event) => {
        setData([]);
        settipo([]);
        const id = event.target.value;
        const idciclo = ciclo;
        try {
            const response = await axios.get(`/grupos/DATAGrupo/${idciclo}/${id}`);
            console.log(response);
            setData(response.data);
            settipo('grupo');
        } catch (error) {
            console.error("Error al cargar los grupos:", error);
        }
    }

    const handleBusqudaCiclo = async (event) => {
        const id = event.target.value;
        setData([]);
        setciclo(id);
        settipo([]);

        try {
            const response = await axios.get(`/grupos/ciclo/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error al cargar los grupos:", error);
        }
        try {
            const response1 = await axios.get(`/grupos/grupo/${id}`);
            setGrupo(response1.data);
        } catch (error) {
            console.error("Error al cargar los grupos:", error);
        }
        try {
            setprograma([]);
            const response2 = await axios.get(`/grupos/Programa`);
            setprograma(response2.data);
        } catch (error) {
            console.error("Error al cargar los grupos:", error);
        }
    }

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const programaUnicos = [...new Set(Data.map((dato) => dato.programa_estudio.id))];
        const gruposUnicos = [...new Set(Data.map((dato) => dato.grupo.id))];

        if (gruposUnicos.length === 1 && tipo === 'grupo') {
            doc.text('Reporte de Inscripciones', 20, 20);
            const grupoId = gruposUnicos[0];
            const datosGrupo = Data.filter((dato) => dato.grupo.id === grupoId);

            doc.text(`Grupo: ${datosGrupo[0]?.grupo.nombre}`, 20, 40);

            doc.autoTable({
                startY: 50, 
                head: [['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Estado de Pago', 'Programa de Estudio', 'Ciclo']],
                body: datosGrupo.map((dato) => [
                    dato.estudiante.nombres,
                    dato.estudiante.aPaterno,
                    dato.estudiante.aMaterno,
                    dato.estadoPago,
                    dato.programa_estudio.nombre_programa,
                    dato.ciclo.nombre
                ]),
            });
        }

        if (gruposUnicos.length > 1) {
            doc.text('Reporte de Inscripciones', 20, 20); 

            gruposUnicos.forEach((grupoId, index) => {
                const datosGrupo = Data.filter((dato) => dato.grupo.id === grupoId);

                doc.text(`Grupo: ${datosGrupo[0]?.grupo.nombre}`, 20, 40 + index * 50); 

                doc.autoTable({
                    startY: 50 + index * 50, 
                    head: [['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Estado de Pago', 'Programa de Estudio', 'Ciclo']],
                    body: datosGrupo.map((dato) => [
                        dato.estudiante.nombres,
                        dato.estudiante.aPaterno,
                        dato.estudiante.aMaterno,
                        dato.estadoPago,
                        dato.programa_estudio.nombre_programa,
                        dato.ciclo.nombre
                    ]),
                });
            });
        }

        if (programaUnicos.length === 1 && tipo === 'programa') {
            const programaId = programaUnicos[0];
            const datosPrograma = Data.filter((dato) => dato.programa_estudio.id === programaId);

            doc.text(`Reporte de Inscripciones: ${datosPrograma[0]?.ciclo.nombre}`, 20, 20);
            doc.text(`Programa: ${datosPrograma[0]?.programa_estudio.nombre_programa}`, 20, 30);

            doc.autoTable({
                startY: 40, 
                head: [['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Estado de Pago', 'Grupo', 'Ciclo']],
                body: datosPrograma.map((dato) => [
                    dato.estudiante.nombres,
                    dato.estudiante.aPaterno,
                    dato.estudiante.aMaterno,
                    dato.estadoPago,
                    dato.programa_estudio.nombre_programa,
                    dato.ciclo.nombre
                ]),
            });
        }

        doc.save('reporte_estudiantes.pdf');
    };
    console.log(tipo);
    return (
        <AuthenticatedLayout>
            <Head title="Reportes" />
            <h2 className="text-xl font-semibold leading-tight text-black">
                REPORTES
            </h2>
            <p className="leading-tight text-gray-400">Realize y descargue un reporte de inscritos por ciclos y programas de estudio</p>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-300">
                        <div className="p-6 text-gray-900">
                            <div>
                                <h3 className="text-md font-semibold mb-4 text-blue-900">
                                    Filtrar por:
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="md:w-1/3">
                                        <label htmlFor="ciclo" className="block text-sm font-medium text-gray-700">
                                            Ciclo <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            className="mt-1 block w-3/4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={handleBusqudaCiclo}
                                            required
                                        >
                                            <option value="" selected disabled>
                                                Seleccione un Ciclo
                                            </option>
                                            {ciclos.map((ciclo) => (
                                                <option value={ciclo.id} key={ciclo.id}>
                                                    {ciclo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="hidden md:block w-1 md:mx-4 border-l border-gray-300"></div>
                                    <div className="md:w-1/4">
                                        <label htmlFor="grupo" className="block text-sm font-medium text-gray-700">
                                            Grupos (opcional)
                                        </label>
                                        <select
                                            className="mt-1 block w-3/4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={handleBusqudaGrupo}
                                        >
                                            <option value="" selected >
                                                Seleccione (opcional)
                                            </option>
                                            {grupo.map((grupo) => (
                                                <option value={grupo.id} key={grupo.id}>
                                                    {grupo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:w-1/3">
                                        <label htmlFor="programaE" className="block text-sm font-medium text-gray-700">
                                            Programa de Estudio (opcional)
                                        </label>
                                        <select
                                            className="mt-1 block w-3/4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={handleBusqudaProgroma}
                                        >
                                            <option value="" selected>
                                                Seleccione (opcional)
                                            </option>
                                            {programa.map((progra) => (
                                                <option value={progra.id} key={progra.id}>
                                                    {progra.nombre_programa}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleExportPDF}
                                className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Imprimir PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
