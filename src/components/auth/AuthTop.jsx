import React from 'react'
import './AuthTop.css';

function AuthTop({ type, img }) {
    return (
        <article className='a-auth-top-ct'>
            <div className='a-auth-top-img'><img src={img} /></div>
            <h2>{type}</h2>
            <p>{type === '로그인' ? 'NEXUS에 오신 것을 환영합니다' : 'NEXUS와 함께 시작하세요'}</p>
        </article>
    )
}

export default AuthTop