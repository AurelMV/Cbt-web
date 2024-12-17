import React, { useState , useEffect} from 'react';

const InscripcionForm = () => {
    const [currentStep, setCurrentStep] = useState(1); 

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3)); 
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1)); 
    };
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
  
    useEffect(() => {

      const today = new Date();
  
      const max = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate()); 
      const min = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate()); 
  
      setMaxDate(max.toISOString().split("T")[0]);
      setMinDate(min.toISOString().split("T")[0]);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10 mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-4">
                    Formulario de Inscripción
                </h1>
                <h2 className="text-lg md:text-xl text-gray-700 mb-6">
                    ¡Asegura tu lugar en el programa de tus sueños!
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                    <strong>Ten en cuenta antes de completar el formulario:</strong>
                    <ul className="list-inside list-disc mt-2 text-left">
                        <li>1.- Ya se ha debido realizar un pago en la caja de la institución</li>
                        <li>2.- Cualquier error en el formulario hará que este no tenga validez</li>
                    </ul>
                </p>
                <p className="text-sm md:text-base text-gray-600">
                    Completa este formulario con tus datos personales y del pago para formalizar tu inscripción. ¡Estamos emocionados de tenerte con nosotros!
                </p>
            </div>

            <form className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10 mt-3">
     
                {currentStep === 1 && (
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                        <label className="block text-gray-700 font-medium mb-1">Nombres:</label>
                        <input 
                            type="text" 
                            name="nombres" 
                            maxLength="80" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Apellido Paterno:</label>
                        <input 
                            type="text" 
                            name="aPaterno" 
                            maxLength="120" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Apellido Materno:</label>
                        <input 
                            type="text" 
                            name="aMaterno" 
                            maxLength="120" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Sexo:</label>
                        <select 
                            name="sexo" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div>
                    <label
                        htmlFor="tpoDocumento"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Tipo de Documento
                    </label>
                    <select
                        id="tpoDocumento"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        required
                        name="p_tipodocumento" 
                    
                    >
                        <option
          
                            value=""
                            selected
                            disabled
                        >
                            Seleccione tipo
                        </option>
                        <option value="DNI">DNI</option>
                        <option value="Pasaporte">
                            Pasaporte
                        </option>
                    </select>
                    </div>
                    <div>
                    <label
                        htmlFor="dni"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Nro de Documento
                    </label>
                    <input
                        id="dni"
                        name="p_nroDocumento"
                        type="text"
                        placeholder="Nro de Documento"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        required
                        />
                    </div>

   
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Celular Estudiante:</label>
                        <input 
                            type="text" 
                            name="celularestudiante" 
                            maxLength="9" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Celular Apoderado:</label>
                        <input 
                            type="text" 
                            name="celularapoderado" 
                            maxLength="9" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Fecha de Nacimiento:</label>
                        <input 
                            type="date" 
                            name="fechaNacimiento" 
                            min={minDate}
                            max={maxDate}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            maxLength="220" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="direccion">
                            Direccion
                        </label>
                        <input type="text" 
                        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400'
                        required/>
                    </div>
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Ultimo año cursado en el colegio</label>
                        <select 
                            name="Ulticursado" 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Seleccione</option>
                            <option value="M">4to</option>
                            <option value="F">5to</option>
                        </select>
                    </div>
                    <div>
                    <label
                        htmlFor="fotop"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Foto de DNI
                    </label>
                    <input
                        id="fotop"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                    />
                </div>
     
                </div>
                )}

   
                {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                    <label className="block text-gray-700 font-medium mb-1">Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        name="fechaNacimiento" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>
       
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Monto Pagado</label>
                    <input 
                        type="text" 
                        name="nombres" 
                        maxLength="80" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Medio de Pago</label>
                    <input 
                        type="text" 
                        name="aPaterno" 
                        maxLength="120" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Numero de Voucher</label>
                    <input 
                        type="text" 
                        name="aMaterno" 
                        maxLength="120" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label
                        htmlFor="fotop"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Escaneo del comprobante de pago
                    </label>
                    <input
                        id="fotop"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                    />
                </div>
            </div>
                )}


   
                {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                    <label className="block text-gray-700 font-medium mb-1">Turno:</label>
                    <select 
                        name="Turno" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione</option>
                        <option value="M">Mañana</option>
                        <option value="F">Tarde</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        name="fechaNacimiento" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Estado de Pago:</label>
                    <select 
                        name="estadoPago" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione</option>
                        <option value="M">Completo</option>
                        <option value="F">Incompleto</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">ciclo</label>
                    <select 
                        name="ciclo" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione</option>
                        <option value="M">Mañana</option>
                        <option value="F">Tarde</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Grupo de estudio</label>
                    <select 
                        name="ciclo" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione</option>
                        <option value="M">Mañana</option>
                        <option value="F">Tarde</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Programa de Estudio:</label>
                    <select 
                        name="ciclo" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione</option>
                        <option value="M">Mañana</option>
                        <option value="F">Tarde</option>
                    </select>
                </div>


            </div>
                )}

        
<div className="mt-6 text-center flex justify-between gap-4">
                    {currentStep > 1 && (
                        <button 
                            type="button" 
                            onClick={handlePrev} 
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Anterior
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button 
                            type="button" 
                            onClick={handleNext} 
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Siguiente
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button 
                            type="submit" 
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition duration-300 ease-in-out hover:scale-105"
                        >
                            Enviar Inscripción
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InscripcionForm;
