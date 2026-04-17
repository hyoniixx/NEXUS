import React from 'react'
import './DepositListItem.css'
import moneyIcon from '../../assets/moneyDollar.svg'

function DepositListItem({ studentName, studentId, lectureTitle, price, date }) {
    return (
        <div className='deposit-list-item'>
            <div className='deposit-list-item-header'>
                <img src={moneyIcon} width='24px' height='24px' />
            </div>
            <div className='deposit-list-item-content'>
                <div className='deposit-list-item-name'>
                    <h6>{studentName}</h6>
                    <p>{studentId}</p>
                </div>
                <div className='deposit-list-item-title'>
                    <p>{lectureTitle}</p>
                </div>
            </div>
            <div className='deposit-list-item-detail'>
                <h6>+{Number(price).toLocaleString()}원</h6>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default DepositListItem
