import React from 'react'

const login = () => {
    return (
        <div className="flex justify-center items-center h-screen fixed inset-0 ">
            <div className="text-white space-y-4 bg-white dark:bg-accent-gray shadow-md rounded border border-accent-gray-light border-opacity-50 p-8 lg:min-w-[20rem]">
                <h1>Login</h1>
                <form className="flex flex-col space-y-2">
                    <input className="p-2 bg-white bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50" type="email" placeholder="Enter email"/>
                    <input className="p-2 bg-white bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50" type="password" placeholder="Enter email"/>
                    <button className="btn btn-blue">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default login;
