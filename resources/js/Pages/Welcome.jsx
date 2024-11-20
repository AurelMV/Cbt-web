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
      <div className="carousel relative w-full max-w-4xl mx-auto mt-8">
        <div className="relative w-full h-[150 px] overflow-hidden rounded-lg">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-50 text-white p-2 rounded">
            <h3 className="font-bold">{images[currentIndex].alt}</h3>
            <p>{images[currentIndex].caption}</p>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-red-900 bg-opacity-50 rounded-full text-white focus:outline-none"
          aria-label="Previous"
        >
          ❮
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-red-900 bg-opacity-50 rounded-full text-white focus:outline-none"
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
        <h2 className="text-2xl font-bold mb-4">Carreras con amplia competencia a nivel regional</h2>
        <p className="mb-4">Estudiantes con un proyecto de vida, que desean superarse en la vida, tienen varias opciones de escoger la carrera que les gusta</p>

        {/* Contenedor dividido en 2 filas, la primera con 5 y la segunda con 5 secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Sección 1 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://iesvonbraun.edu.pe/wp-content/uploads/2023/06/VB-SISTEMAS-8.jpg" alt="Ejemplo 1" className="w-full h-auto rounded mb-2" />
            <h1 className="font-semibold">Desarrollo de Sistemas de Información</h1>
            <p>La carrera de Desarrollo de Sistemas de Información se enfoca en crear y 
              gestionar soluciones tecnológicas para mejorar el manejo de datos y optimizar 
              procesos en las organizaciones.</p>
          </div>

          {/* Sección 2 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://cbt.istta.edu.pe/assets/images/courses/gt01.png" alt="Ejemplo 2" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Contabilidad</h3>
            <p>La carrera de Contabilidad se centra en el registro, análisis y gestión de la información financiera de
              una organización, asegurando que se cumplan las normativas fiscales y proporcionando datos clave
              para la toma de decisiones empresariales.</p>
          </div>

          {/* Sección 3 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://cbt.istta.edu.pe/assets/images/courses/ei01.png" alt="Ejemplo 3" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Electrónica Industrial</h3>
            <p>La carrera de Electrónica Industrial se enfoca en el diseño, desarrollo y mantenimiento de sistemas electrónicos 
              aplicados a la automatización y control de procesos industriales, buscando mejorar la 
              eficiencia, productividad y seguridad en el ámbito industrial.</p>
          </div>

          {/* Sección 4 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://tepnum.edu.pe/wp-content/uploads/2022/11/ELECTROOOOO-1024x683.jpg" alt="Ejemplo 4" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Electricidad Industrial</h3>
            <p>Electricidad Industrial: Se centra en el diseño, instalación y mantenimiento de sistemas eléctricos utilizados en la industria, 
              garantizando su eficiencia y seguridad en el funcionamiento de maquinaria y equipos.</p>
          </div>

          {/* Sección 5 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen5.com" alt="Ejemplo 5" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Mecanica de Producion Industrial</h3>
            <p>Estudia el diseño, fabricación y mantenimiento de maquinaria y equipos utilizados en la producción 
              industrial, buscando optimizar procesos y mejorar la eficiencia de la producción.</p>
          </div>
        </div>

        {/* Segunda fila con el resto de las secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {/* Sección 6 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen6.com" alt="Ejemplo 6" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Administracion de Servicios de Hosteleria y Restaurantes</h3>
            <p>Se enfoca en la gestión y administración de establecimientos del sector turístico y gastronómico, abarcando áreas como
               la planificación, organización y optimización de recursos para ofrecer servicios de calidad</p>
          </div>

          {/* Sección 7 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen7.com" alt="Ejemplo 7" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Mecanica Automatriz</h3>
            <p>Se especializa en el diagnóstico, reparación y mantenimiento de vehículos automotores, utilizando tecnologías y
               técnicas avanzadas para asegurar el buen funcionamiento y la seguridad de los vehículos.</p>
          </div>

          {/* Sección 8 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen8.com" alt="Ejemplo 8" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Laboratorio clínico y anatomía patológica</h3>
            <p>Se dedica al análisis de muestras biológicas para el diagnóstico de enfermedades, así como a la realización de pruebas
              de anatomía patológica para detectar alteraciones en los tejidos y órganos del cuerpo.</p>
          </div>

          {/* Sección 9 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen9.com" alt="Ejemplo 9" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Gia Oficial de Turismo</h3>
            <p>Forma profesionales capacitados para guiar a los turistas, brindándoles información cultural, histórica y geográfica, y
               asegurando una experiencia educativa y enriquecedora en los destinos turísticos.</p>
          </div>

          {/* Sección 10 */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <img src="https://link-a-tu-imagen10.com" alt="Ejemplo 10" className="w-full h-auto rounded mb-2" />
            <h3 className="font-semibold">Contabilidad</h3>
            <p>Estudia el comportamiento humano para mejorar la calidad de vida de las personas, aplicando teorías y técnicas psicológicas...</p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Inicio;
