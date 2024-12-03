
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';

import {usePage } from '@inertiajs/react';


export default function AuthenticatedLayout({children }) {
    const user = usePage().props.auth.user;
 
    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full bg-gradient-to-r from-blue-500 to-green-500 p-3 shadow-md flex justify-between items-center">
                
                <div className="flex items-center">
                    <img src="https://cbt.istta.edu.pe/assets/images/img.png" width={50} height={50}className='mr-2'/>
                    <h1 className="ml-4 text-white text-2xl font-semibold">Instituto Tupac Amaru - CBT  </h1>
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex w-full rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center justify-between rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-black transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    {user.name}
                                    <svg
                                        className="h-4 w-4 ml-2"
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
                            <Dropdown.Link href={route('users.index')}>
                                Gestion de Usuarios
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
            </header>
            


            <div className="flex flex-1">

                <nav className="w-64 border-r border-gray-100 bg-gray-300">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col h-screen">

                            <div className="mt-5 space-y-4 inline-flex items-center rounded-md  px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 active:bg-gray-900">
                                <img src="https://cdn-icons-png.flaticon.com/512/88/88450.png" width={30} height={30} className='mr-2'/>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Inscripciones                            
                                </NavLink>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="">
                                            <button
                                                type="button"
                                                className="inline-flex w-full "
                                                
                                            >
                                                <svg
                                                    className="h-4 w-4 ml-2"
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
                                        <Dropdown.Link href={route('dashboard') }
                                        
                                        as="button">
                                            Inscripciones
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('estudiantes.index')}
                                        as="button">
                                            Estudiantes
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            as="button"
                                            href={route('pagos.index')}
                                        >
                                            Gestion Pagos
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('gestInscripcion.index')}
                                            as="button"
                                        >
                                            Gestion Inscripciones
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                               
                            </div>
                            <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <img src="https://cdn-icons-png.flaticon.com/512/42/42916.png" width={30} height={30} className='mr-2'/>
                        <NavLink
                            href={route('docentes.index')}
                            active={route().current('docentes.index')}
                        >
                            Docentes
                            <h1 className='text-gray-300 hover:bg-gray-400'>_____</h1>
                        </NavLink>
                                                    <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex w-full rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex w-full text-black"
                                            >
                                                <svg
                                                    className="h-4 w-4 ml-2"
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
                                
                                        <Dropdown.Link href={route('docenteCursos.index')}
                                            as="button">
                                            Gestion De relaciones
                                        </Dropdown.Link>
                            
                                    </Dropdown.Content>
                                </Dropdown> 
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                    <img src="https://svgsilh.com/svg/303116.svg" width={30} height={30} className='mr-2'/>
                        <NavLink
                            href={route('ciclos.index')}
                            active={route().current('ciclos.index')}
                        >
                            Ciclos
                        </NavLink>
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <img src="https://cdn-icons-png.flaticon.com/512/5885/5885260.png" width={30} height={30} className='mr-2' />
                        <NavLink
                            href={route('programasEstudio.index')}
                            active={route().current('programasEstudio.index')}
                        >

                            Programas de Estudio
                        </NavLink>
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                    <img src="https://cdn-icons-png.flaticon.com/512/73/73531.png" width={30} height={30} className='mr-2'/>
                        <NavLink
                        href={route('cursos.index')}
                        active={route().current('cursos.index')}
                        >
                            Cursos
                        </NavLink>
                    </div>

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                    <img src="https://cdn-icons-png.flaticon.com/512/32/32441.png" width={30} height={30} className='mr-2'/>
                        <NavLink
                        href={route('grupos.index')}
                        active={route().current('grupos.index')}
                        >
                            Grupos de Estudios
                        </NavLink>
                    </div>
                    

                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <img src="https://cdn-icons-png.flaticon.com/512/841/841791.png" width={30} height={30} className='mr-2'/>
                        <NavLink
                            href={route('reportes.index')}
                            active={route().current('reportes.index')}
                        >
                            Reportes
                        </NavLink>
                    </div>
                    <div className="mt-5 space-y-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900">
                        <img src="https://cdn-icons-png.flaticon.com/512/69/69517.png" width={30} height={30} className='mr-2'/>
                        <NavLink
                            href={route('diagrama.index')}
                            active={route().current('diagrama.index')}
                        >
                            Estadisticas
                        </NavLink>
                    </div>
                        </div>
                    </div>
                </nav>

                    <main className="flex-1 p-6 ">
                        
                        {children}
                    </main>


            </div>
        </div>
    );
}