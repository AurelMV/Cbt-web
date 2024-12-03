import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-6 sm:pt-0">
     
            <div className="absolute inset-0 bg-cover bg-center bg-white" ></div>
            
            <div className="relative flex w-full max-w-2xl overflow-hidden bg-white shadow-xl rounded-lg border border-gray-300 ">
            <div className="w-1/2 flex justify-center items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobihibzhFqBDgNuVyobCV6f5e7GHLkgT4Vw&s" width="300" height="300" alt="Descripción de la imagen"  />
            </div>
                <div className="w-1/2 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
    
}
