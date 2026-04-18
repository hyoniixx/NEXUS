import React from 'react'
import logo from '../assets/NexusHeaderLogo.svg'
import './Footer.css';

function Footer() {
    return (
        <section className='l-footer'>
            <article>© 2026 HYONIX. All rights reserved.</article>
            <article>
                NEXUS는 사용자 간 지식 공유 및 매칭을 지원하는 플랫폼입니다.
                <br />
                더 나은 서비스 제공을 위해 지속적으로 개선되고 있습니다.
            </article>
            <article>
                문의: nexus.help@gmail.com
                <br />
                사업자등록번호: 000-00-00000 | 대표: HYONIX
            </article>
            <img src={logo} />
        </section>
    )
}

export default Footer
