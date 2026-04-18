import React, { useContext, useEffect, useState } from 'react'
import './Deposit.css'
import { PageContext } from './Money.jsx'
import DepositListItem from '../../components/admin/DepositListItem.jsx';
import { getMoneyList } from '../../service/MoneyManagement.js'

function Deposit() {

    const { pageNow, total, showList, setMoneyList } = useContext(PageContext);
    return (
        <div className='deposit-layout'>
            <div className='deposit-header'>
                <h2>입금 내역</h2>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)}/{Number(total)}개</p>
            </div>
            <div className='deposit-list'>
                {showList.length === 0 ? (
                    <div className='deposit-nothing'>
                        <h1>검색 결과를 확인해주세요.</h1>
                    </div>
                ) : (
                    showList.map((item, index) => {
                        return (
                            <DepositListItem
                                studentName={item.student}
                                studentId={item.studentEmail}
                                instructorName={item.instructor}
                                instructorId={item.instructorEmail}
                                lectureTitle={item.title}
                                price={item.price}
                                date={item.createdAt}
                            />
                        )
                    })
                )
                }
                {/* <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' />
                <DepositListItem studentName='김학생' studentId='student01' lectureTitle='정글의 정석 - 기초편' price='50000' date='2026.04.04 04:44' /> */}
            </div>
        </div>
    )
}

export default Deposit
