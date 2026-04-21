import React, { useContext, useEffect, useState } from 'react'
import MainMyInfoCards from '../../components/main/MainMyInfoCards'
import './NexusMainAdmin.css'
import staticIcon from "../../assets/staticIcon.svg"
import moneyIcon from "../../assets/moneyIcon.svg"
import LectureItem from '../../components/lecture/LectureItem'
import { userContext } from '../../App'
import { getLectures } from "../../service/LectureService";
import { useNavigate } from 'react-router-dom'
import { getUserList } from '../../service/MemberViewService.js';
import { getMoneyList } from '../../service/MoneyManagement.js'
import { getReviewStatic, getReviewTotal } from '../../service/ReviewService.js'
import profile from '../../assets/defaultProfile.svg'

function NexusMainAdmin() {
    const { userData } = useContext(userContext);
    const [total, setTotal] = useState({ member: 0, review: 1234, star: 4.44234 });
    const [money, setMoney] = useState({ month: 0, total: 0 })
    const time = new Date();
    const [lectureList, setLectureList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const lender = async () => {
            const tempLectures = await getLectures(); //강의정보
            const tempUser = await getUserList(); //유저정보
            const tempMoney = await getMoneyList(); //매출정보
            const tempReview = await getReviewTotal(); //후기정보
            const tempReviewStatic = await getReviewStatic(); //후기통계량 [총리뷰수, 총별개수]

            //유저정보, 리뷰정보, 
            setTotal({
                ...total,
                member: tempUser.length,
                review: tempReviewStatic[0],
                star: (tempReviewStatic[1] / tempReviewStatic[0]).toFixed(2)
            })
            //총 매출 계산
            var tempTotalMoney = 0;
            tempMoney.map((item) => tempTotalMoney += Number(item.price))
            //이번달 매출 계산
            var tempThisMoney = 0;
            tempMoney
                .filter((item) => {
                    const date = new Date(item.createdAt); // 문자열 → Date 변환
                    return date.getFullYear() === time.getFullYear()
                        && date.getMonth() === time.getMonth();
                })
                .forEach((item) => tempThisMoney += Number(item.price));
            setMoney({
                ...money,
                total: tempTotalMoney,
                month: tempThisMoney
            })
            setLectureList([tempLectures[0], tempLectures[1], tempLectures[2]]);
            console.log("!", tempLectures)
        }
        lender();
    }, [])

    return (
        <div className='main-admin-dashboard'>
            <div className='main-hello'>
                <h1>관리자 {userData.userName}님, </h1>
                <h1>환영합니다🎯</h1>
                <p>전체 시스템을 관리하고 모니터링하세요</p>
            </div>
            <div className='main-myInfo'>
                <div className='main-myInfo-profile'>
                    <div className='main-myInfo-profile-top'>
                        <img src={profile} className='profileImg' />
                        <div >
                            <p style={{ color: 'white', fontSize: "22px" }}>{userData.userName}님</p>
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
                        <p>총 매출({time.toLocaleDateString()} 기준)</p>
                        <h2>₩ {Number(money.total).toLocaleString()}</h2>
                        <h6>이번달 매출 +₩ {Number(money.month).toLocaleString()}</h6>
                    </div>
                </div>
            </div>
            <div className='main-lectureRecommend'>
                <h2>최근 개설된 강의</h2>
                <div className='main-lectureItems'>
                    {lectureList.filter(item => item).slice(0, 3).map((item, index) => {
                        return (
                            <LectureItem key={index} lecture={{
                                id: item.id = 1,
                                instructorName: item.instructorName,
                                title: item.title,
                                line: item.line,
                                level: item.level,
                                champion: item.champion,
                                rating: item.average,
                                reviewCount: item.total,
                                price: item.price,
                                isLiked: false
                            }} />)
                    })}
                    {/* <LectureItem key='1' lecture={{
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
                    }} /> */}
                    {/* <LectureItem key='2' lecture={{
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
                    }} /> */}
                </div>
            </div>
        </div>
    )
}

export default NexusMainAdmin
