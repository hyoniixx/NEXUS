import React, { useState } from 'react'
import './Modal.css';
import './ReviewDuoModal.css';

function ReviewDuo() {
    const [isModal, setIsModal] = useState(false);
    const [duoReview, setDuoReview] = useState('');

    const handleClickReview = (e) => {
        setDuoReview(e.target.id)
    }

    const closeModal = () => {
        setIsModal(false);
    }

    const activeModal = () => {
        setIsModal(false);
    }


    return (
        <section className="c-modal-background" onClick={closeModal} >
            <div className="c-review-duo-modal-ct" onClick={(e) => e.stopPropagation()}>
                <article>
                    <h3>듀오 평가</h3>
                    <p>Faker님과의 듀오 경험을 평가해주세요.</p>
                </article>
                <article className='c-review-duo-modal-select-ct'>
                    <div id='very bad' onClick={(e) => handleClickReview(e)}>
                        <p>😞</p>
                        <p>정말 별로예요</p>
                    </div>
                    <div id='bad' onClick={(e) => handleClickReview(e)}>
                        <p>🙁</p>
                        <p>별로예요</p>
                    </div>
                    <div id='soso' onClick={(e) => handleClickReview(e)}>
                        <p>😐</p>
                        <p>보통이에요</p>
                    </div>
                    <div id='good' onClick={(e) => handleClickReview(e)}>
                        <p>😊</p>
                        <p>좋아요</p>
                    </div>
                    <div id='very good' onClick={(e) => handleClickReview(e)}>
                        <p>🥰</p>
                        <p>정말 좋아요</p>
                    </div>
                </article>
                <article className='c-modal-btn-ct'>
                    <button onClick={activeModal} className='c-modal-btn-yes'>취소</button>
                    <button onClick={closeModal} className='c-modal-btn-no'>평가완료</button>
                </article>
            </div>
        </section>
    )
}

export default ReviewDuo
