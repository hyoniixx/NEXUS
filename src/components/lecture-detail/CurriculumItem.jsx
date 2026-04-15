import React from 'react'
import './CurriculumItem.css'

function CurriculumItem({ index, content }) {
    return (
        <div className='detail-curriculum-item'>
            <div className='index'><p>{index}</p></div>
            <div className='content'><p>{content}</p></div>
        </div>
    )
}

export default CurriculumItem
