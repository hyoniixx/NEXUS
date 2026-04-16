import React from 'react'
import SignupForm from './SignupForm'
import './Signup.css'

function Signup() {
    return (
        <div>
            <section className='a-signup-ct'>
                <article className='a-signup-top-ct'>
                    <img />
                    <h2>회원가입</h2>
                    <p>NEXUS와 함께 시작하세요</p>
                </article>
                <SignupForm />
            </section>
        </div>
    )
}

export default Signup
