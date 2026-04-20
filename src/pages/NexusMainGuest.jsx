import React from 'react'
import './NexusMainGuest.css'
import { useNavigate } from 'react-router-dom'
function NexusMainGuest() {
    const navigate = useNavigate();
    return (
        <>
            <div className='main-guest-top' >
                <div className='main-guest-topbox'>
                    <div>
                        <img src="banzzac" alt="" />
                        <p>롤 전문 코칭 플랫폼</p>
                    </div>
                    <div>NEXUS</div>
                    <p>프로게이머와 스트리머에게 직접 배우는</p>
                    <p>리그오브레전드 1:1 코칭 서비스</p>
                    <div>
                        <button onClick={() => navigate('login')}>시작하기</button>
                        <button onClick={() => navigate('login')}> 로그인</button>
                    </div>
                </div>
            </div >
            <div className='main-guest-bottom'>
                <div className="main-guest-bottom-cards">
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#3B82F6" fill-opacity="0.1" />
                            <path d="M18 21H16.5C15.837 21 15.2011 20.7366 14.7322 20.2678C14.2634 19.7989 14 19.163 14 18.5C14 17.837 14.2634 17.2011 14.7322 16.7322C15.2011 16.2634 15.837 16 16.5 16H18" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M30 21H31.5C32.163 21 32.7989 20.7366 33.2678 20.2678C33.7366 19.7989 34 19.163 34 18.5C34 17.837 33.7366 17.2011 33.2678 16.7322C32.7989 16.2634 32.163 16 31.5 16H30" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 34H32" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 26.6602V29.0002C22 29.5502 21.53 29.9802 21.03 30.2102C19.85 30.7502 19 32.2402 19 34.0002" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M26 26.6602V29.0002C26 29.5502 26.47 29.9802 26.97 30.2102C28.15 30.7502 29 32.2402 29 34.0002" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M30 14H18V21C18 22.5913 18.6321 24.1174 19.7574 25.2426C20.8826 26.3679 22.4087 27 24 27C25.5913 27 27.1174 26.3679 28.2426 25.2426C29.3679 24.1174 30 22.5913 30 21V14Z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2>프로 인증 강사</h2>
                        <p>실전 경험을 가진 프로게이머와 인기 스트리머의 검증된 강의</p>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#8B5CF6" fill-opacity="0.1" />
                            <path d="M28 33V31C28 29.9391 27.5786 28.9217 26.8284 28.1716C26.0783 27.4214 25.0609 27 24 27H18C16.9391 27 15.9217 27.4214 15.1716 28.1716C14.4214 28.9217 14 29.9391 14 31V33" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M34 32.9999V30.9999C33.9993 30.1136 33.7044 29.2527 33.1614 28.5522C32.6184 27.8517 31.8581 27.3515 31 27.1299" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M28 15.1299C28.8604 15.3502 29.623 15.8506 30.1676 16.5522C30.7122 17.2538 31.0078 18.1167 31.0078 19.0049C31.0078 19.8931 30.7122 20.756 30.1676 21.4576C29.623 22.1592 28.8604 22.6596 28 22.8799" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2>맞춤형 매칭</h2>
                        <p>라인, 티어, 챔피언별로 나에게 딱 맞는 강사를 찾아보세요</p>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#6366F1" fill-opacity="0.1" />
                            <path d="M16 25.9997C15.8108 26.0003 15.6252 25.9473 15.4649 25.8467C15.3047 25.746 15.1762 25.602 15.0945 25.4313C15.0129 25.2606 14.9813 25.0703 15.0035 24.8823C15.0257 24.6944 15.1008 24.5166 15.22 24.3697L25.12 14.1697C25.1943 14.084 25.2955 14.026 25.407 14.0054C25.5185 13.9848 25.6337 14.0027 25.7337 14.0562C25.8337 14.1097 25.9126 14.1956 25.9573 14.2998C26.0021 14.404 26.0101 14.5203 25.98 14.6297L24.06 20.6497C24.0034 20.8012 23.9844 20.9642 24.0046 21.1247C24.0248 21.2852 24.0837 21.4384 24.1761 21.5711C24.2685 21.7038 24.3918 21.8122 24.5353 21.8868C24.6788 21.9615 24.8382 22.0002 25 21.9997H32C32.1892 21.999 32.3748 22.0521 32.535 22.1527C32.6953 22.2533 32.8238 22.3973 32.9054 22.568C32.9871 22.7387 33.0187 22.9291 32.9965 23.117C32.9743 23.3049 32.8992 23.4827 32.78 23.6297L22.88 33.8297C22.8057 33.9154 22.7045 33.9733 22.593 33.9939C22.4815 34.0146 22.3663 33.9967 22.2663 33.9432C22.1663 33.8897 22.0874 33.8038 22.0427 33.6996C21.9979 33.5954 21.9899 33.479 22.02 33.3697L23.94 27.3497C23.9966 27.1982 24.0156 27.0352 23.9954 26.8747C23.9752 26.7142 23.9163 26.561 23.8239 26.4282C23.7315 26.2955 23.6082 26.1872 23.4647 26.1125C23.3212 26.0379 23.1617 25.9991 23 25.9997H16Z" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2>실시간 피드백</h2>
                        <p>1:1 맞춤 코칭과 리플레이 분석으로 빠른 성장 보장</p>
                    </div>
                </div>
                <div className='main-guest-bottom-letsgo'>
                    <h2>지금 바로 시작하세요</h2>
                    <p>NEXUS에서 당신의 실력을 한 단계 업그레이드하세요</p>
                    <button>강의 시작하기</button>
                </div>
            </div>
        </>
    )
}

export default NexusMainGuest
