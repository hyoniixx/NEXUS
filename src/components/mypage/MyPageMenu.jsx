import React from 'react'
import { useNavigate } from 'react-router-dom'
import myPageCalender from '../../assets/myPageCalender.svg'
import myPageDuo from '../../assets/myPageDuo.svg'

function MyPageMenu({ menu }) {
    const navigate = useNavigate();
    return (
        <article className='m-myPage-myMenu-item' onClick={() => navigate(menu.url)}>
            <div className='m-myPage-myMenu-img'><img src={menu.title === '내 듀오' ? myPageDuo : myPageCalender} /></div>
            <div>
                <h5>{menu.title}</h5>
                <p>{menu.content}</p>
            </div>
        </article>
    )
}

export default MyPageMenu
