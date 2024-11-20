import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function UserManagement() {
    // Estado de los usuarios y del formulario
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        password: "",
        confirmPassword: "",
        rol: "",
        estado: "activo", // Valor por defecto es activo
    });

    // Estado para controlar la visibilidad del modal y usuario a editar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    // Maneja el cambio de valores en los campos del formulario
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para agregar un nuevo usuario (ejemplo básico)
        const newUser = {
            ...form,
            id: users.length + 1, // Asignar un ID único
        };
        setUsers([...users, newUser]);

        // Limpiar el formulario después de enviar
        setForm({
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            email: "",
            password: "",
            confirmPassword: "",
            rol: "",
            estado: "activo",
        });
    };

    // Eliminar usuario
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este usuario?");
        if (confirmDelete) {
            setUsers(users.filter(user => user.id !== id));
            alert("Usuario eliminado exitosamente.");
        }
    };

    // Modificar usuario
    const handleEdit = (user) => {
        setUserToEdit(user); // Establece el usuario a editar
        setIsModalOpen(true); // Abre el modal
    };

    // Enviar cambios al editar el usuario
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedUsers = users.map((user) =>
            user.id === userToEdit.id ? { ...userToEdit, ...form } : user
        );
        setUsers(updatedUsers);
        setIsModalOpen(false); // Cerrar el modal
        alert("Usuario actualizado exitosamente.");
    };

    // Cerrar modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Usuarios" />
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Gestión de Usuarios</h2>
                <p>Aquí puedes gestionar a los usuarios.</p>

                {/* Formulario para ingresar usuarios */}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Apellido Paterno</label>
                            <input
                                type="text"
                                name="apellidoPaterno"
                                value={form.apellidoPaterno}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Apellido Materno</label>
                            <input
                                type="text"
                                name="apellidoMaterno"
                                value={form.apellidoMaterno}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Rol</label>
                            <input
                                type="text"
                                name="rol"
                                value={form.rol}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Estado</label>
                            <select
                                name="estado"
                                value={form.estado}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
                        Registrar Usuario
                    </button>
                </form>

                {/* Tabla para mostrar los usuarios registrados */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-center mb-4">Registro de Usuarios</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">Nombre</th>
                                <th className="border p-2">Apellido Paterno</th>
                                <th className="border p-2">Apellido Materno</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Rol</th>
                                <th className="border p-2">Estado</th>
                                <th className="border p-2 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border p-2">{user.nombre}</td>
                                    <td className="border p-2">{user.apellidoPaterno}</td>
                                    <td className="border p-2">{user.apellidoMaterno}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.rol}</td>
                                    <td className="border p-2">{user.estado}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-500 hover:underline mr-2"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de edición */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Editar Usuario</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={form.nombre}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        name="apellidoPaterno"
                                        value={form.apellidoPaterno}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Apellido Materno</label>
                                    <input
                                        type="text"
                                        name="apellidoMaterno"
                                        value={form.apellidoMaterno}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Rol</label>
                                    <input
                                        type="text"
                                        name="rol"
                                        value={form.rol}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">Estado</label>
                                    <select
                                        name="estado"
                                        value={form.estado}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="submit"
                                    className="p-2 bg-blue-500 text-white rounded"
                                >
                                    Guardar cambios
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="p-2 bg-gray-400 text-white rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
