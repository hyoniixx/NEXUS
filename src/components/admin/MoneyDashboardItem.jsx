import React from 'react'
import './MoneyDashboardItem.css'
import getMoney from '../../assets/moneyDollar.svg'
import wait from '../../assets/moneyTimer.svg'
import completed from '../../assets/moneyGraph.svg'
import total from '../../assets/moneyIcon.svg'

function MoneyDashboardItem({ type, value }) {
    // type의 종류는...
    // getMoney(입금완료), wait(대기정산),
    // completed(완료정산), total(총수수료)
    var icon = getMoney;
    var text = '입금 완료'
    var cardbg = {
        border: '0.701px solid rgba(59, 130, 246, 0.20)',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.05) 100%)'
    }
    var iconbg = 'rgba(59, 130, 246, 0.20)';
    switch (type) {
        case "getMoney":
            icon = getMoney;
            text = '입금 완료';
            cardbg = {
                border: '0.701px solid rgba(59, 130, 246, 0.20)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.05) 100%)'
            };
            iconbg = 'rgba(59, 130, 246, 0.20)';
            break;
        case "wait":
            icon = wait;
            text = "대기 정산";
            cardbg = {
                border: '0.701px solid rgba(255, 105, 0, 0.20)',
                background: 'linear-gradient(135deg, rgba(255, 105, 0, 0.10) 0%, rgba(255, 105, 0, 0.05) 100%)'
            };
            iconbg = 'rgba(255, 105, 0, 0.20)';
            break;
        case "completed":
            icon = completed;
            text = '완료 정산';
            cardbg = {
                border: '0.701px solid rgba(139, 92, 246, 0.20)',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.10) 0%, rgba(139, 92, 246, 0.05) 100%)'
            };
            iconbg = 'rgba(139, 92, 246, 0.20)';
            break;
        case "total":
            icon = total;
            text = "총 수수료";
            cardbg = {
                border: '0.701px solid rgba(148, 163, 184, 0.20)',
                backgroundColor: 'rgba(8,5,2,0)'
            };
            iconbg = 'rgba(8,5,2,0)';
            break;
        default:
            icon = getMoney;
            text = "입금 완료";
            cardbg = {
                border: '0.701px solid rgba(59, 130, 246, 0.20)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.05) 100%)'
            };
            iconbg = 'rgba(59, 130, 246, 0.20)';
            break;
    }

    return (
        <div className='money-dashboard-item' style={cardbg}>
            <div className='money-dashboard-item-header' >
                <div style={{ backgroundColor: iconbg }}>
                    <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />
                </div>
                <p>{text}</p>
            </div>
            <div className='money-dashboard-item-value'>
                {Number(value).toLocaleString()}원
            </div>
        </div>
    )
}

export default MoneyDashboardItem
