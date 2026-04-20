import React from 'react'
import AuthTop from '../../components/auth/AuthTop';
import signupMain from '../../assets/signupMain.svg'
import { useNavigate, useParams } from 'react-router-dom';
import './Signup.css';


function SignupComp() {

    const { role } = useParams()
    const navigate = useNavigate();

    return (
        <div className='a-login-background'>
            <section className='a-login-ct'>
                <AuthTop type='회원가입 성공' img={signupMain} />

                <p className='a-signup-comp'>{role === 'student' ? 'NEXUS를 사용해보세요!' : '관리자의 승인까지 7일이 소요될 수 있습니다.'}</p>
                <button onClick={() => { role === 'student' ? navigate('/') : navigate('/login') }} className='a-signup-comp-btn '>{role === 'student' ? '메인화면으로' : '로그인'}</button>
            </section>
        </div>
    )
}

export default SignupComp
