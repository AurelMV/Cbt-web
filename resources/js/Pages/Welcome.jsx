import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react'; 
import '../../css/Welcome.css';

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
    <div>
      {/* Barra de Navegación */}
      <nav className="navbar">
        <img src="CBT.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-brand">CBT</h1>
        <ul className="navbar-nav">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#features">Información</a></li>
          <li><a href="#pricing">Estadísticas</a></li>
        </ul>

        {/* Enlaces de autenticación */}
        <div className="auth-links flex justify-end">
          {auth && auth.user ? (
            <Link
              href={route('dashboard')}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Log in
              </Link>
              <Link
                href={route('register')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Carrusel */}
      <div className="carousel">
        <div className="carousel-item active">
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
          <div className="carousel-caption">
            <h3>{images[currentIndex].alt}</h3>
            <p>{images[currentIndex].caption}</p>
          </div>
        </div>
        <button className="carousel-control prev" onClick={goToPrevious}>❮</button>
        <button className="carousel-control next" onClick={goToNext}>❯</button>
      </div>

      {/* Enlaces con íconos de Laravel News */}
      <div className="container mt-4 flex justify-between items-center">
        <a href="https://laravelnews.com" className="text-gray-700 hover:text-black transition duration-300">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 stroke-[#FF2D20]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l4.5-4.5M15 9l-4.5 4.5M15 9l-4.5 4.5" />
            </svg>
            <h3 className="text-lg font-semibold">Laravel News</h3>
          </div>
        </a>
        <a href="https://laravel.com/docs" className="text-gray-700 hover:text-black transition duration-300">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 stroke-[#FF2D20]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l4.5-4.5M15 9l-4.5 4.5M15 9l-4.5 4.5" />
            </svg>
            <h3 className="text-lg font-semibold">Laravel Documentation</h3>
          </div>
        </a>
      </div>

      {/* Marcadores de Posición */}
      <div className="container mt-4">
        <h2>Marcadores de Posición</h2>
        <p>Este es un ejemplo de marcadores de posición en la página.</p>
      </div>
    </div>
  );
};

export default Inicio;
