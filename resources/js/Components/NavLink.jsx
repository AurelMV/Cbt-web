import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'relative inline-flex items-center text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? ' text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gray-600'
                    : 'text-gray-800 hover:text-blue-950') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}

