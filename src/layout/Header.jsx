import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../assets/NexusHeaderLogo.svg'
import logoutBtn from '../assets/logout.svg'
import myPage from '../assets/myPage.svg'
import heart from '../assets/like_filled_badge.png'
import './Header.css'
import { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { logout } from '../service/AuthService'


function Header() {
    const { userData, dispatch } = useContext(userContext);

    useEffect(() => {
        console.log(userData)
    })
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        dispatch({ type: 'INIT_USER_DATA' })
        navigate('/');
    }

    return (
        <header className='l-header'>
            <img src={logo} onClick={() => navigate(`/${userData.role}`)} />
            <nav className='l-header-links '>
                <NavLink to="/lecture-list">강의목록</NavLink>
                {userData.role === 'instructor' &&
                    <NavLink to="/create-lecture">강의등록</NavLink>}
                <NavLink to="/duo">듀오</NavLink>
                {userData.userName &&
                    <NavLink to="/gacha">뽑기</NavLink>}
            </nav>
            {userData.userName ? (
                <div className='l-header-auth'>
                    <button className='l-header-heart-btn' onClick={() => navigate('/wish')}><img src={heart} /></button>
                    <button className='l-header-mypage-btn' onClick={() => navigate('/mypage')}><img src={myPage} /><p>{userData.userName}</p></button>
                    <button className='l-header-logout-btn' onClick={handleLogout}><img src={logoutBtn} /></button>
                </div>
            ) : (<div className='l-header-unAuth'>
                <button className='l-header-lg-btn' onClick={() => navigate('/login')}>로그인</button>
                <button className='l-header-su-btn' onClick={() => navigate('/signup')}>회원가입</button>
            </div >)
            }

        </header >
    )
}

export default Header