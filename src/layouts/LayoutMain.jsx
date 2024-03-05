import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon, DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Slide, ToastContainer } from 'react-toastify';

// Header Navlinks
const navigation = [
    { name: 'Personeller', href: '/', icon: <UserIcon className="h-9 w-9 inline-block" /> },
    { name: 'Tebliğ Hazırla', href: '/make', icon: <DocumentTextIcon className="h-9 w-9 inline-block" /> },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function LayoutMain() {

    let location = useLocation();

    return (
        <>
            <ToastContainer theme="light" transition={Slide} />
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="hidden md:block">
                                            <div className="flex items-baseline space-x-4">
                                                {navigation.map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        to={item.href}
                                                        className={classNames(
                                                            location.pathname === item.href
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}>
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex gap-2">
                            {navigation.filter(nav => nav.href === location.pathname)[0].icon}
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 inline-block">
                                {navigation.filter(nav => nav.href === location.pathname)[0].name}
                            </h1>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}
