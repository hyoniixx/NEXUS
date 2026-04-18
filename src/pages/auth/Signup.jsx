import React from 'react'
import SignupForm from './SignupForm'
import './Signup.css'
import AuthTop from '../../components/auth/AuthTop'
import signupMain from '../../assets/signupMain.svg'

function Signup() {
    return (
        <div>
            <section className='a-signup-ct'>
                <AuthTop type='회원가입' img={signupMain} />
                <SignupForm />
            </section>
        </div>
    )
}

export default Signup