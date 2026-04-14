import React from 'react'

function MainReviewCard({ image, reviewer, date, star, content }) {
    const stars = [false, false, false, false, false];
    for (let i = 0; i < Number(star); i++) {
        stars[i] = true
    }
    return (
        <div className='reviewCard'>{/*컴포넌트*/}
            <div className='reviewCard-top'>
                <img src={image} alt='' className='review-profile' />
                <div className='reviewer'>
                    <p>{reviewer}</p>
                    <h6>{date}</h6>
                </div>
                <div className='review-star'>
                    {stars.map((item) => {
                        if (item) return <p>★</p>
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
