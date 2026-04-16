import React from 'react'
import './ReviewItem.css'
import filledStar from '../../assets/filledStar.svg'


function ReviewItem({ name, content, date, star }) {
    const stars = [false, false, false, false, false];
    for (let i = 0; i < Number(star); i++) {
        stars[i] = true
    }
    return (
        <div className='review-page-list-items'>
            <div className='review-page-list-item-header'>
                <img className='review-page-list-item-profile' />
                <div className='review-page-list-item-middle'>
                    <h6>{name}</h6>
                    <p>{date}</p>
                </div>
                <div className='review-page-list-item-star'>
                    {stars.map((item) => {
                        if (item) return <img src={filledStar} alt="" width="16" height="16" />
                    })}
                </div>
            </div>
            <div className='review-page-list-item-content'>
                <p>{content}</p>
            </div>

        </div>
    )
}

export default ReviewItem
