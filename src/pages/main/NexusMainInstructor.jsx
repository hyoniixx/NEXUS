import React, { use, useContext, useEffect, useState } from 'react'
import './NexusMainInstructor.css'
import LectureItem from '../../components/lecture/LectureItem';
import MainMyInfoCards from '../../components/main/MainMyInfoCards';
import MainReviewCard from '../../components/main/MainReviewCard';
import MainStudentCard from '../../components/main/MainStudentCard';
import tierUp from '../../assets/tierUp.svg'
import tier1 from "../../assets/tier1.png"
import tier2 from "../../assets/tier2.png"
import tier3 from "../../assets/tier3.png"
import tier4 from "../../assets/tier4.png"
import tier5 from "../../assets/tier5.png"
import tier6 from "../../assets/tier6.png"
import tier7 from "../../assets/tier7.png"
import tier8 from "../../assets/tier8.png"
import tier9 from "../../assets/tier9.png"
import { userContext } from '../../App'
import { getLectures, getLecturesByInstructorId } from "../../service/LectureService";
import { useNavigate } from 'react-router-dom'
import { getReviews } from '../../service/ReviewService';
import { getUsersByLectureId } from '../../service/MemberViewService';
import profile from '../../assets/defaultProfile.svg'

function NexusMainInstructor() {
    const { userData } = useContext(userContext);
    const csGradeMap = ['미니언', '대포미니언', '바위게', '칼날부리', '블루', '드래곤', '전령', '바론', '장로드래곤']
    const csGradeImgMap = [tier1, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9]
    const csGradeUpMap = [0, 31, 51, 71, 101, 201, 301, 501, 1000];
    const userGradeUp = [userData.csScore - csGradeUpMap[userData.csGrade - 1], csGradeUpMap[userData.csGrade] - userData.csScore]
    const lineMap = { TOP: '탑', JUNGLE: '정글', MID: '미드', ADC: '원딜', SUPPORT: '서폿' }
    const diffMap = { BEGINNER: "초급", INTERMEDIATE: "중급", ADVANCED: "심화" }
    const navigate = useNavigate();
    const [myLectures, setMyLectures] = useState([]); //내가 개설한 강의목록
    const [myReviews, setMyReviews] = useState([]); //내가 개설한 강의들의 후기 목록
    const [myStudents, setMyStudents] = useState([]); //내가 개설한 강의들의 수강생 목록
    const [star, setStar] = useState([0, 0]); //[내가 개설한 강의들의 총 평균 평점(fixed2) , 내가 개설한 강의들의 총 후기 개수 ]

    // useEffect(() => {
    //     const lender = async () => {
    //         var tempLectures = await getLecturesByInstructorId(userData.uid);
    //         setMyLectures(tempLectures);

    //         const tempReviewList = await Promise.all(
    //             tempLectures.map(item => getReviews(item.docId))
    //         );
    //         setMyReviews(tempReviewList);

    //         // console.log(tempReview.reviews[0])
    //         console.log('.', tempReviewList);
    //         var totalStar = 0;
    //     }
    //     lender();
    // }, [userData])

    useEffect(() => {
        if (!userData) return;

        const lender = async () => {
            try {
                // 1️⃣ 내가 개설한 강의
                const lectures = await getLecturesByInstructorId(userData.uid);
                setMyLectures(lectures);

                if (!lectures || lectures.length === 0) return;

                // 2️⃣ 강의별 리뷰 가져오기
                const reviewDocs = await Promise.all(
                    lectures.map(item => getReviews(item.docId))
                );
                setMyReviews(reviewDocs);

                // 3️⃣ 강의별 수강생 가져오기
                const studentLists = await Promise.all(
                    lectures.map(item => getUsersByLectureId(item.docId))
                );

                // 🔥 평탄화 (2차원 배열 → 1차원)
                const studentsFlat = studentLists.flat();

                // 🔥 중복 제거 (같은 학생이 여러 강의 들을 수 있음)
                const uniqueStudents = Array.from(
                    new Map(studentsFlat.map(s => [s.id, s])).values()
                );

                setMyStudents(uniqueStudents);

                // 4️⃣ 평점 계산
                let totalSum = 0;
                let totalCount = 0;

                reviewDocs.forEach(doc => {
                    if (!doc || !doc.reviews) return;

                    doc.reviews.forEach(r => {
                        totalSum += r.star;
                        totalCount++;
                    });
                });

                const avg = totalCount > 0
                    ? (totalSum / totalCount).toFixed(2)
                    : 0;

                setStar([avg, totalCount]);

                console.log('강의', lectures);
                console.log('리뷰', reviewDocs);
                console.log('수강생', uniqueStudents);
                console.log('평점', avg, totalCount);

            } catch (e) {
                console.log(e);
            }
        };

        lender();
    }, [userData]);
    return (
        <>
            <div className='main-student-dashboard'>
                <div className='main-hello'>
                    <h1>{userData.userName}님, </h1>
                    <h1>오늘도 멋진 강의로</h1>
                    <h1>학생들을 만나보세요👌</h1>
                    <p>당신의 경험을 나누세요</p>
                </div>
                <div className='main-myInfo'>
                    <div className='main-myInfo-profile'>
                        <div className='main-myInfo-profile-top'>
                            <img src={profile} className='profileImg' />
                            <div>
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
                    <h2>내 강의 현황</h2>
                    <div className='main-lectureItems'>
                        {myLectures ? (
                            myLectures.map((item, index) => {
                                return (
                                    <LectureItem key={index} lecture={{
                                        id: item.id,
                                        instructor: item.instructor,
                                        title: item.title,
                                        line: lineMap[item.line],
                                        level: diffMap[item.level],
                                        champion: item.champion,
                                        rating: myReviews[index]?.star?.average.toFixed(1),
                                        reviewCount: myReviews[index]?.total,
                                        price: item.price,
                                    }} />)
                            })
                        ) : (
                            <article className='duoCard' style={{ width: "100%", display: 'flex', paddingLeft: '10px' }}>
                                <h3 className='lecture-item-title' style={{ marginLeft: '10px' }}>
                                    현재 등록한 강의가 없습니다.
                                </h3>
                            </article>
                        )}

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
                    <div className='main-bottom-reviews'>
                        <div className='main-bottom-reviews-head'>
                            <h2>최근 수강생 후기</h2>
                            <p className='toLink' onClick={() => navigate('/mypage/instructor')}>관리</p>
                        </div>
                        <div className='main-bottom-reviews-dashboard'>
                            <div>
                                <p>수강생</p>
                                <h6>{myStudents.length}명</h6>
                            </div>
                            <div>
                                <p>수강생 평점</p>
                                <h6>{star[0] ?? 0}</h6>
                            </div>
                            <div>
                                <p>작성된 리뷰</p>
                                <h6>{star[1] ?? 0} 개</h6>
                            </div>
                        </div>
                        {myReviews.length !== 0 ? (
                            <MainReviewCard
                                image=''
                                reviewer={myReviews[0]?.reviews[0].userName}
                                date={new Date(myReviews[0]?.reviews[0].createdAt).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })}
                                star={myReviews[0]?.reviews[0].star}
                                content={myReviews[0]?.reviews[0].content}
                            />
                        ) : (
                            <div className='main-instructor-noreview'>
                                <h1>
                                    아직 리뷰가 없습니다.
                                </h1>
                            </div>
                        )}

                    </div>
                    <div className='main-bottom-students'>
                        <div className='main-bottom-students-head'>
                            <h2>최근 강의</h2>
                            <p className='toLink' onClick={() => navigate('/mypage/instructor')}>관리</p>
                        </div>
                        <div className='students-card-list'>{/*status 1:대기중 | 2:진행중 | 3:완료*/}
                            {myStudents.length !== 0 ? (
                                myStudents.slice(0, 3).map((item, index) => (
                                    <MainStudentCard
                                        key={item.id || index}
                                        name={item.userName}
                                        date='2026.03.12'
                                        status={index % 3}
                                    />
                                ))
                            ) : (
                                <div className='main-bottom-nostudents'>
                                    <h1>아직 수강생이 없습니다.</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default NexusMainInstructor
