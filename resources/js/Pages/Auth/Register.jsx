import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

 
            <h2 className="text-center text-2xl font-bold mb-6">Registrar nuevo usuario</h2>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="flex-1">
                        <InputLabel htmlFor="apellido_paterno" value="Apellido Paterno" />
                        <TextInput
                            id="apellido_paterno"
                            name="apellido_paterno"
                            value={data.apellido_paterno}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('apellido_paterno', e.target.value)}
                            required
                        />
                        <InputError message={errors.apellido_paterno} className="mt-2" />
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="apellido_materno" value="Apellido Materno" />
                        <TextInput
                            id="apellido_materno"
                            name="apellido_materno"
                            value={data.apellido_materno}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('apellido_materno', e.target.value)}
                            required
                        />
                        <InputError message={errors.apellido_materno} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo Electronico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 flex space-x-4">
                    <div className="flex-1">
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="rol" value="Rol" />
                    <select
                        id="rol"
                        name="rol"
                        value={data.rol}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        onChange={(e) => setData('rol', e.target.value)}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        {/* Aquí puedes mapear los roles desde tu base de datos */}
                    </select>
                    <InputError message={errors.rol} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ¿Ya estás registrado?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>

    );
}
