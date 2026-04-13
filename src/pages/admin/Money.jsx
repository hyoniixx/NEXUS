import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Money() {
    return (
        <div>
            <h3>수익 관리</h3>
            <NavLink to='deposit'>입금</NavLink>
            <NavLink to='payment'>정산</NavLink>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Money
