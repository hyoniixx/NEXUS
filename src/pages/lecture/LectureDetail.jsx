import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './LectureDetail.css'
import star from '../../assets/star.svg'
import book from '../../assets/book.svg'
import CurriculumItem from '../../components/lecture-detail/CurriculumItem'
import rightArrow from '../../assets/rightIcon.svg'
import LectureReviewItem from '../../components/lecture-detail/LectureReviewItem'
import hart from '../../assets/like_filled_badge.png'
import emptyHart from '../../assets/like_empty_badge.png'
import probadge from '../../assets/probadge.png'
import strmbadge from '../../assets/strmbadge.png'
import tier1 from '../../assets/tier1.png'
import tier2 from '../../assets/tier2.png'
import tier3 from '../../assets/tier3.png'
import tier4 from '../../assets/tier4.png'
import tier5 from '../../assets/tier5.png'
import tier6 from '../../assets/tier6.png'
import tier7 from '../../assets/tier7.png'
import tier8 from '../../assets/tier8.png'
import tier9 from '../../assets/tier9.png'
import { getLectureById } from '../../service/LectureService.js'
import { userContext } from '../../App.jsx'
import { getUser } from '../../service/UserService.js'
import lectureDefault from '../../assets/lectureDefaultImage.png'

function LectureDetail() {
    const { id } = useParams(); //url 기준 강의 ID 받아옴
    const [isOn, setIsOn] = useState(false); //수강 상태 관리
    const [isWished, setIsWished] = useState(false); //찜하기 눌렀는지 여부
    const [badge, setBadge] = useState({ pro: true, streamer: true }) //강사 정보 받아와서 프로,스트리머 여부 객체에 담기
    const [lectureData, setLectureData] = useState({}); //강의 정보 불러오기
    const navigate = useNavigate(); //이동하기
    const { userData } = useContext(userContext); // 로그인한 회원정보
    const [role, setRole] = useState(''); //로그인한 회원의 role값
    const [lecture, setLecture] = useState({ //강의 데이터 초기셋팅
        title: '',
        description: '',
        image: null,
        instructorName: '',
        instructorId: '',
        badgeType: '',
        level: '',
        line: '',
        champion: [],
        price: 0,
        lectureCount: 0,
        curriculum: [],
        star: { average: 0, total: 0 },
        lectureStatus: '',
    })
    const [instructor, setInstructor] = useState({
        userName: '',
        csGrade: 1
    });
    const csMap = {
        1: tier1,
        2: tier2,
        3: tier3,
        4: tier4,
        5: tier5,
        6: tier6,
        7: tier7,
        8: tier8,
        9: tier9
    }

    useEffect(() => {//
        const render = async () => {
            const temp = await getLectureById(id);
            setLectureData(temp);
            console.log('?', temp);
        }
        render();
    }, [])

    useEffect(() => {//회원정보 불러왔을때 오른쪽 버튼 내용 변경하기 위해
        setRole(userData.role);
    }, [userData])

    useEffect(() => {
        if (!lectureData) return;
        setLecture({
            title: lectureData.title ?? '',
            description: lectureData.description ?? '',
            image: null,
            instructorName: lectureData.instructorName ?? '',
            instructorId: lectureData.instructorId ?? '',
            badgeType: lectureData.badgeType ?? '',
            level: lectureData.level ?? '',
            line: lectureData.line ?? '',
            champion: lectureData.champion ?? [],
            price: lectureData.price ?? 0,
            lectureCount: lectureData.lectureCount ?? 0,
            curriculum: lectureData.curriculum ?? [],
            star: lectureData.star ?? { average: 0 },
            lectureStatus: lectureData.lectureStatus ?? '',
        });
        setInstructor(getUser(lectureData.instructorId));
    }, [lectureData])

    /*
        champion: ['제라스']
        createdAt: Timestamp {seconds: 1776402737, nanoseconds: 84000000}
        curriculum: (3) ['dddd', 'dddd', 'dddd']
        description: "미드 제라스 꿀팁 및 라인전 강의"
        docId: "6Rh40FZEuvhEyixL0s9V"
        level: "ADVANCED"
        line: "MID"
        price: 500000
        time: 1
        title: "미드 제라스로 마스터 가기"
        uid: 1
    */
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
                                    <p>{lectureData.instructorName}</p>
                                    <img src={probadge} className='badge' style={{ display: `${lectureData.badgeType === 'PRO' ? 'flex' : 'none'}` }} />
                                    <img src={strmbadge} className='badge' style={{ display: `${lectureData.badgeType === 'STREAMER' ? 'flex' : 'none'}` }} />
                                </div>
                                <div className='detail-head-profileTier'>
                                    <img src={csMap[Number(instructor.csGrade)]} className='detail-head-tierBadge' width='30px' height='30px' />
                                    <p>칼날부리</p>
                                </div>
                            </div>
                        </div>
                        <div className='detail-head-title'>
                            <h6>{lectureData.title}</h6>
                        </div>
                        {<img src={lectureData.image || lectureDefault} className='detail-head-image' />}
                    </div>
                    <div className='detail-intro'>
                        <h6>강의 소개</h6>
                        <p>{lectureData.description}</p>
                    </div>
                    <div className='detail-info'>
                        <div className='detail-info-head'>
                            <p>강의 정보</p>
                        </div>
                        <div className='detail-info-content'>
                            <div className='detail-info-time'>
                                <h6>수업 시간</h6>
                                <p>{lectureData.lectureCount}시간</p>
                            </div>
                            <div className='detail-info-diff'>
                                <h6>난이도</h6>
                                <p>{lectureData.level}</p>
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
