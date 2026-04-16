import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import leftArrow from '../../assets/leftArrow.svg'
import './Money.css'
import MoneyDashboardItem from '../../components/admin/MoneyDashboardItem'
import searchIcon from '../../assets/searchIcon.svg'

function Money() {
    const [searchValue, setSearchValue] = useState(''); //이 값에 따라 요소 렌더링 달라지게
    const [navActive, setNavActive] = useState([true, false]); //NavBar 요소 두개에 대한 속성
    useEffect(() => {

    }, [searchValue])
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
                <MoneyDashboardItem type="completed" value='123123' />
                <MoneyDashboardItem type="total" value='123123' />
            </div>
            <div className='admin-money-search'>
                <img src={searchIcon} alt="" width="20" height="20" />
                <input
                    type="text"
                    placeholder='사용자명, 사용자ID, 강의명으로 검색...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className='admin-money-navbar'>
                <NavLink to='deposit' className={`${navActive[0] ? "admin-money-nav-active" : "admin-money-nav-default"}`} onClick={() => setNavActive([true, false])}>입금</NavLink>
                <NavLink to='payment' className={`${navActive[1] ? "admin-money-nav-active" : "admin-money-nav-default"}`} onClick={() => setNavActive([false, true])}>정산</NavLink>
            </div>
            <div className='admin-money-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Money
