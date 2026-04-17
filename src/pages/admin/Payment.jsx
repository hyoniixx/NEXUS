import React, { useContext } from 'react'
import { PageContext } from './Money.jsx'
import PaymentListItem from '../../components/admin/PaymentListItem.jsx';
import './Payment.css'

function Payment() {
    const { pageNow, total } = useContext(PageContext);
    return (
        <div className='payment-layout'>
            <div className='payment-header'>
                <h2>정산 내역</h2>
                <select name="" id="">
                    <option value="">전체</option>
                    <option value="">정산 미완료</option>
                    <option value="">정산 완료</option>
                </select>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)}/{Number(total)}개</p>
            </div>
            <div className='payment-list'>
                <PaymentListItem isCompleted='false' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
            </div>
        </div>
    )
}

export default Payment