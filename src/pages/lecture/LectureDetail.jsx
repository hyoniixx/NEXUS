import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './LectureDetail.css'

function LectureDetail() {
    const lectureId = useParams();
    const [isOn, setIsOn] = useState(false);
    const [isWished, setIsWished] = useState(false);
    const [badge, setBadge] = useState({ pro: true, streamer: true })
    return (
        <div className='detail-layout'>
            <p className='toLink toLectureList'>← 강의 목록으로</p>
            <div className='detail-content-layout'>
                <div className='detail'>
                    <div className='detail-head'>
                        <div className='profile'>
                            <div className='profileImg'>img</div>
                            <div className='profileDetail'>
                                <div className='profileName'>
                                    <p>이름</p>
                                    <div className='badge' style={{ display: `${badge.pro ? 'flex' : 'none'}` }}>프로 뱃지</div>
                                    <div className='badge' style={{ display: `${badge.streamer ? 'flex' : 'none'}` }}>스트리머 뱃지</div>
                                </div>
                                <div className='profileTier'>
                                    <div></div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detail-intro'>

                    </div>
                    <div className='detail-info'>

                    </div>
                    <div className='detail-curriculum'>

                    </div>
                    <div className='detail-review'>

                    </div>
                </div>
                <div className='detail-box'>
                    <h2></h2>
                    <button onClick={() => setIsOn(!isOn)} disabled={isOn ? true : false}>{isOn ? "수강 중" : "수강 신청하기"}</button>
                    <button onClick={() => setIsWished(!isWished)}>{isWished ? "🤍찜 하기" : "❤️찜 취소"}</button>
                </div>
            </div >
        </div>
    )
}

export default LectureDetail
