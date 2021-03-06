import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { transitionDefaults } from '../../default_objects/table_defaults';
interface Props {
    children: any;
    title: string;
    mainIcon: any;
    alignment: "top" | "bottom" | "left" | "right";
    text?: string;
}
const DropDown: React.FC<Props> = ({ children, title, mainIcon, alignment, text }) => {
    return (
        <>
            <Menu as="button" className="md:relative flex justify-center items-center space-x-2">
            <span>{text && text}</span><Menu.Button as="button" className=" text-base flex justify-center shadow-none dark:text-white">{mainIcon}</Menu.Button>
                <Transition
                    {...transitionDefaults}
                    as={Fragment}
                >
                    <Menu.Items as="div" className={`absolute flex flex-col flex-grow z-10 border-black border dark:border-accent-gray-light float-right bg-slate-900 dark:bg-accent-gray text-white p-2  rounded transition space-y-2 shadow-md text-sm min-w-[16rem] min-h-auto outline-none  mx-10 md:mx-0  right-0 ${alignment !== "bottom" ? "left-0 md:left-14 md:top-0" : "top-8"}`}>
                        <h1 className="uppercase font-semibold">{title}</h1>
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default DropDown;