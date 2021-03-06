import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
interface Props {
    isDialogOpen: boolean;
    setDialogOpen: (isDialogOpen: boolean) => void;
    children:any;
}
const DialogBox: React.FC<Props> = ({ isDialogOpen, setDialogOpen,children }) => {
    const closeModal = () => {
        setDialogOpen(false);
    }
    return (
        <>

            <Transition show={isDialogOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border space-y-3 dark:border-accent-gray-light w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-accent-gray dark:text-white shadow-xl rounded-2xl">
                                {children}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DialogBox;
