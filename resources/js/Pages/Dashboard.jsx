import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [distritos, setdistritos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [departamentos, setlistados] = useState([]);
    const [colegios, setColegios] = useState([]);
    const [error, setError] = useState(null);
    const [MensajeError, setMensajeError] = useState("");

    const [modalOpen, setModalOpen] = useState(false); 
    const openModal = () => setModalOpen(true); 
    const closeModal = () => setModalOpen(false);  

    const [modalOpen2, setModalOpen2] = useState(false); 
    const openModal2 = () => setModalOpen2(true); 
    const closeModal2 = () => setModalOpen2(false);  

    

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <h2 className="text-xl font-semibold leading-tight text-black">
                INSCRIPCIÓNES
            </h2>
            <p className="leading-tight text-gray-400">Realize inscripciones de nuevos estudiantes y adjunte un pago</p>
            <form onSubmit={handleSubmit}>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="mb-8 p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-semibold mb-4 text-blue-900">
                                        Ingrese Datos del Estudiante
                                    </h3>{" "}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb6">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="nombre"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                name="p_nombres"
                                                onChange={handleChange}
                                                value={formData.p_nombres}
                                                placeholder="Nombre"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="tpoDocumento"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Tipo de Documento
                                            </label>
                                            <select
                                                id="tpoDocumento"
                                                onChange={handleChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_tipodocumento" // Asegúrate de que el nombre sea exactamente "p_tipodocumento"
                                                value={
                                                    formData.p_tipodocumento ||
                                                    ""
                                                } // Evita que quede sin valor
                                            >
                                                <option value="" selected disabled>
                                                    Seleccione tipo
                                                </option>
                                                <option value="DNI">DNI</option>
                                                <option value="Pasaporte">
                                                    Pasaporte
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="dni"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Nro de Documento
                                            </label>
                                            <input
                                                //dato que se envia
                                                id="dni"
                                                onChange={handleChange}
                                                name="p_nroDocumento"
                                                value={formData.p_nroDocumento}
                                                type="number"
                                                placeholder="Nro de Documento"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="sexo"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Sexo
                                            </label>
                                            <input
                                                id="sexo"
                                                type="text"
                                                name="p_sexo"
                                                onChange={handleChange}
                                                value={formData.p_sexo}
                                                placeholder="Sexo"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="APaterno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Apellido Paterno
                                            </label>
                                            <input
                                                id="APaterno"
                                                type="text"
                                                name="p_aPaterno"
                                                onChange={handleChange}
                                                value={formData.p_aPaterno}
                                                placeholder="Apellido Paterno"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Email"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Correo Electronico
                                            </label>
                                            <input
                                                id="Email"
                                                type="email"
                                                name="p_email"
                                                onChange={handleChange}
                                                value={formData.p_email}
                                                placeholder="Email"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Telefono"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                id="Telefono"
                                                type="number"
                                                name="p_celularestudiante"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_celularestudiante
                                                }
                                                placeholder="Teléfono"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="TApoderado"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Teléfono Apoderado
                                            </label>
                                            <input
                                                id="TApoderado"
                                                type="text"
                                                name="p_celularapoderado"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_celularapoderado
                                                }
                                                placeholder="Teléfono de Apoderado"
                                                className="col-span-1 border p-2 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="AMaterno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Apellido Materno
                                            </label>
                                            <input
                                                id="AMaterno"
                                                type="text"
                                                name="p_aMaterno"
                                                onChange={handleChange}
                                                value={formData.p_aMaterno}
                                                placeholder="Apellido Materno"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="direccion"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Direccion
                                            </label>
                                            <input
                                                id="direccion"
                                                type="text"
                                                name="p_direccion"
                                                onChange={handleChange}
                                                value={formData.p_direccion}
                                                placeholder="Dirección"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Fnacimiento"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de Nacimiento
                                            </label>
                                            <input
                                                id="Fnacimiento"
                                                type="date"
                                                name="p_fechaNacimiento"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_fechaNacimiento
                                                }
                                                placeholder="Fecha de Nacimiento"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="Finscripcion"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de Inscripción
                                            </label>
                                            <input
                                                id="Finscripcion"
                                                type="date"
                                                name="p_fechaInscripcion"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_fechaInscripcion
                                                }
                                                placeholder="Fecha de Nacimiento"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="idusuario"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                idusuario
                                            </label>
                                            <input
                                                id="idusuario"
                                                type="text"
                                                name="p_Usuarios_id"
                                                onChange={handleChange}
                                                value={formData.p_Usuarios_id}
                                                placeholder="idusuario"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="anoculminado"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Ultimo año cursado
                                            </label>
                                            <input
                                                id="anoculminado"
                                                type="text"
                                                name="p_anoculminado"
                                                onChange={handleChange}
                                                value={formData.p_anoculminado}
                                                placeholder="Ultimo año cursado"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="idcolegio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                idcolegio
                                            </label>
                                            <input
                                                id="idcolegio"
                                                type="text"
                                                name="p_Colegios_id"
                                                onChange={handleChange}
                                                value={formData.p_Colegios_id}
                                                placeholder="idcolegio"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <button
                                                onClick={openModal}
                                                className="col-span-1 bg-blue-500 text-white p-2 rounded-md"
                                            >
                                                Seleccionar Colegio
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {modalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg flex w-full max-w-4xl">
                                            <div className="w-1/2 pr-4 border-r">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Seleccione Ubicación y
                                                    Colegio
                                                </h3>
                                                <div className="space-y-4">
                                                    <select
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleDepartamentoChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Departamento
                                                        </option>
                                                        {departamentos.map(
                                                            (depa) => (
                                                                <option
                                                                    key={
                                                                        depa.id
                                                                    }
                                                                    value={
                                                                        depa.id
                                                                    }
                                                                >
                                                                    {
                                                                        depa.nombredepartamento
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <select
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleProvinciaChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Provincia
                                                        </option>
                                                        {provincias.map(
                                                            (lista) => (
                                                                <option
                                                                    key={
                                                                        lista.id
                                                                    }
                                                                    value={
                                                                        lista.id
                                                                    }
                                                                >
                                                                    {
                                                                        lista.nombreprovincia
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <select
                                                        className="w-full border p-2 rounded-md"
                                                        required
                                                        onChange={
                                                            handleColegioChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Distrito
                                                        </option>
                                                        {distritos.map(
                                                            (lista) => (
                                                                <option
                                                                    key={
                                                                        lista.id
                                                                    }
                                                                    value={
                                                                        lista.id
                                                                    }
                                                                >
                                                                    {
                                                                        lista.nombredistrito
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            placeholder="Buscar colegios..."
                                                            className="input-class"
                                                        />
                                                        {Cole.length > 0 && (
                                                            <ul>
                                                                {Cole.map(
                                                                    (
                                                                        resultado,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                resultado.nombrecolegio
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={openModal2}
                                                        className="w-full bg-indigo-600 text-white p-2 rounded-md mt-2"
                                                    >
                                                        Agregar Colegio
                                                    </button>
                                                </div>
                                                <div className="flex justify-end mt-4 space-x-2">
                                                    <button
                                                        onClick={closeModal}
                                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={closeModal}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="w-1/2 pl-4 overflow-x-auto">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Colegios Seleccionados
                                                </h3>
                                                <table className="min-w-full border">
                                                    <thead>
                                                        <tr className="bg-gray-200">
                                                            <th className="border px-4 py-2">
                                                                Nombre
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                modalidad
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Departamento
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                distrito
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                provincia
                                                            </th>
                                                            <th className="border px-4 py-2">
                                                                Seleccion
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Cole.length > 0 &&
                                                            Cole.map(
                                                                (
                                                                    resultado,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.nombrecolegio
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.modalidad
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.Distrito_idDistrito
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            {
                                                                                resultado.gestion
                                                                            }
                                                                        </td>
                                                                        <td className="border px-4 py-2">
                                                                            <button className="text-indigo-600 hover:text-indigo-900">
                                                                                Seleccionar
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalOpen2 && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full max-w-6xl overflow-hidden">
                                            <div className="flex w-full">
                                                <div className="w-1/2 pr-4 border-r">
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Agregar Colegio
                                                    </h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label htmlFor="">
                                                                Nombre del
                                                                Colegio
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="w-full border p-2 rounded-md"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className="col-span-1">
                                                                <label htmlFor="">
                                                                    codModular
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">
                                                                    modalidad
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">
                                                                    Gestion
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">
                                                                    Latitud
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">
                                                                    longitud
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="">
                                                                    Distrito
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full border p-2 rounded-md"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mt-4 space-x-2">
                                                        <button
                                                            onClick={
                                                                closeModal2
                                                            }
                                                            className="px-4 py-2 bg-gray-300 rounded-md"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            onClick={
                                                                closeModal2
                                                            }
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                        >
                                                            Guardar
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-1/2 pl-4 overflow-x-auto">
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Colegios Seleccionados
                                                    </h3>
                                                    <table className="min-w-full border">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border px-4 py-2">
                                                                    Nombre
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    codModular
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    modalidad
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    gestion
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    latitud
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    longitud
                                                                </th>
                                                                <th className="border px-4 py-2">
                                                                    distrito
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border px-4 py-2">
                                                                    Colegio
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdasd
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdasd
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdasd
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdsad
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdasd
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    asdasd
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8 p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-medium mb-4 text-blue-900">
                                        Datos de Pago
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="fpago"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de pago
                                            </label>
                                            <input
                                                id="fpago"
                                                type="date"
                                                name="p_fechaPago"
                                                onChange={handleChange}
                                                value={formData.p_fechaPago}
                                                placeholder="Fecha de Pago"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="Monto"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Monto de Pago
                                            </label>
                                            <input
                                                id="Monto"
                                                type="number"
                                                name="p_monto"
                                                onChange={handleChange}
                                                value={formData.p_monto}
                                                placeholder="Monto de Pago"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="medio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Medio de pago
                                            </label>
                                            <input
                                                id="medio"
                                                onChange={handleChange}
                                                type="text"
                                                name="p_medioPago"
                                                value={formData.p_medioPago}
                                                placeholder="Medio de Pago"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="NVaucher"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Numero de Voucher
                                            </label>
                                            <input
                                                id="NVaucher"
                                                type="text"
                                                name="p_nroVoucher"
                                                onChange={handleChange}
                                                value={formData.p_nroVoucher}
                                                placeholder="Número de Voucher"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8p-4 border border-gray-300 rounded-md bg-white shadow-md sm:p-8">
                                    <h3 className="text-md font-medium mb-4 text-blue-900">
                                        Datos de Inscripción
                                    </h3>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <label
                                                htmlFor="turno"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Turno
                                            </label>
                                            <select
                                                id="turno"
                                                onChange={handleChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_turno"
                                                value={formData.p_turno}
                                            >
                                                <option value="" selected disabled>
                                                    Seleccione Turno
                                                </option>
                                                <option value="mañana">
                                                    Mañana
                                                </option>
                                                <option value="tarde">
                                                    Tarde
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="finscripcion"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Fecha de Inscripcion
                                            </label>
                                            <input
                                                id="dinscripcion"
                                                type="date"
                                                name="p_fechaInscripcion"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_fechaInscripcion
                                                }
                                                placeholder="Fecha de Inscripción"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="Epago"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Estado de pago
                                            </label>
                                            <select
                                                id="Epago"
                                                onChange={handleChange}
                                                className="col-span-1 border p-2 rounded-md w-48"
                                                required
                                                name="p_estadopago"
                                                value={formData.p_estadopago}
                                            >
                                                <option value="" selected disabled>
                                                    Estado de Pago
                                                </option>
                                                <option value="1">
                                                    Pagado
                                                </option>
                                                <option value="0">
                                                    Pendiente
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="Gestudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Grupo de estudio
                                            </label>
                                            <input
                                                id="Gestudio"
                                                type="text"
                                                name="p_Grupos_id"
                                                onChange={handleChange}
                                                value={formData.p_Grupos_id}
                                                placeholder="Grupo de Estudio"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="PEstudio"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Programa de estudio
                                            </label>
                                            <input
                                                id="PEstudio"
                                                type="text"
                                                name="p_Programaestudios_id"
                                                onChange={handleChange}
                                                value={
                                                    formData.p_Programaestudios_id
                                                }
                                                placeholder="Programa de Estudio"
                                                className="col-span-1 border p-2 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="fotop"
                                                className="block text-sm font-medium text-gray-800"
                                            >
                                                Escaneo del comprobante de pago
                                            </label>
                                            <input
                                                id="fotop"
                                                type="file"
                                                onChange={handleChange}
                                                accept=".png, .jpg, .jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        >
                            Registrar Estudiante
                        </button>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
