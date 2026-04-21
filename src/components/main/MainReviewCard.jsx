import React from 'react'
import emptyStar from '../../assets/emptyStar.svg'
import profile from '../../assets/defaultProfile.svg'

function MainReviewCard({ image, reviewer, date, star, content }) {
    const stars = [false, false, false, false, false];
    for (let i = 0; i < Number(star); i++) {
        stars[i] = true
    }
    return (
        <div className='reviewCard'>{/*컴포넌트*/}
            <div className='reviewCard-top'>
                <img src={profile} className='review-profile' />
                <div className='reviewer'>
                    <p>{reviewer}</p>
                    <h6>{date}</h6>
                </div>
                <div className='review-star'>
                    {stars.map((item) => {
                        if (item) return <img src={emptyStar} alt="" width="16" height="16" />
                    })}
                </div>
            </div>
            <div className='review-content'>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default MainReviewCard
