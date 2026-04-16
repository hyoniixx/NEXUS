import React, { useContext, useEffect, useState } from 'react'
import './Deposit.css'
import { PageContext } from './Money.jsx'
import DepositListItem from '../../components/admin/DepositListItem.jsx';

function Deposit() {
    const { pageNow, total } = useContext(PageContext);
    return (
        <div className='deposit-layout'>
            <div className='deposit-header'>
                <h2>입금 내역</h2>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)}/{Number(total)}개</p>
            </div>
            <div className='deposit-list'>
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
            </div>
        </div>
    )
}

export default Deposit
