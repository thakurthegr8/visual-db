import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
interface Props {
    children: any;
    title: string;
    mainIcon:React.FC;
}
const DropDown: React.FC<Props> = ({ children, title,mainIcon }) => {
    return (
        <>
            <Menu as="div" className="relative">
                <Menu.Button as="button" className="btn text-xs shadow-none">{mainIcon}</Menu.Button>
                {/* Use the Transition component. */}
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    as={Fragment}
                >
                    <Menu.Items as="div" className="absolute justify-center  flex flex-col items-start z-10  left-14 border-black border float-right right-0 top-0 bg-white p-2 rounded transition space-y-2 shadow-md text-sm min-w-[10rem] h-40 outline-none ">
                        <h1 className="uppercase font-semibold">{title}</h1>
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default DropDown;