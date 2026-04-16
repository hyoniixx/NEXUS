import React, { useContext } from 'react'
import { PageContext } from './Money.jsx'

function Payment() {
    const { pageNow, total } = useContext(PageContext);
    return (
        <div className='payment-layout'>
            <div className='payment-header'>
                <h2>입금 내역</h2>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)}/{Number(total)}개</p>
            </div>
            <div className='payment-list'>
                <div className='payment-list-item'>asdf</div>
                <div className='payment-list-item'>asdf</div>
                <div className='payment-list-item'>asdf</div>
                <div className='payment-list-item'>asdf</div>
                <div className='payment-list-item'>asdf</div>
            </div>
        </div>
    )
}

export default Payment