import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
    <div className="flex min-h-screen">
    
        <nav className="w-64 border-r border-gray-100 bg-red-200">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col h-screen">
                    <div className="flex items-center justify-center mt-4">
                        <h1>CBT</h1>
                    </div>
                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <img src="https://cdn-icons-png.flaticon.com/512/88/88450.png" width={30} height={30} />
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Inscripciones
                        </NavLink>
                    </div>
                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <NavLink
                            href={route('docentes.index')}
                            active={route().current('docentes.index')}
                        >
                            Docentes
                        </NavLink>
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                    <img src="https://svgsilh.com/svg/303116.svg" width={30} height={30} />
                        <NavLink
                            href={route('ciclos.index')}
                            active={route().current('ciclos.index')}
                        >
                            Ciclos
                        </NavLink>
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Docentes y cursos
                        </NavLink>
                    </div>
                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                    <img src="https://cdn-icons-png.flaticon.com/512/40/40494.png" width={30} height={30} />
                        <NavLink
                        href={route('cursos.index')}
                        active={route().current('cursos.index')}
                        >
                            Cursos
                        </NavLink>
                    </div>
                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Reportes
                        </NavLink>
                    </div>
        
                    <div className="mt-auto mb-6">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center justify-between rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>

        <main className="flex-1 p-6 bg-white">
            {children}
        </main>
    </div>
    );
}
