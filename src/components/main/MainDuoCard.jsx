import React from 'react'

function MainDuoCard({ image, name, content, wanted }) {
    return (
        <div className='duoCard'>
            <img src={image} alt="" className='duoProfile' />
            <div className='duoContent'>
                <h3>{name}</h3>
                <p>{content}</p>
            </div>
            <div className='wanted'>
                {wanted}
            </div>
        </div>
    )
}

export default MainDuoCard
