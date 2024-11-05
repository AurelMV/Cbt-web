import React from 'react';
//import { InertiaLink } from '@inertiajs/inertia-react';
//<InertiaLink href={route('ciclos.create')}>Registrar Nuevo Ciclo</InertiaLink>
export default function Index({ ciclos }) {
    return (
        <div>
            <h1>Lista de Ciclos de Inscripción</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {ciclos.map((ciclo) => (
                        <tr key={ciclo.id}>
                            <td>{ciclo.nombre}</td>
                            <td>{ciclo.fecha_inicio}</td>
                            <td>{ciclo.fecha_fin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/ciclos/create">Registrar Nuevo Ciclo</a>
        </div>
    );
}
