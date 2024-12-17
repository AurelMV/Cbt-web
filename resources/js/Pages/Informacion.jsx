// resources/js/Pages/Informacion.jsx
import React from 'react';

const Informacion = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-4xl font-bold text-yellow-500 mb-6">Información</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Bienvenido a nuestra sección de información. Aquí encontrarás detalles sobre los servicios que 
                    ofrecemos, nuestro compromiso con la calidad, y cómo podemos ayudarte a alcanzar tus metas y logros.
                </p>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestros Servicios</h2>
                    <ul className="list-none">
                        <li className="mb-2 text-gray-600">
                            <span className="font-medium text-yellow-500">✔</span> Asesoramiento personalizado
                        </li>
                        <li className="mb-2 text-gray-600">
                            <span className="font-medium text-yellow-500">✔</span> Soluciones tecnológicas a medida
                        </li>
                        <li className="mb-2 text-gray-600">
                            <span className="font-medium text-yellow-500">✔</span> Atención al cliente 24/7
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Informacion;
