import React from 'react'

function MainLectureCard({
    title, instructor, type, status
}) {
    return (
        <div className='lectureCard'>
            <div className='lectureContent'>
                <h3>{title}</h3>
                <div className='lectureStatus'>{status}</div>
            </div>
            <div className='lectureInfo'>
                <p className='lectureInstructor'>{instructor}</p>
                <p className='lectureType'>· {type}시간</p>
            </div>
        </div>
    )
}

export default MainLectureCard
