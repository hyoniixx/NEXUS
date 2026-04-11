import React from 'react'
import './NexusMainGuest.css'
function NexusMainGuest() {
    return (
        <div className='main'>
            <div className='main-guest-top' >
                <div className='main-guest-topbox'>
                    <div><img src="src\assets\Vector.png" alt="" />
                        롤 전문 코칭 플랫폼
                    </div>
                    <div>NEXUS</div>
                    <p>프로게이머와 스트리머에게 직접 배우는</p>
                    <p>리그오브레전드 1:1 코칭 서비스</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '16px' }}>
                        <button style={{ width: '128px', height: '57px' }}>시작하기</button>
                        <button style={{ width: '128px', height: '57px' }}> 로그인</button>
                    </div>
                </div>
            </div >
            <div className='main-guest-bottom' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: "32px", flexDirection: 'row', justifyContent: 'center' }}>
                    <div style={{ width: "394px", height: "197px", border: "1px solid black", borderRadius: "3px" }}>프로 인증 강사</div>
                    <div style={{ width: "394px", height: "197px", border: "1px solid black", borderRadius: "3px" }}>맞춤형 매칭</div>
                    <div style={{ width: "394px", height: "197px", border: "1px solid black", borderRadius: "3px" }}>실시간 피드백</div>
                </div>
                <div style={{ display: 'flex', flexDirection: "column", textAlign: 'center', gap: '16px', width: '896px', height: '221px', marginTop: '160px', border: '1px solid black' }}>
                    <h2>지금 바로 시작하세요</h2>
                    <p>NEXUS에서 당신의 실력을 한 단계 업그레이드하세요</p>
                    <button style={{ width: 165, height: 56, justifyContent: 'center' }}>강의 시작하기</button>
                </div>
            </div>
        </div>
    )
}

export default NexusMainGuest
