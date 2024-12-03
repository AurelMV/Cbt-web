import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ErrorMessage = ({ message }) => (
    <div className="mt-1 text-red-500 text-xs bg-red-100 border border-red-400 rounded p-2">
        {message}
    </div>
);

export default function UserManager({ users: initialUsers }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nombres: '',
        a_paterno: '',
        a_materno: '',
        estado: '',
        roles: '',
    });

    const [listaUsers, setListaUsers] = useState(initialUsers);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(`${name} seleccionado: ${value}`);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.roles || !formData.estado) {
        //     console.log('Por favor, selecciona un rol y un estado');
        //     return;
        // }

        try {
            const response = await axios.post('/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                nombres: formData.nombres,
                a_paterno: formData.a_paterno,
                a_materno: formData.a_materno,
                estado: formData.estado,
                roles: formData.roles,
            });
        const nuevoUser = response.data;
        setListaUsers([...listaUsers, {
            ...nuevoUser,
            roles: formData.roles,
        }]);
        setErrors({});

    } catch (error) {
        if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);  
        } else {
            console.error('Error creating user:', error);
        }
    }
};

const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`/users/${editUserId}`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            nombres: formData.nombres,
            a_paterno: formData.a_paterno,
            a_materno: formData.a_materno,
            estado: formData.estado,
            roles: formData.roles,
        });

        setListaUsers(
            listaUsers.map(user =>
                user.id === editUserId
                    ? {
                        ...user,
                        name: formData.name,
                        email: formData.email,
                        nombres: formData.nombres,
                        a_paterno: formData.a_paterno,
                        a_materno: formData.a_materno,
                        estado: formData.estado,
                        roles: formData.roles,
                    }
                    : user
            )
        );
        setIsEditModalOpen(false);
        setErrors({});
    } catch (error) {
        if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
        } else {
            console.error('Error creating user:', error);
        }
    }
};

const openEditModal = (user) => {
    setFormData(user);
    setEditUserId(user.id);
    setIsEditModalOpen(true);
};

const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        nombres: user.nombres,
        a_paterno: user.a_paterno,
        a_materno: user.a_materno,
        estado: user.estaod,
        roles: user.roles,
    });
};

return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                User Management
            </h2>
        }
    >
        <Head title="User Management" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-medium text-[#3395C9] flex justify-center">
                        Registrar Usuario
                    </h2>
                    <br></br>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="border-b border-gray-200 pb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.name && <ErrorMessage message={errors.name} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombres</label>
                                    <input
                                        type="text"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.nombres && <ErrorMessage message={errors.nombres} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        name="a_paterno"
                                        value={formData.a_paterno} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.a_paterno && <ErrorMessage message={errors.a_paterno} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Apellido Materno</label>
                                    <input
                                        type="text"
                                        name="a_materno"
                                        value={formData.a_materno}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.a_materno && <ErrorMessage message={errors.a_materno} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.email && <ErrorMessage message={errors.email} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.password && <ErrorMessage message={errors.password} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                                    <select name="roles" value={formData.roles} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        <option value="">Seleccione un rol</option>
                                        <option value="admin">Admin</option>
                                        <option value="empleado">Empleado</option>
                                    </select>
                                    {errors.roles && <ErrorMessage message={errors.roles} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <select name="estado" value={formData.estado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        <option value="">Seleccione el estado de la cuenta</option>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                    {errors.estado && <ErrorMessage message={errors.estado} />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-medium text-[#23C363] flex justify-center">
                        Usuarios Registrados
                    </h2>
                    <br></br>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listaUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.nombres + ' ' + user.a_paterno + ' ' + user.a_materno}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.roles}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.estado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => openEditModal(user)} className="text-[#2DA9A0] hover:text-indigo-900">Modificar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {isEditModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="bg-[#2DA9A0] p-4">
                                        <h3 className="text-lg leading-6 font-bold text-white flex justify-center">Editar Usuario</h3>
                                    </div>
                                    <div className="mt-2">
                                        <div className="border-b border-gray-200 pb-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.name && <ErrorMessage message={errors.name} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Nombres</label>
                                                    <input
                                                        type="text"
                                                        name="nombres"
                                                        value={formData.nombres}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.nombres && <ErrorMessage message={errors.nombres} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
                                                    <input
                                                        type="text"
                                                        name="a_paterno"
                                                        value={formData.a_paterno}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.a_paterno && <ErrorMessage message={errors.a_paterno} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Apellido Materno</label>
                                                    <input
                                                        type="text"
                                                        name="a_materno"
                                                        value={formData.a_materno}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.a_materno && <ErrorMessage message={errors.a_materno} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.email && <ErrorMessage message={errors.email} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    />
                                                    {errors.password && <ErrorMessage message={errors.password} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                                                    <select
                                                        name="roles"
                                                        value={formData.roles}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                                        <option value="">Seleccione un rol</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="empleado">Empleado</option>
                                                    </select>
                                                    {errors.roles && <ErrorMessage message={errors.roles} />}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                                    <select
                                                        name="estado"
                                                        value={formData.estado}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                                        <option value="">Seleccione el estado de la cuenta</option>
                                                        <option value="activo">Activo</option>
                                                        <option value="inactivo">Inactivo</option>
                                                    </select>
                                                    {errors.estado && <ErrorMessage message={errors.estado} />}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" onClick={handleEditSubmit} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                                                Guardar Cambios
                                            </button>
                                            <button type="button" onClick={closeEditModal} className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </AuthenticatedLayout>
);
}