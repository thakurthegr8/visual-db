import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { transitionDefaults } from '../../default_objects/table_defaults';
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
                    {...transitionDefaults}
                    as={Fragment}
                >
                    <Menu.Items as="div" className="absolute justify-center  flex flex-col items-start z-10  left-14 border-black border float-right right-0 top-0 bg-slate-900 text-white p-2 rounded transition space-y-2 shadow-md text-sm min-w-[16rem] h-40 outline-none ">
                        <h1 className="uppercase font-semibold">{title}</h1>
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default DropDown;