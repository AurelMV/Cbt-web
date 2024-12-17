import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const images = [
  {
    src: "https://www.istta.edu.pe/img/course/20.10.jpg",
    alt: "Primera Imagen",
    caption: "Descripción de la primera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.1.jpg",
    alt: "Segunda Imagen",
    caption: "Descripción de la segunda imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.8.jpg",
    alt: "Tercera Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.9.jpg",
    alt: "Cuarta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.5.jpg",
    alt: "Quinta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.6.jpg",
    alt: "Sexta Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.7.jpg",
    alt: "Septima Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.3.jpg",
    alt: "Octaba Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.2.jpg",
    alt: "Novena Imagen",
    caption: "Descripción de la tercera imagen."
  },
  {
    src: "https://www.istta.edu.pe/img/course/20.4.jpg",
    alt: "Decima Imagen",
    caption: "Descripción de la tercera imagen."
  }
];

const Inicio = ({ auth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
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
      <nav className="bg-gradient-to-r from-blue-300 to-lime-400 shadow p-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="CBT.png" alt="Logo" className="h-16 w-16" />
          <h1 className="text-xl font-bold text-white" style={{ fontSize: '1.5rem' }}>CBT</h1>
        </div>
        <ul className="ml-10 flex space-x-9 text-white" style={{ fontSize: '1.5rem' }}>
          <li>
            <a
              href="#home"
              className="hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4"
            >
              Información
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4"
            >
              Nosotros
            </a>
          </li>
        </ul>

        <div className="flex space-x-9" style={{ fontSize: '1.5rem' }}>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="text-gray-800 hover:text-gray-600 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('StudentForm.index')}
                className="text-white hover:text-yellow-500 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4 transition"
              >
                Student form 
              </Link>
              <Link
                href={route('login')}
                className="text-white hover:text-yellow-500 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-4 transition"
              >
                Log in
              </Link>
              
            
            </>
          )}
        </div>
      </nav>
      <div className="w-full h-2 bg-gradient-to-r from-black via-gray-800 to-slate-500"></div>
      <div class="relative min-h-screen bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBxdk37q1zD-ItIH6OA6J8kKnSZqfGp4NGgw&s')]">
        <div class="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full shadow-lg translate-x-[-50%]"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full space-y-12">
          <div></div>
          <div class="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-md max-w-3xl">
            <h1 class="text-5xl font-bold text-gray-800">Bienvenido</h1>
            <p class="mt-4 text-gray-600 text-lg">
              Explora, aprende y crece con nosotros. ¡Estamos felices de tenerte aquí!
            </p>
          </div>
          <div class="carousel relative w-full max-w-6xl mx-auto">
            <div class="relative w-full h-[500px] overflow-hidden rounded-lg bg-red-100">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                class="w-full h-full object-cover rounded-lg"
              />
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-50 text-white p-4 rounded text-center">
                <h3 class="font-bold text-lg">{images[currentIndex].alt}</h3>
                <p>{images[currentIndex].caption}</p>
              </div>
            </div>

           
            <button
              onClick={goToPrevious}
              class="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-900 bg-opacity-75 rounded-full text-white focus:outline-none"
              aria-label="Previous"
            >
              ❮
            </button>
            <button
              onClick={goToNext}
              class="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-900 bg-opacity-75 rounded-full text-white focus:outline-none"
              aria-label="Next"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;