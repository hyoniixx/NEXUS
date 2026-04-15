import React from 'react'
import "./LectureReviewItem.css"
import emptyStar from '../../assets/emptyStar.svg'

function LectureReviewItem({ name, content, star }) {
    const stars = [false, false, false, false, false];
    for (let i = 0; i < Number(star); i++) {
        stars[i] = true
    }
    return (
        <div className='lecture-review-item'>
            <div className='lecture-review-top'>
                <p>{name}</p>
                <div className='lecture-review-star'>
                    {stars.map((item) => {
                        if (item) return <img src={emptyStar} alt="" width="16" height="16" />
                    })}
                </div>
            </div>
            <div className='lecture-review-bottom'>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default LectureReviewItem
