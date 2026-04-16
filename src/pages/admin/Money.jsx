import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import leftArrow from '../../assets/leftArrow.svg'
import './Money.css'
import MoneyDashboardItem from '../../components/admin/MoneyDashboardItem'

function Money() {
    return (
        <div className='admin-money-layout'>
            <div className='admin-money-header'>
                <div className='admin-money-header-back'>
                    <img src={leftArrow} style={{ width: '20px', height: '20px' }} />
                    <h6>마이페이지로 돌아가기</h6>
                </div>
                <h2>매출 관리</h2>
                <p>수강생 입금 내역과 강사 정산을 관리합니다.</p>
            </div>
            <div className='admin-money-dashboard'>
                <MoneyDashboardItem type="getMoney" value='123123' />
                <MoneyDashboardItem type="wait" value='123123' />
                <MoneyDashboardItem type="total" value='123123' />
                <MoneyDashboardItem type="completed" value='123123' />
            </div>
            <div className='admin-money-search'>

            </div>
            <div className='admin-money-navbar'>
                <NavLink to='deposit'>입금</NavLink>
                <NavLink to='payment'>정산</NavLink>
            </div>
            <div className='admin-money-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Money
