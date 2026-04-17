import Header from './Header'
import '../App.css'
import './MainLayout.css';
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'


function MainLayout() {

    const { loading } = useContext(userContext);
    return (
        <>
            <Header />
            <div className='main'>
                {
                    loading ? (
                        <div className='l-main-loading-message'>회원 정보 로딩 중...</div>
                    ) : (
                        <Outlet />
                    )
                }

            </div>
        </>
    )
}

export default MainLayout
