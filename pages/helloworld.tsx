import React from 'react'
import { isDev } from '../default_objects/default_strings'
const helloApi = async () => {
    const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email: "hello@gmail.com", password:"abc12345" })
    })
    const data = await response.json();
    console.log(data);
}
const Helloworld = () => {

    return (
        <div onClick={() => helloApi()}>helloworld</div>
    )
}

export default Helloworld;