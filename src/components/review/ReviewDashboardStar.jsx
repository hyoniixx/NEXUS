import React from 'react'
import './ReviewDashboardStar.css'
import filledStar from '../../assets/filledStar.svg'

function ReviewDashboardStar({ star, now, all }) {
    return (
        <div className='review-dashboard-star-item'>
            <div className='review-dashboard-star-head'>
                <p>{Number(star)}</p>
                <img src={filledStar} width='12px' height='12px' />
            </div>
            <div className='review-dashboard-gauge' style={{ display: 'grid', gridTemplateColumns: `${now}fr ${all - now}fr` }}>
                <div className='review-dashboard-gaugeExist'></div>
                <div className='review-dashboard-gaugeRemain'></div>
            </div>
            <div className='review-dashboard-count'>
                <p>{now}개</p>
            </div>
        </div >
    )
}

export default ReviewDashboardStar
