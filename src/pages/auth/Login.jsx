import React, { useState } from 'react'
import './Login.css';
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'

function Login() {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <section className='a-login-ct'>
                <article className='a-login-top-ct'>
                    <img />
                    <h2>로그인</h2>
                    <p>NEXUS에 오신 것을 환영합니다</p>
                </article>
                <form className='a-login-form-ct'>
                    <label>이메일</label>
                    <input className='a-login-email-input' type='email' placeholder='이메일을 입력해주세요.' />
                    <label>비밀번호</label>
                    <div className='a-login-password-input'>
                        <input type={isVisible ? 'text' : 'password'} placeholder='비밀번호를 입력해주세요' />
                        <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
                    </div>
                    <button>로그인</button>
                </form>
                <p>계정이 없으신가요? <span>회원가입</span></p>
            </section>
        </div>
    )
}

export default Login
