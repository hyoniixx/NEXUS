import React, { useState } from 'react'
import './ReviewItem.css'
import filledStar from '../../assets/filledStar.svg'
import ReviewLectureModal from '../common/ReviewLectureModal';



function ReviewItem({ review, currentUserId }) {//name, content, date, star
    const stars = [false, false, false, false, false];
    const { name, content, date, star } = review;
    const isMine = review.uid === currentUserId;
    for (let i = 0; i < Number(star); i++) {
        stars[i] = true
    }
    const [isModal, setIsModal] = useState(false);
    return (
        <>
            <ReviewLectureModal
                isModal={isModal}
                onClose={() => setIsModal(false)}
                review={review}
                currentUserId={currentUserId}
                type={isMine ? 'edit' : 'view'}
            />
            <div className='review-page-list-items' onClick={() => setIsModal(!isModal)}>
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
        </>
    )
}

export default ReviewItem
