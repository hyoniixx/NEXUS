import { NavLink } from 'react-router-dom'
import logo from '../assets/NexusHeaderLogo.svg'
import './Header.css'

function Header() {
    return (
        <header className='l-header'>
            <img src={logo} />
            <nav className='l-header-links '>
                <NavLink to="/lecture-list">강의목록</NavLink>
                <NavLink to="/create-lecture">강의등록</NavLink>
                <NavLink to="/duo">듀오</NavLink>
                <NavLink to="/gacha">뽑기</NavLink>
            </nav>
            <div className='l-header-btn'>
                <button className='l-header-lg-btn'>로그인</button>
                <button className='l-header-su-btn'>회원가입</button>
            </div>
        </header>
    )
}

export default Header