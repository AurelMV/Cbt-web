import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex items-center justify-center w-full max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg">
                {/* Contenedor principal del formulario con bordes y mejor espaciado */}
                <div className="bg-white border-4 border-gray-300 p-10 rounded-xl shadow-xl w-full sm:w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1000px] mx-auto mt-12">
                    <h2 className="text-center text-3xl font-extrabold mb-6 text-gray-900">Bienvenido</h2>
                    <p className="text-center text-gray-600 mb-6">Por favor, inicie sesión para continuar</p>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Campo de correo electrónico */}
                        <div className="relative">
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-12 pr-4 py-3 text-gray-900 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <i className="absolute left-3 top-2/4 transform -translate-y-2/4 text-indigo-600 fas fa-envelope text-lg"></i>
                            {errors.email && (
                                <InputError message={errors.email} className="mt-2 text-red-500 flex items-center">
                                    <i className="fas fa-exclamation-circle mr-2"></i>{errors.email}
                                </InputError>
                            )}
                        </div>

                        {/* Campo de contraseña */}
                        <div className="relative">
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-12 pr-4 py-3 text-gray-900 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <i className="absolute left-3 top-2/4 transform -translate-y-2/4 text-indigo-600 fas fa-lock text-lg"></i>
                            {errors.password && (
                                <InputError message={errors.password} className="mt-2 text-red-500 flex items-center">
                                    <i className="fas fa-exclamation-circle mr-2"></i>{errors.password}
                                </InputError>
                            )}
                        </div>

                        {/* Campo "Recordarme" y enlace para la contraseña olvidada */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Recordarme</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        {/* Contenedor del botón centrado */}
                        <div className="flex justify-center mt-6">
                            <PrimaryButton
                                className={`w-full sm:w-auto py-3 text-white font-semibold rounded-md ${processing ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} transition-all duration-200`}
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="loader border-white"></span>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </PrimaryButton>
                        </div>

                        {/* Enlace para registro */}
                        <div className="text-center mt-6">
                            <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
                            <Link href={route('register')} className="text-indigo-600 hover:text-indigo-700">
                                Regístrate aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </div>


        </GuestLayout>
    );
}
