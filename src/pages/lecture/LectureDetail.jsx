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
import { deleteLecture, getLectureById } from '../../service/LectureService.js'
import { getReviews } from '../../service/ReviewService.js'
import { userContext } from '../../App.jsx'
import { getUser, updateUser } from '../../service/UserService.js'
import lectureDefault from '../../assets/lectureDefaultImage.png'
import LecturePayment from '../../components/lecture-detail/LecturePayment.jsx'
import { createChat } from '../../service/ChatService.js'
import { createEnrollment } from '../../service/EnrollmentService.js'
import Modal from '../../components/common/Modal.jsx'
import useModal from '../../hooks/useModal.jsx'

function LectureDetail() {
    const { id } = useParams();
    const [isWished, setIsWished] = useState(false);
    const [badge, setBadge] = useState({ pro: true, streamer: true })
    const [lectureData, setLectureData] = useState(null);
    const navigate = useNavigate();
    const { userData, dispatch } = useContext(userContext);
    const [role, setRole] = useState('');
    const [lecture, setLecture] = useState({
        title: '',
        description: '',
        image: null,
        instructorName: '',
        instructorId: '',
        instructorUid: '',
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
    const [review, setReview] = useState(null);
    const [instructor, setInstructor] = useState({ userName: '', csGrade: 1 });
    const [pageMode, setPageMode] = useState('guest');
    const [isPaymentModal, setIsPaymentModal] = useState(false);
    const [renderKey, setRenderKey] = useState(0); // 리렌더 트리거

    const csMap = { 1: tier1, 2: tier2, 3: tier3, 4: tier4, 5: tier5, 6: tier6, 7: tier7, 8: tier8, 9: tier9 }
    const csTextMap = { 1: '미니언', 2: '대포미니언', 3: '바위게', 4: '칼날부리', 5: '블루', 6: '드래곤', 7: '전령', 8: '바론', 9: '장로드래곤' }
    const diffMap = { BEGINNER: "초급", INTERMEDIATE: "중급", ADVANCED: "심화" }

    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const deleteLectureDetail = async () => {
        await deleteLecture(id);
        navigate('/lecture-list')
    }
    const modal = useModal(deleteLectureDetail);

    const handleEnroll = () => {
        setIsPaymentModal(true);
    }

    const handlePaymentSuccess = async () => {
        console.log(lecture.instructorName)
        const chatData = {
            type: "lecture",
            refId: id,
            participants: [
                lecture.instructorUid,
                userData.uid
            ],
            participantInfo: {
                [lecture.instructorUid]: {
                    nickname: lecture.instructorName,
                    role: "instructor"
                },
                [userData.uid]: {
                    nickname: userData.userName,
                    role: "student"
                }
            },
            status: {
                [lecture.instructorUid]: '전',
                [userData.uid]: '전'
            },
            unreadCount: {
                [lecture.instructorUid]: 0,
                [userData.uid]: 0
            }
        }

        console.log(chatData)
        setPageMode('student_on');
        const enrollmentId = await createEnrollment(id, lecture.title, lecture.instructorUid, userData.uid, userData.userName);
        await createChat(chatData, enrollmentId);
        setRenderKey(prev => prev + 1); // 리렌더 트리거
    }

    const handleWish = async () => {
        if (!userData?.uid) return;
        const currentWish = userData.wish || [];
        let updatedWish;

        if (isWished) {
            updatedWish = currentWish.filter(w => w !== id);
        } else {
            updatedWish = [...currentWish, id];
        }

        await updateUser(userData.uid, { wish: updatedWish });
        dispatch({ type: 'SET_USER_DATA', payload: { ...userData, wish: updatedWish } });
        setIsWished(!isWished);
    }



    useEffect(() => {
        if (!userData || !lectureData) return;

        if (userData.role === 'admin') {
            setPageMode('admin');
        } else if (userData.role === 'instructor') {
            if (lectureData.uid === userData.uid) {
                setPageMode('instructor');
            } else {
                setPageMode('instructor_not_mine')
            }
        } else if (userData.role === 'student') {
            const isEnrolled = userData.lectures?.includes(id);
            setPageMode(isEnrolled ? 'student_on' : 'student_off');
        }

        // 찜 여부 확인
        const wished = userData.wish?.includes(id) ?? false;
        setIsWished(wished);

    }, [userData, lectureData, renderKey])

    useEffect(() => {
        const render = async () => {
            const temp = await getLectureById(id);
            const tempReview = await getReviews(id);
            setLectureData(temp);
            setReview(tempReview);
        }
        const wished = userData.wish?.includes(id) ?? false;
        setIsWished(wished);
        render();
    }, [])

    useEffect(() => {
        setRole(userData.role);
    }, [userData])

    useEffect(() => {
        if (!lectureData) return;
        setLecture({
            title: lectureData.title ?? '',
            description: lectureData.description ?? '',
            image: null,
            instructorName: lectureData.instructor ?? '',
            instructorId: lectureData.instructorId ?? '',
            instructorUid: lectureData.uid ?? '',
            instructorEmail: lectureData.instructorEmail ?? "",
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
        const fetchInstructor = async () => {
            const tempInstructor = await getUser(lectureData.uid);
            setInstructor(tempInstructor);
        }
        fetchInstructor();
    }, [lectureData])

    if (!lectureData || !lecture.title) return <div>로딩 중...</div>
    if (!userData) return;




    return (
        <>
            <LecturePayment
                isModal={isPaymentModal}
                onClose={() => setIsPaymentModal(false)}
                price={lecture.price}
                title={lecture.title}
                instructorId={lecture.instructorName}
                instructorEmail={lecture.instructorId}
                lectureId={id}
                onPaymentSuccess={handlePaymentSuccess}
            />
            <Modal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='강의 삭제'
                content={`강의를 삭제하시겠습니까?`}
                type='two'
                color='red'
            />
            <div className='detail-layout'>
                <p className='toLectureList' onClick={() => navigate('/lecture-list')}>← 강의 목록으로</p>
                <div className='detail-content-layout'>
                    <div className='detail'>
                        <div className='detail-head'>
                            <div className='detail-head-profile'>
                                <div className='detail-head-profileImg'>img</div>
                                <div className='detail-head-profileDetail'>
                                    <div className='detail-head-profileName'>
                                        <p>{lectureData.instructor}</p>
                                        <img src={probadge} className='badge' style={{ display: `${lectureData.badgeType === 'PRO' ? 'flex' : 'none'}` }} />
                                        <img src={strmbadge} className='badge' style={{ display: `${lectureData.badgeType === 'STREAMER' ? 'flex' : 'none'}` }} />
                                    </div>
                                    <div className='detail-head-profileTier'>
                                        <img src={csMap[Number(instructor?.csGrade)]} className='detail-head-tierBadge' width='30px' height='30px' />
                                        <p>{csTextMap[Number(instructor?.csGrade)]}</p>
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
                                    <p>{lectureData.time}시간</p>
                                </div>
                                <div className='detail-info-diff'>
                                    <h6>난이도</h6>
                                    <p>{diffMap[lectureData.level]}</p>
                                </div>
                                <div className='detail-info-star'>
                                    <h6>평점</h6>
                                    <div className='detail-info-star-content'>
                                        <img src={star} style={{ width: '16px', height: '16px', color: 'white' }} />
                                        <p>{review?.star?.average ?? 0}</p>
                                        <h5>({review?.total ?? 0}개 리뷰)</h5>
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
                                {lecture.curriculum.map((item, index) => (
                                    <CurriculumItem key={index} index={index + 1} content={item} />
                                ))}
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
                                <LectureReviewItem name={review?.reviews[0]?.userName ?? ""} content={review?.reviews[0]?.content ?? ""} star={review?.reviews[0]?.star ?? 0} />
                            </div>
                        </div>
                    </div>
                    <div className='detail-box'>
                        <h2>{lectureData.price?.toLocaleString()}원</h2>

                        {pageMode === 'student_off' && (
                            <>
                                <button className='detail-box-top-button' onClick={handleEnroll}>
                                    수강 신청하기
                                </button>
                                <button onClick={handleWish} className='detail-box-bottom-button'>
                                    {isWished
                                        ? <><img src={hart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 취소</p></>
                                        : <><img src={emptyHart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 하기</p></>
                                    }
                                </button>
                            </>
                        )}

                        {pageMode === 'student_on' && (
                            <>
                                <button
                                    className='detail-box-top-on'
                                    onClick={() => navigate("/chat", {
                                        state: {
                                            id: id
                                        },
                                    })}
                                >
                                    <p>수강 중</p>
                                </button>
                                <button onClick={handleWish} className='detail-box-bottom-button'>
                                    {isWished
                                        ? <><img src={hart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 취소</p></>
                                        : <><img src={emptyHart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 하기</p></>
                                    }
                                </button>
                            </>
                        )}

                        {pageMode === 'instructor' && (
                            <>
                                <button className='detail-box-top-button' onClick={() => navigate(`/edit-lecture/${id}`)}>
                                    수정하기
                                </button>
                                <button className='detail-box-bottom-button' onClick={() => modal.openModal()}>
                                    삭제하기
                                </button>
                            </>
                        )}

                        {pageMode === 'instructor_not_mine' && (
                            <div>

                            </div>
                        )}

                        {pageMode === 'admin' && (
                            <button className='detail-box-bottom-button' onClick={() => modal.openModal()}>
                                삭제하기
                            </button>
                        )}

                        {pageMode === 'guest' && (
                            <>
                                <button className='detail-box-top-button' onClick={() => navigate('/login')}>
                                    로그인 후 수강 신청
                                </button>
                                <button onClick={handleWish} className='detail-box-bottom-button'>
                                    {isWished
                                        ? <><img src={hart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 취소</p></>
                                        : <><img src={emptyHart} width='15px' height='15px' style={{ marginTop: '4px' }} /><p>찜 하기</p></>
                                    }
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default LectureDetail