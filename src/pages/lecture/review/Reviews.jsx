import React from 'react'
import './Reviews.css'
import { useParams } from 'react-router-dom'
import leftArrow from '../../../assets/leftArrow.svg'

function Reviews() {
    const lectureId = useParams().id;
    const lecture = {
        id: 123,
        title: ''
    }
    return (
        <div className='review-layout'>
            <div className='review-back'>
                <img src={leftArrow} width="20" height="20" />
                <p>강의 상세보기로 돌아가기</p>
            </div>
            <div className='review-head'>
                <h2>수강생 후기</h2>
                <p></p>
            </div>
            <div className='review-dashboard'></div>
            <div className='review-filter'></div>
            <div className='review-list'></div>
            <div className='review-page'></div>
        </div>
    )
}

export default Reviews
