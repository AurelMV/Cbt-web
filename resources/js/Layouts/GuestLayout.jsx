import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-6 sm:pt-0">
            <div className="flex w-full max-w-4xl overflow-hidden bg-white shadow-md sm:rounded-lg">
                
                {/* Contenedor de la imagen */}
                <div className="hidden w-1/2 bg-cover bg-center sm:block" style={{ backgroundImage: 'url(imagen pe :v)' }}>
                </div>
                
                {/* Contenedor del formulario */}
                <div className="w-full p-6 sm:w-1/2">
                    {children}
                </div>
                
            </div>
        </div>
    );
}
