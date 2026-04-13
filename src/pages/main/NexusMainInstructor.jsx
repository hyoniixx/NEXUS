import React from 'react'
import './NexusMainInstructor.css'

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
                                <p style={{ color: '#3B82F6' }}>현재티어 : {user.userTier}</p>
                                <p style={{ color: '#94A3B8' }}>현재 CS점수 : {user.userCsScore}</p>
                            </div>
                        </div>
                        <p>내 프로필 보기 →</p>
                    </div>
                    <div className='main-myInfoCards'>
                        <div className='main-myInfo-myProfile'>
                            <div className='main-myInfoCard-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18.9954 20.9946V18.9951C18.9954 17.9345 18.5741 16.9173 17.8241 16.1674C17.0741 15.4174 16.057 14.9961 14.9964 14.9961H8.99781C7.9372 14.9961 6.92003 15.4174 6.17007 16.1674C5.4201 16.9173 4.99878 17.9345 4.99878 18.9951V20.9946" stroke="#3B82F6" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9971 10.9971C14.2057 10.9971 15.9961 9.20666 15.9961 6.99805C15.9961 4.78945 14.2057 2.99902 11.9971 2.99902C9.78847 2.99902 7.99805 4.78945 7.99805 6.99805C7.99805 9.20666 9.78847 10.9971 11.9971 10.9971Z" stroke="#3B82F6" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p>내 프로필</p>
                        </div>
                        <div className='main-myInfo-lecture'>
                            <div className='main-myInfoCard-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.9971 6.99805V20.9947" stroke="#8B5CF6" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.99927 17.9954C2.73412 17.9954 2.47982 17.8901 2.29233 17.7026C2.10484 17.5151 1.99951 17.2608 1.99951 16.9956V3.99878C1.99951 3.73363 2.10484 3.47934 2.29233 3.29185C2.47982 3.10435 2.73412 2.99902 2.99927 2.99902H7.99806C9.05867 2.99902 10.0758 3.42035 10.8258 4.17031C11.5758 4.92028 11.9971 5.93744 11.9971 6.99805C11.9971 5.93744 12.4184 4.92028 13.1684 4.17031C13.9183 3.42035 14.9355 2.99902 15.9961 2.99902H20.9949C21.2601 2.99902 21.5144 3.10435 21.7018 3.29185C21.8893 3.47934 21.9947 3.73363 21.9947 3.99878V16.9956C21.9947 17.2608 21.8893 17.5151 21.7018 17.7026C21.5144 17.8901 21.2601 17.9954 20.9949 17.9954H14.9964C14.2009 17.9954 13.438 18.3114 12.8756 18.8739C12.3131 19.4363 11.9971 20.1992 11.9971 20.9947C11.9971 20.1992 11.6811 19.4363 11.1186 18.8739C10.5561 18.3114 9.79327 17.9954 8.99781 17.9954H2.99927Z" stroke="#8B5CF6" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p>강의</p>
                        </div>
                        <div className='main-myInfo-duo'>
                            <div className='main-myInfoCard-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15.9961 20.9946V18.9951C15.9961 17.9345 15.5748 16.9173 14.8248 16.1674C14.0749 15.4174 13.0577 14.9961 11.9971 14.9961H5.99854C4.93793 14.9961 3.92076 15.4174 3.1708 16.1674C2.42084 16.9173 1.99951 17.9345 1.99951 18.9951V20.9946" stroke="#6366F1" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.99781 10.9971C11.2064 10.9971 12.9968 9.20666 12.9968 6.99805C12.9968 4.78945 11.2064 2.99902 8.99781 2.99902C6.78921 2.99902 4.99878 4.78945 4.99878 6.99805C4.99878 9.20666 6.78921 10.9971 8.99781 10.9971Z" stroke="#6366F1" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21.9946 20.9946V18.995C21.994 18.109 21.6991 17.2482 21.1562 16.5479C20.6133 15.8477 19.8533 15.3475 18.9954 15.126" stroke="#6366F1" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.9961 3.12891C16.8563 3.34915 17.6187 3.84943 18.1632 4.55087C18.7077 5.25231 19.0032 6.11501 19.0032 7.00297C19.0032 7.89092 18.7077 8.75362 18.1632 9.45506C17.6187 10.1565 16.8563 10.6568 15.9961 10.877" stroke="#6366F1" stroke-width="1.99952" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p>듀오 찾기</p>
                        </div>
                    </div>
                </div>
                <div className='main-status'>
                    <div className='main-statusNow'>
                        <div className='main-statusNow-top'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M18.3307 5.83203L11.2484 12.9143L7.08235 8.74826L1.6665 14.1641" stroke="#3B82F6" stroke-width="1.66641" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.3313 5.83203H18.3305V10.8313" stroke="#3B82F6" stroke-width="1.66641" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
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
                        <div className='lectureItem'>LectureItem.jsx</div>
                        <div className='lectureItem'>LectureItem.jsx</div>
                        <div className='lectureItem'>LectureItem.jsx</div>
                    </div>
                </div>
                <div className='main-bottom'>
                    <div className='main-bottom-duo'>
                        <div className='main-bottom-duo-head'>
                            <h2>최근 올라온 듀오</h2>
                            <p className='toLink'>듀오 리스트 보기</p>
                        </div>
                        <div className='duoCard'>
                            <div className='duoProfile'>
                                img
                            </div>
                            <div className='duoContent'>
                                <h3>SKT T1 FAKER</h3>
                                <p>캐리해드립니다.</p>
                            </div>
                            <div className='star'>
                                <div style={{ color: '#3B82F6' }}>★</div>
                                <div style={{ color: '#3B82F6' }}>★</div>
                                <div style={{ color: '#3B82F6' }}>★</div>
                                <div style={{ color: '#3B82F6' }}>★</div>
                                <div style={{ color: '#3B82F6' }}>★</div>
                            </div>
                        </div>
                    </div>
                    <div className='main-bottom-lecture'>
                        <div className='main-bottom-lecture-head'>
                            <h2>최근 내 강의</h2>
                            <p className='toLink'>강의 목록 보기</p>
                        </div>
                        <div className='lectureCard'>
                            <div className='lectureContent'>
                                <h3>마스터 클래스 탑 강의</h3>
                                <div className='lectureStatus'>진행중</div>
                            </div>
                            <div className='lectureInfo'>
                                <p className='lectureInstructor'>김 코치 선생</p>
                                <p className='lectureType'>· 화상</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default NexusMainInstructor
