import React from 'react'
import './MemberListItem.css'

function MemberListItem({ name, id, role, email, date, score, isblack }) {
    return (
        <div className='member-list-item'>
            <div className='member-list-item-profile'>
                <img src="" alt="" width="48px" height="48px" style={{ border: '1px solid black' }} />
                <div className='member-list-item-name'>
                    <h6>{name}</h6>
                    <p>{id}</p>
                </div>
            </div>
            <div className='member-list-item-info'>
                <div className='member-list-item-role'>
                    <h6>직책 : </h6>
                    <p>{role}</p>
                </div>
                <div className='member-list-item-email'>
                    <h6>이메일 : </h6>
                    <p>{email}</p>
                </div>
            </div>
            <div className='member-list-item-date'>
                <h6>가입일 : </h6>
                <p>{date}</p>
            </div>
            <div className='member-list-item-footer'>
                <div className='member-list-item-score'>
                    <img src="" alt="" />
                </div>
                <div className='member-list-black-button'>

                </div>
            </div>
        </div>
    )
}

export default MemberListItem
