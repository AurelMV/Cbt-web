import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-6 sm:pt-0">
     
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/vector-premium/imagenes-fondo-lineal-hd-1080p-descargar-gratis-hd_822642-403.jpg)' }}></div>
            
 
            <div className="relative flex w-full max-w-2xl overflow-hidden bg-white shadow-lg rounded-lg">
                <div className="w-full p-6">
                    {children}
                </div>
            </div>
        </div>
    );
    
}
