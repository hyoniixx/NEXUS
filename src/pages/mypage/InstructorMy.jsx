import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function InstructorMy() {
    return (
        <div>
            <h3>내 강의</h3>
            <NavLink to=''>강의 조회</NavLink>
            <NavLink to='students'>수강생 조회</NavLink>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default InstructorMy
