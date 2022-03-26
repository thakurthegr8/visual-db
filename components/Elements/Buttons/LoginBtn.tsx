import Link from 'next/link'
import React from 'react'
import ButtonStyles from "./Buttons.module.css";

const LoginBtn = () => {
  return (
    <Link href="/login">
    <button className={`btn ${ButtonStyles.loginButton}`} role="application">Login</button>
  </Link>
  )
}

export default LoginBtn;