import React, { useContext, useEffect, useState } from 'react'
import "./NexusMainStudent.css"
import LectureItem from '../../components/lecture/LectureItem'
import MainMyInfoCards from '../../components/main/MainMyInfoCards'
import tierUp from "../../assets/tierUp.svg"
import tier1 from "../../assets/tier1.png"
import tier2 from "../../assets/tier2.png"
import tier3 from "../../assets/tier3.png"
import tier4 from "../../assets/tier4.png"
import tier5 from "../../assets/tier5.png"
import tier6 from "../../assets/tier6.png"
import tier7 from "../../assets/tier7.png"
import tier8 from "../../assets/tier8.png"
import tier9 from "../../assets/tier9.png"
import MainLectureCard from '../../components/main/MainLectureCard'
import MainDuoCard from '../../components/main/MainDuoCard'
import { userContext } from '../../App'
import { getLectureById, getLectures } from "../../service/LectureService";
import { getDuos } from "../../service/DuoService";
import { useNavigate } from 'react-router-dom'

function NexusMainStudent() {
    const { userData } = useContext(userContext);
    const csGradeMap = ['미니언', '대포미니언', '바위게', '칼날부리', '블루', '드래곤', '전령', '바론', '장로드래곤']
    const csGradeImgMap = [tier1, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9]
    const csGradeUpMap = [0, 31, 51, 71, 101, 201, 301, 501, 1000];
    const userGradeUp = [userData.csScore - csGradeUpMap[userData.csGrade - 1], csGradeUpMap[userData.csGrade] - userData.csScore]
    const [lectureList, setLectureList] = useState([]);
    const [duoList, setDuoList] = useState([]);
    const navigate = useNavigate();
    const [lectureForCard, setLectureForCard] = useState();
    const randomDuo = duoList.length > 0
        ? duoList[Math.floor(Math.random() * duoList.length)]
        : null;

    useEffect(() => {
        const lender = async () => {
            var tempLectures = await getLectures();
            var tempDuos = await getDuos();
            setLectureList([tempLectures[0], tempLectures[1], tempLectures[2]]);
            setDuoList([tempDuos[0], tempDuos[1], tempDuos[2]]);
            var tempLectureCard = await getLectureById(userData.lectures[0])
            setLectureForCard(tempLectureCard)
            // console.log("!", tempLectures)
            // console.log("?", tempDuos)
            console.log("??", tempLectureCard)
            // console.log("!!", duoList)
        }
        lender();
    }, [userData])
    return (
        <div className='main-student-dashboard'>
            <div className='main-hello'>
                <h1>{userData.userName}님, </h1>
                <h1>환영합니다🖐️</h1>
                <p>오늘도 꾸준히 성장하세요. </p>
                <p>더 강한 소환사가 되어보세요!</p>
            </div>
            <div className='main-myInfo'>
                <div className='main-myInfo-profile'>
                    <div className='main-myInfo-profile-top'>
                        <div className='profileImg'>profileImg</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ color: 'white', fontSize: "22px" }}>{userData.userName}님</p>
                            <p style={{ color: '#3B82F6' }}>현재티어 : {csGradeMap[userData.csGrade - 1]}</p>
                            <p style={{ color: '#94A3B8' }}>현재 CS점수 : {userData.csScore}</p>
                        </div>
                    </div>
                    <p
                        className='toLink'
                        onClick={() => navigate('/mypage')}
                    >내 프로필 보기 →
                    </p>
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
                        <img src={csGradeImgMap[userData.csGrade - 1]} className='main-statusNow-bottom-img' />
                        <div className='main-statusNow-bottom-level'>
                            <h6 style={{ color: 'white' }}>{csGradeMap[userData.csGrade - 1]}</h6>
                            <div className='main-statusNow-bottom-level-gauge' style={{ gridTemplateColumns: `${userGradeUp[0]}fr ${userGradeUp[1]}fr` }}>
                                <div className='gauge-now' style={{ backgroundColor: "#3B82F6" }}></div>
                                <div className='gauge-full' style={{ backgroundColor: '#1E293B' }}></div>
                            </div>
                            <p style={{ color: '#94A3B8' }}>승격율 : {(userGradeUp[0] * 100 / (userGradeUp[0] + userGradeUp[1])).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <div className='main-statusNext'>
                    <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>다음 등급까지</p>
                    <div className='main-statusNow-bottom-level'>
                        <h6 style={{ color: 'white' }}>{csGradeMap[userData.csGrade]}</h6>
                        <div className='main-statusNow-bottom-level-gauge' style={{ gridTemplateColumns: `${userGradeUp[0]}fr ${userGradeUp[1]}fr` }}>
                            <div className='gauge-now' style={{ backgroundColor: "#3B82F6" }}></div>
                            <div className='gauge-full' style={{ backgroundColor: '#1E293B' }}></div>
                        </div>
                        <p style={{ color: '#94A3B8' }}>승격율 : {(userGradeUp[0] * 100 / (userGradeUp[0] + userGradeUp[1])).toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <div className='main-lectureRecommend'>
                <h2>{userData.userName}님께 추천하는 강의</h2>
                <div className='main-lectureItems'>
                    {lectureList.filter(item => item).map((item, index) => {
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
                    }} /> */}
                    {/* <LectureItem key='3' lecture={{
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
            <div className='main-bottom'>
                <div className='main-bottom-duo'>
                    <div className='main-bottom-duo-head'>
                        <h2>최근 올라온 듀오</h2>
                        <p className='toLink' onClick={() => navigate('/duo')}>듀오 리스트 보기</p>
                    </div>
                    {randomDuo && (
                        <MainDuoCard
                            image=''
                            name={randomDuo.writer.userName}
                            content={randomDuo.content}
                            wanted={randomDuo.wishDuo.line}
                        />
                    )}
                </div>
                <div className='main-bottom-lecture'>
                    <div className='main-bottom-lecture-head'>
                        <h2>최근 내 강의</h2>
                        <p className='toLink' onClick={() => navigate('/lecture-list')}>강의 목록 보기</p>
                    </div>
                    {userData.lectures ? (
                        <MainLectureCard
                            key={userData.lectures[0]}
                            title={lectureForCard?.title}
                            status='진행중'
                            instructor={lectureForCard?.instructor}
                            type={lectureForCard?.time}
                        />
                    ) : (
                        <div className='lectureCard'>
                            <div className='lectureContent'>
                                <h3>최근 신청한 강의가 없습니다.</h3>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div >
    )
}

export default NexusMainStudent
