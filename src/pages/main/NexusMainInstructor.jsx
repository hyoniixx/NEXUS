import React from 'react'
import './NexusMainInstructor.css'
import LectureItem from '../../components/lecture/LectureItem';
import MainMyInfoCards from '../../components/main/MainMyInfoCards';
import MainReviewCard from '../../components/main/MainReviewCard';
import MainStudentCard from '../../components/main/MainStudentCard';
import tierUp from '../../assets/tierUp.svg'

function NexusMainInstructor() {
    const user = { userName: '김태완', userTier: 2, userCsScore: 80 };
    return (
        <>
            <div className='main-student-dashboard'>
                <div className='main-hello'>
                    <h1>{user.userName}님, </h1>
                    <h1>오늘도 멋진 강의로</h1>
                    <h1>학생들을 만나보세요👌</h1>
                    <p>당신의 경험을 나누세요</p>
                </div>
                <div className='main-myInfo'>
                    <div className='main-myInfo-profile'>
                        <div className='main-myInfo-profile-top'>
                            <div className='profileImg'>profileImg</div>
                            <div>
                                <p style={{ color: 'white', fontSize: "22px" }}>{user.userName}님</p>
                                <p style={{ color: '#3B82F6' }}>현재티어 : {user.userTier}</p>
                                <p style={{ color: '#94A3B8' }}>현재 CS점수 : {user.userCsScore}</p>
                            </div>
                        </div>
                        <p>내 프로필 보기 →</p>
                    </div>
                    <div className='main-myInfoCards'>
                        <MainMyInfoCards key='profile' type='profile' />
                        <MainMyInfoCards key='instructor-lecture' type='instructor-lecture' />
                        <MainMyInfoCards key='duo' type='duo' />
                    </div>
                </div>
                <div className='main-status'>
                    <div className='main-statusNow'>
                        <div className='main-statusNow-top'>
                            <img src={tierUp} alt="" width="20" height="20" />
                            <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>내 현재 상태</p>
                        </div>
                        <div className='main-statusNow-bottom'>
                            <div className='main-statusNow-bottom-img'>img</div>
                            <div className='main-statusNow-bottom-level'>
                                <h6 style={{ color: 'white' }}>드래곤</h6>
                                <div className='main-statusNow-bottom-level-gauge' style={{ gridTemplateColumns: '25fr 247fr' }}>
                                    <div className='gauge-now' style={{ backgroundColor: "#3B82F6" }}></div>
                                    <div className='gauge-full' style={{ backgroundColor: '#1E293B' }}></div>
                                </div>
                                <p style={{ color: '#94A3B8' }}>승격율 : {user.userCsScore}</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-statusNext'>
                        <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>다음 등급까지</p>
                        <div className='main-statusNow-bottom-level'>
                            <h6 style={{ color: 'white' }}>드래곤</h6>
                            <div className='main-statusNow-bottom-level-gauge' style={{ gridTemplateColumns: '25fr 247fr' }}>
                                <div className='gauge-now' style={{ backgroundColor: "#3B82F6" }}></div>
                                <div className='gauge-full' style={{ backgroundColor: '#1E293B' }}></div>
                            </div>
                            <p style={{ color: '#94A3B8' }}>승격율 : {user.userCsScore}</p>
                        </div>
                    </div>
                </div>
                <div className='main-lectureRecommend'>
                    <h2>내 강의 현황</h2>
                    <div className='main-lectureItems'>
                        <LectureItem key='1' lecture={{
                            id: 9,
                            instructorName: "Peanut",
                            badgeType: "STREAMER",
                            title: "정글 동선 완벽 이해",
                            line: "정글",
                            level: "중급",
                            champion: "세주아니",
                            rating: 4.7,
                            reviewCount: 68,
                            price: 38000,
                            isLiked: false
                        }} />
                        <LectureItem key='2' lecture={{
                            id: 9,
                            instructorName: "Peanut",
                            badgeType: "STREAMER",
                            title: "정글 동선 완벽 이해",
                            line: "정글",
                            level: "중급",
                            champion: "세주아니",
                            rating: 4.7,
                            reviewCount: 68,
                            price: 38000,
                            isLiked: false
                        }} />
                        <LectureItem key='3' lecture={{
                            id: 9,
                            instructorName: "Peanut",
                            badgeType: "STREAMER",
                            title: "정글 동선 완벽 이해",
                            line: "정글",
                            level: "중급",
                            champion: "세주아니",
                            rating: 4.7,
                            reviewCount: 68,
                            price: 38000,
                            isLiked: false
                        }} />
                    </div>
                </div>
                <div className='main-bottom'>
                    <div className='main-bottom-reviews'>
                        <div className='main-bottom-reviews-head'>
                            <h2>최근 수강생 후기</h2>
                            <p className='toLink'>관리</p>
                        </div>
                        <div className='main-bottom-reviews-dashboard'>
                            <div>
                                <p>수강생</p>
                                <h6>8명</h6>
                            </div>
                            <div>
                                <p>수강생 평점</p>
                                <h6>4.8</h6>
                            </div>
                            <div>
                                <p>작성된 리뷰</p>
                                <h6>1248</h6>
                            </div>
                        </div>
                        <MainReviewCard image='' reviewer='김학생' date='2026.04.14' star='3' content="재밌었습니다." />
                    </div>
                    <div className='main-bottom-students'>
                        <div className='main-bottom-students-head'>
                            <h2>최근 강의</h2>
                            <p className='toLink'>관리</p>
                        </div>
                        <div className='students-card-list'>
                            <MainStudentCard image='' name='김학생' date='2026.03.12' status='1' />
                            <MainStudentCard image='' name='김학생' date='2026.03.12' status='2' />
                            <MainStudentCard image='' name='김학생' date='2026.03.12' status='3' />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default NexusMainInstructor
