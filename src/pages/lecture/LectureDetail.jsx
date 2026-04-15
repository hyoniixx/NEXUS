import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './LectureDetail.css'
import star from '../../assets/star.svg'
import book from '../../assets/book.svg'
import CurriculumItem from '../../components/lecture-detail/CurriculumItem'
import rightArrow from '../../assets/rightArrow.svg'
import LectureReviewItem from '../../components/lecture-detail/LectureReviewItem'
import hart from '../../assets/like_filled_badge.png'
import emptyHart from '../../assets/like_empty_badge.png'
import probadge from '../../assets/probadge.png'
import strmbadge from '../../assets/strmbadge.png'
import tier4 from '../../assets/tier4.png'

function LectureDetail() {
    const lectureId = useParams().id; //url 기준 강의 ID 받아옴
    const [isOn, setIsOn] = useState(false); //수강 상태 관리
    const [isWished, setIsWished] = useState(false); //찜하기 눌렀는지 여부
    const [badge, setBadge] = useState({ pro: true, streamer: true }) //강사 정보 받아와서 프로,스트리머 여부 객체에 담기
    const navigate = useNavigate();
    // console.log(lectureId);
    return (
        <div className='detail-layout'>
            <p className='toLectureList'>← 강의 목록으로</p>
            <div className='detail-content-layout'>
                <div className='detail'>
                    <div className='detail-head'>
                        <div className='detail-head-profile'>
                            <div className='detail-head-profileImg'>img</div>
                            <div className='detail-head-profileDetail'>
                                <div className='detail-head-profileName'>
                                    <p>페이커 선생님</p>
                                    <img src={probadge} className='badge' style={{ display: `${badge.pro ? 'flex' : 'none'}` }} />
                                    <img src={strmbadge} className='badge' style={{ display: `${badge.streamer ? 'flex' : 'none'}` }} />
                                </div>
                                <div className='detail-head-profileTier'>
                                    <img src={tier4} className='tierBadge' />
                                    <p>칼날부리</p>
                                </div>
                            </div>
                        </div>
                        <div className='detail-head-title'>
                            <h6>다이아 돌파를 위한 미드 라이너 마스터 클래스</h6>
                        </div>
                        <div className='detail-head-image'>
                            이미지
                        </div>
                    </div>
                    <div className='detail-intro'>
                        <h6>강의 소개</h6>
                        <p>프로게이머 Faker의 실전 미드 라인 강의. 라인전 운영부터 로밍 타이밍, 한타 포지셔닝까지 완벽 마스터.</p>
                    </div>
                    <div className='detail-info'>
                        <div className='detail-info-head'>
                            <p>강의 정보</p>
                        </div>
                        <div className='detail-info-content'>
                            <div className='detail-info-time'>
                                <h6>수업 시간</h6>
                                <p>1시간</p>
                            </div>
                            <div className='detail-info-diff'>
                                <h6>난이도</h6>
                                <p>중급</p>
                            </div>
                            <div className='detail-info-star'>
                                <h6>평점</h6>
                                <div className='detail-info-star-content'>
                                    <img src={star} style={{ width: '16px', height: '16px', color: 'white' }} />
                                    <p>4.4</p>
                                    <h5>(123개 리뷰)</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detail-curriculum'>
                        <div className='detail-curriculum-head'>
                            <img src={book} alt="" width="19" height="20" />
                            <p>커리큘럼</p>
                        </div>
                        <div className='detail-curriculum-list'>
                            <CurriculumItem index='1' content='1회차 수업 내용' />
                            <CurriculumItem index='2' content='2회차 수업 내용' />
                            <CurriculumItem index='3' content='3회차 수업 내용' />
                        </div>
                    </div>
                    <div className='detail-review'>
                        <div className='detail-review-head'>
                            <p>수강생 후기</p>
                            <div>
                                <p onClick={() => navigate(`reviews`)}>전체 보기</p>
                                <img src={rightArrow} alt="" width="6" height="10" />
                            </div>
                        </div>
                        <div className='detail-review-list'>
                            <LectureReviewItem name='김수강' content='좋은 강의입니다.' star='4' />
                        </div>
                    </div>
                </div>
                <div className='detail-box'>
                    <h2>55,000원</h2>
                    <button
                        onClick={() => setIsOn(!isOn)}
                        disabled={isOn ? true : false}
                        className='detail-box-top-button'
                        style={{ display: `${isOn ? 'none' : 'default'}` }}
                    >
                        {isOn ? "수강 중" : "수강 신청하기"}
                    </button>
                    <div className='detail-box-top-on' style={{ display: `${!isOn ? 'none' : 'flex'}` }}>
                        <p>수강 중</p>
                    </div>
                    <button
                        onClick={() => setIsWished(!isWished)}
                        className='detail-box-bottom-button'
                    >
                        {isWished ? <><img src={hart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 취소</p></> : <><img src={emptyHart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 하기</p></>}
                    </button>
                </div>
            </div >
        </div>
    )
}

export default LectureDetail
