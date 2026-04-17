import React from 'react'
import './PaymentListItem.css'
import money from '../../assets/moneyGraph.svg'
import check from '../../assets/paymentCheck.svg'

function PaymentListItem({ isCompleted, name, id, title, price, date }) {
    const priceList = [ //입금, 수수료, 정산
        price, price * 0.1, price * 0.9
    ]
    return (
        <div className='payment-list-item'>
            <div className='payment-list-item-header'>
                <div className='payment-icon-container'>
                    <img src={money} width='24px' height='24px' />
                </div>
                <div className='payment-list-item-status' style={{ background: isCompleted === 'true' ? "rgba(0, 201, 80, 0.10)" : "rgba(240, 177, 0, 0.10)" }}>
                    <p style={{ color: isCompleted === 'true' ? '#00C950' : '#F0B100' }}>{isCompleted === 'true' ? "완료" : "미완료"}</p>
                </div>
            </div>
            <div className='payment-list-item-content'>
                <div className='payment-list-item-user'>
                    <h6>{name}</h6>
                    <p>({id})</p>
                </div>
                <div className='payment-list-item-title'>
                    <p>{title}</p>
                </div>
            </div>
            <div className='payment-list-item-rightend'>
                <button className='payment-list-item-button' style={{ display: isCompleted === 'true' ? "none" : "flex" }}>
                    <img src={check} width="16" height="16" />
                    <p>완료 처리</p>
                </button>
                <div className='payment-list-item-detail'>
                    <div className='payment-list-item-detail-get'>
                        <h6>입금액: </h6>
                        <p>{Number(priceList[0]).toLocaleString()}원</p>
                    </div>
                    <div className='payment-list-item-detail-minus'>
                        <h6>수수료: </h6>
                        <p>-{Number(priceList[1]).toLocaleString()}원</p>
                    </div>
                    <div className='payment-list-item-detail-result'>
                        <h6>정산금: </h6>
                        <p>{Number(priceList[2]).toLocaleString()}원</p>
                    </div>
                    <div className='payment-list-item-detail-date'>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentListItem
