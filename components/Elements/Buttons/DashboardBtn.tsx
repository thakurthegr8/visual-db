import Link from 'next/link'
import React from 'react'
import ButtonStyles from "./Buttons.module.css";

const DashboardBtn = () => {
  return (
    <Link href="/dashboard">
    <button className={`btn ${ButtonStyles.dashboardButton}`} role="application">Dashboard</button>
  </Link>
  )
}

export default DashboardBtn;