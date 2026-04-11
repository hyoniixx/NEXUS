import logo from '../assets/NexusHeaderLogo.svg'
import './Header.css'

function Header() {
    return (
        <header className='l-header'>
            <img src={logo} />
            <nav className='l-header-links '>
                <p>강의목록</p>
                <p>강의등록</p>
                <p>듀오</p>
                <p>뽑기</p>
            </nav>
            <div className='l-header-btn'>
                <button className='l-header-lg-btn'>로그인</button>
                <button className='l-header-su-btn'>회원가입</button>
            </div>
        </header>
    )
}

export default Header