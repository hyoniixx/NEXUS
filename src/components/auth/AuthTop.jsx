import React from 'react'
import './AuthTop.css';

function AuthTop({ type, img }) {
    return (
        <article className='a-auth-top-ct'>
            <div className='a-auth-top-img'><img src={img} /></div>
            <h2>{type}</h2>
            <p>{type === '로그인' ? 'NEXUS에 오신 것을 환영합니다' : type === '프로필 수정' ? '개인 정보를 수정할 수 있습니다' : type === '비밀번호 확인' ? '프로필 정보를 수정하려면 비밀번호를 입력해주세요' : 'NEXUS와 함께 시작하세요'}</p>
        </article>
    )
}

export default AuthTop