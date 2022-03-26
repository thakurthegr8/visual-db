import Link from 'next/link'
import React from 'react'
import ButtonStyles from "./Buttons.module.css";

const RegisterBtn = () => {
  return (
    <Link href="/register">
      <button className={`btn ${ButtonStyles.tryVisualDbButton}`} role="application">Try Visual-DB</button>
    </Link>
  )
}

export default RegisterBtn;