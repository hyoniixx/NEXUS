import React from 'react'
import MainMyInfoCards from '../../components/main/MainMyInfoCards'
import './NexusMainAdmin.css'
import staticIcon from "../../assets/staticIcon.svg"
import moneyIcon from "../../assets/moneyIcon.svg"
import LectureItem from '../../components/lecture/LectureItem'

function NexusMainAdmin() {
    const user = { userName: '김관리' }
    const total = { member: 12345, review: 1234, star: 4.44234 }
    const money = { month: 1234567, increased: 1234 }
    const time = new Date();

    return (
        <div className='main-admin-dashboard'>
            <div className='main-hello'>
                <h1>관리자 {user.userName}님, </h1>
                <h1>환영합니다🎯</h1>
                <p>전체 시스템을 관리하고 모니터링하세요</p>
            </div>
            <div className='main-myInfo'>
                <div className='main-myInfo-profile'>
                    <div className='main-myInfo-profile-top'>
                        <div className='profileImg'>profileImg</div>
                        <div >
                            <p style={{ color: 'white', fontSize: "22px" }}>{user.userName}님</p>
                        </div>
                    </div>
                    <p>내 프로필 보기 →</p>
                </div>
                <div className='main-myInfoCards'>
                    <MainMyInfoCards key='profile' type='profile' />
                    <MainMyInfoCards key='lecture-list' type='lecture-list' />
                    <MainMyInfoCards key='member' type='member' />
                    <MainMyInfoCards key='money' type='money' />
                </div>
            </div>
            <div className='main-static'>
                <div className='main-staticUser'>
                    <div className='main-staticUser-top'>
                        <img src={staticIcon} alt="" width="20" height="20" />
                        <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>사이트 통계</p>
                    </div>
                    <div className='main-staticUser-bottom'>
                        <div className='static-member'>
                            <h3 style={{ color: '#3B82F6' }}>{Number(total.member).toLocaleString()}명</h3>
                            <p>총 회원 수</p>
                        </div>
                        <div className='static-review'>
                            <h3 style={{ color: '#8B5CF6' }}>{Number(total.review).toLocaleString()}개</h3>
                            <p>총 후기 수</p>
                        </div>
                        <div className='static-star'>
                            <h3 style={{ color: '#E8EAF0' }}>{Number(total.star).toFixed(2)}</h3>
                            <p>총 평균 평점</p>
                        </div>
                    </div>
                </div>
                <div className='main-staticMoney'>
                    <div className='main-staticMoney-top'>
                        <img src={moneyIcon} alt="" width="20" height="20" />
                        <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>수익 통계</p>
                    </div>
                    <div className='main-staticMoney-bottom'>
                        <p>이번달 총 매출({time.toLocaleDateString()} 기준)</p>
                        <h2>₩ {Number(money.month).toLocaleString()}</h2>
                        <h6>전달 대비 +₩{Number(money.increased).toLocaleString()}</h6>
                    </div>
                </div>
            </div>
            <div className='main-lectureRecommend'>
                <h2>최근 개설된 강의</h2>
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
        </div>
    )
}

export default NexusMainAdmin
