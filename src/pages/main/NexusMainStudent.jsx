import React from 'react'
import "./NexusMainStudent.css"
import LectureItem from '../../components/lecture/LectureItem';
import MainMyInfoCards from '../../components/main/MainMyInfoCards';
import tierUp from "../../assets/tierUp.svg"
import MainLectureCard from '../../components/main/MainLectureCard';
import MainDuoCard from '../../components/main/MainDuoCard';
function NexusMainStudent() {
    const user = { userName: '김태완', userTier: 2, userCsScore: 80 };
    return (
        <div className='main-student-dashboard'>
            <div className='main-hello'>
                <h1>{user.userName}님, </h1>
                <h1>환영합니다🖐️</h1>
                <p>오늘도 꾸준히 성장하세요. </p>
                <p>더 강한 소환사가 되어보세요!</p>
            </div>
            <div className='main-myInfo'>
                <div className='main-myInfo-profile'>
                    <div className='main-myInfo-profile-top'>
                        <div className='profileImg'>profileImg</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'white', fontSize: "22px" }}>{user.userName}님</p>
                            <p style={{ color: '#3B82F6' }}>현재티어 : {user.userTier}</p>
                            <p style={{ color: '#94A3B8' }}>현재 CS점수 : {user.userCsScore}</p>
                        </div>
                    </div>
                    <p>내 프로필 보기 →</p>
                </div>
                <div className='main-myInfoCards'>
                    <MainMyInfoCards key='profile' type='profile' />
                    <MainMyInfoCards key='student-lecture' type='student-lecture' />
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
                <h2>{user.userName}님께 추천하는 강의</h2>
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
                <div className='main-bottom-duo'>
                    <div className='main-bottom-duo-head'>
                        <h2>최근 올라온 듀오</h2>
                        <p className='toLink'>듀오 리스트 보기</p>
                    </div>
                    <MainDuoCard image='' name='SKT T1 FAKER' content='캐리해드립니다.' wanted='탑라이너' />
                </div>
                <div className='main-bottom-lecture'>
                    <div className='main-bottom-lecture-head'>
                        <h2>최근 내 강의</h2>
                        <p className='toLink'>강의 목록 보기</p>
                    </div>
                    <MainLectureCard key='1' title='마스터 클래스 탑 강의' status='진행중' instructor='김 코치 선생' type='화상' />
                </div>

            </div>
        </div >
    )
}

export default NexusMainStudent
