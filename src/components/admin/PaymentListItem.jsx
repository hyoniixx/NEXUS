import React from 'react'
import './PaymentListItem.css'
import money from '../../assets/moneyGraph.svg'
import check from '../../assets/paymentCheck.svg'

function PaymentListItem() {
    return (
        <div className='payment-list-item'>
            <div className='payment-list-item-header'>
                <div>
                    <img src={money} />
                </div>
                <div className='payment-list-item-status'></div>
            </div>
            <div className='payment-list-item-content'>

            </div>
            <div className='payment-list-item-button'>
                <img src={check} width="15" height="15" />
                <button></button>
            </div>
            <div className='payment-list-item-detail'>

            </div>
        </div>
    )
}

export default PaymentListItem
