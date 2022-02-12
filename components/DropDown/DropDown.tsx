import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { transitionDefaults } from '../../default_objects/table_defaults';
interface Props {
    children: any;
    title: string;
    mainIcon: React.FC;
}
const DropDown: React.FC<Props> = ({ children, title, mainIcon }) => {
    return (
        <>
            <Menu as="div" className="md:relative">
                <Menu.Button as="button" className="btn text-xs shadow-none dark:text-white">{mainIcon}</Menu.Button>
                <Transition
                    {...transitionDefaults}
                    as={Fragment}
                >
                    <Menu.Items as="div" className="absolute flex flex-col flex-grow z-10 mx-10 md:mx-0 md:top-0 left-0 right-0 md:left-14 border-black border float-right bg-slate-900 dark:bg-accent-gray text-white p-2 rounded transition space-y-2 shadow-md text-sm min-w-[16rem] min-h-[10rem] outline-none ">
                        <h1 className="uppercase font-semibold">{title}</h1>
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default DropDown;