import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

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
          {auth.user ? (
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

      <div class="relative min-h-screen bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobihibzhFqBDgNuVyobCV6f5e7GHLkgT4Vw&s')]">
        <div class="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full shadow-lg translate-x-[-50%]"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full space-y-12">
          !-- Texto principal --
          <div class="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-md max-w-3xl">
            <h1 class="text-5xl font-bold text-gray-800">Bienvenido</h1>
            <p class="mt-4 text-gray-600 text-lg">
              Siempre en lado con el CBT, con el recto cumplimiento de las labores academicas
            </p>
          </div>

          !-- Carrusel agrandado con contenedor adecuado--
          <div class="carousel relative w-full max-w-5xl mx-auto">
            <div class="relative w-full h-[700px] overflow-hidden rounded-lg bg-red-100">
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

            !-- Botones de navegación --
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
        <h2 className="text-2xl font-bold mb-4">CARRERAS IMPLEMENTADAS EN EL"CBT"</h2>
        <p className="mb-4"></p>

        {/* Contenedor dividido en 2 filas, la primera con 5 y la segunda con 5 secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Sección 1 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://admision.istta.edu.pe/img/courses/desinf.jpg" alt="Ejemplo 1" className="w-full h-auto rounded mb-2" />
            <h1 className="font-semibold">Desarrollo de Sistemas de Información</h1>
            <p>Diseña y gestiona soluciones tecnológicas para procesar datos y mejorar la toma de decisiones en diferentes contextos....</p>
          </div>

          {/* Sección 2 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://cbt.istta.edu.pe/assets/images/courses/gt01.png" alt="Ejemplo 2" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Contabilidad</h3>
            <p>Registra y analiza información financiera para planificar, tomar decisiones y garantizar el cumplimiento de obligaciones legales.....</p>
          </div>

          {/* Sección 3 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://cbt.istta.edu.pe/assets/images/courses/ei01.png" alt="Ejemplo 3" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Electrónica Industrial</h3>
            <p>Aplica sistemas electrónicos para automatizar, monitorear y mejorar procesos industriales, aumentando la productividad y reduciendo costos......</p>
          </div>

          {/* Sección 4 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://tepnum.edu.pe/wp-content/uploads/2022/11/ELECTROOOOO-1024x683.jpg" alt="Ejemplo 4" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Electricidad Industrial</h3>
            <p>Diseña, instala y mantiene sistemas eléctricos utilizados en industrias, asegurando su eficiencia, seguridad y cumplimiento de normas técnicas.....</p>
          </div>

          {/* Sección 5 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://iestpmgl.edu.pe/wp-content/uploads/2024/10/g6-1024x678.jpg" alt="Ejemplo 5" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Mecanica de Producion Industrial</h3>
            <p>Optimiza procesos de fabricación mediante el diseño, ensamblaje y mantenimiento de maquinaria y equipos industriales.....</p>
          </div>
        </div>

        {/* Segunda fila con el resto de las secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {/* Sección 6 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://admision.istta.edu.pe/img/courses/hoteleria.jpg" alt="Ejemplo 6" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Administracion de Servicios de Hosteleria y Restaurantes</h3>
            <p>Gestiona recursos y servicios en establecimientos turísticos y gastronómicos, garantizando experiencias de alta calidad para los clientes.....</p>
          </div>

          {/* Sección 7 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://admision.istta.edu.pe/img/courses/mecatronica.jpg" alt="Ejemplo 7" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Mecanica Automatriz</h3>
            <p>Realiza diagnóstico, reparación y mantenimiento de vehículos, utilizando herramientas avanzadas para garantizar su funcionalidad y seguridad...</p>
          </div>

          {/* Sección 8 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://admision.istta.edu.pe/img/courses/laboratorio.jpg" alt="Ejemplo 8" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Laboratorio clínico y anatomía patológica</h3>
            <p>Analiza muestras biológicas para detectar enfermedades y alteraciones en tejidos, apoyando la labor médica con resultados precisos.....</p>
          </div>

          {/* Sección 9 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nrqad6seYNm0N4XrmuZUtG27w7qIRYas_AQoWnk3osZidwXQsT1fijKtBsYFk_5y-R8" alt="Ejemplo 9" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Guia Oficial de Turismo</h3>
            <p>Informa y orienta a los turistas sobre destinos, promoviendo el patrimonio cultural, histórico y natural de manera profesional......</p>
          </div>

          {/* Sección 10 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://admision.istta.edu.pe/img/courses/conta.jpg" alt="Ejemplo 10" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Contabilidad</h3>
            <p>Estudia el comportamiento humano para mejorar la calidad de vida de las personas, aplicando teorías y técnicas psicológicas...</p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Inicio;
