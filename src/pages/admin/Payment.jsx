import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from './Money.jsx'
import PaymentListItem from '../../components/admin/PaymentListItem.jsx';
import './Payment.css'

function Payment() {
    const { pageNow, total, showList, setShowList, moneyList, setFilteredList, filteredList } = useContext(PageContext);
    const [sort, setSort] = useState(); //필터 관리(select태그)
    useEffect(() => {
        switch (sort) {
            case 'no':
                setFilteredList(moneyList.filter(item => !item.completed));
                break;
            case 'yes':
                setFilteredList(moneyList.filter(item => item.completed));
                break;
            default:
                setFilteredList(moneyList);
                break;
        }
    }, [sort, moneyList])

    return (
        <div className='payment-layout'>
            <div className='payment-header'>
                <h2>정산 내역</h2>
                <select name="" id="" onChange={(e) => setSort(e.target.value)}>
                    <option value="all">전체</option>
                    <option value="no">정산 미완료</option>
                    <option value="yes">정산 완료</option>
                </select>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)}/{Number(total)}개</p>
            </div>
            <div className='payment-list'>
                {showList.length === 0 ? (
                    <div className='deposit-nothing'>
                        <h1>검색 결과를 확인해주세요.</h1>
                    </div>
                ) : (
                    showList.map((item, index) => {
                        return (
                            // <DepositListItem studentName={item.student} studentId={item.studentEmail} lectureTitle={item.title} price={item.price} date={item.createdAt} />
                            <PaymentListItem
                                isCompleted={item.completed}
                                name={item.instructor}
                                email={item.instructorEmail}
                                title={item.title}
                                price={item.price}
                                date={item.createdAt}
                                student={item.student}
                                studentId={item.studentEmail}
                                id={item.id} />
                        )
                    }))}
                {/* <PaymentListItem isCompleted='false' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' />
                <PaymentListItem isCompleted='true' name='이상혁' id='inst_faker' title='미드 강의의 정석' price='45000' date='2026.04.04' /> */}
            </div>
        </div>
    )
}

export default Payment