import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

const images = [
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.55-AM-1024x768.jpeg",
    alt: "Primera Imagen",
    caption: "Descripción de la primera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.54-AM-1024x768.jpeg",
    alt: "Segunda Imagen",
    caption: "Descripción de la segunda imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-30-at-11.53.03-AM-2.jpeg",
    alt: "Tercera Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-30-at-11.53.03-AM-3-1024x768.jpeg",
    alt: "Cuarta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.54-AM-2-1024x768.jpeg",
    alt: "Quinta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-30-at-11.53.03-AM-1-1024x768.jpeg",
    alt: "Sexta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-30-at-12.07.33-PM-1024x768.jpeg",
    alt: "Septima Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.55-AM-1-1024x768.jpeg",
    alt: "Octaba Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.55-AM-1-1024x768.jpeg",
    alt: "Novena Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://iesta.edu.pe/portal/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-01-at-9.44.55-AM-1-1024x768.jpeg",
    alt: "Decima Imagen",
    caption: "Descripción de la tercera imagen."
  }
];

const Inicio = ({ auth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="bg-red-100 min-h-screen">
      {/* Barra de Navegación */}
      <nav className="bg-red-900 shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="CBT.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">CBT</h1>
        </div>
        <ul className="flex space-x-4 text-white">
          <li><a href="#home" className="hover:text-yellow-500">Inicio</a></li>
          <li><a href="#features" className="hover:text-yellow-500">Información</a></li>
          <li><a href="#pricing" className="hover:text-yellow-500">Nosotros</a></li>
        </ul>
        <div className="flex space-x-4">
          {auth && auth.user ? (
            <Link href={route('dashboard')} className="text-gray-800 hover:text-gray-600 transition">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href={route('login')} className="text-white hover:text-yellow-500 transition">
                Log in
              </Link>
              <Link href={route('register')} className="text-white hover:text-yellow-500 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

    {/* Carrusel */}
<div className="carousel relative w-full max-w-3xl mx-auto mt-8">
  <div className="relative w-full h-96 overflow-hidden rounded-lg flex items-center justify-center">
    
    {/* Imagen anterior borrosa */}
    <img
      src={images[(currentIndex - 1 + images.length) % images.length].src}
      alt={images[(currentIndex - 1 + images.length) % images.length].alt}
      className="absolute left-0 w-1/3 h-full object-cover opacity-50 blur-sm transform -translate-x-1/2"
    />

    {/* Imagen actual */}
    <img
      src={images[currentIndex].src}
      alt={images[currentIndex].alt}
      className="w-1/2 h-full object-contain rounded-lg"
    />

    {/* Imagen siguiente borrosa */}
    <img
      src={images[(currentIndex + 1) % images.length].src}
      alt={images[(currentIndex + 1) % images.length].alt}
      className="absolute right-0 w-1/3 h-full object-cover opacity-50 blur-sm transform translate-x-1/2"
    />

    {/* Título y subtítulo de la imagen actual */}
    <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-50 text-white p-2 rounded">
      <h3 className="font-bold">{images[currentIndex].alt}</h3>
      <p>{images[currentIndex].caption}</p>
    </div>
  </div>

  {/* Botón de retroceso */}
  <button
    onClick={goToPrevious}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 bg-opacity-50 rounded-full text-white focus:outline-none"
    aria-label="Previous"
  >
    ❮
  </button>

  {/* Botón de avance */}
  <button
    onClick={goToNext}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 bg-opacity-50 rounded-full text-white focus:outline-none"
    aria-label="Next"
  >
    ❯
  </button>
</div>



      {/* Enlaces con íconos */}
      <div className="container mx-auto mt-8 flex justify-around items-center space-x-4">
        <a href="https://laravelnews.com" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l4.5-4.5M15 9l-4.5 4.5M15 9l-4.5 4.5" />
          </svg>
          <h3 className="text-lg font-semibold">Laravel News</h3>
        </a>
        <a href="https://laravel.com/docs" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l4.5-4.5M15 9l-4.5 4.5M15 9l-4.5 4.5" />
          </svg>
          <h3 className="text-lg font-semibold">Laravel Documentation</h3>
        </a>
      </div>

      {/* Marcadores de Posición */}
      <div className="container mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Marcadores de Posición</h2>
        <p>Este es un ejemplo de marcadores de posición en la página.</p>
      </div>
    </div>
  );
};

export default Inicio;
