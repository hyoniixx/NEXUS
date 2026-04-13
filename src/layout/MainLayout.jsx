import React from 'react'
import Header from './Header'
import '../App.css'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <>
            <Header />
            <div className='main'>
                <Outlet />
            </div>

        </>
    )
}

export default MainLayout
