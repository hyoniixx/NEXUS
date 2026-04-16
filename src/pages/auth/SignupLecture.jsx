import React from 'react'

function SignupLecture() {
    return (
        <>
            <article>
                <h5>강사 인증 정보</h5>
                <p>강사로 활동하시려면 추가 인증이 필요합니다.</p>
            </article>
            <article>
                <div>
                    <label>롤 게임 닉네임</label>
                    <input className='a-signup-input' />
                    <p></p>
                </div>
                <div>
                    <label>태그라인</label>
                    <input className='a-signup-input' />
                    <p></p>
                </div>
            </article>
            <button className='a-signup-btn'>티어 인증</button>
            <label >티어 인증 이미지</label>
            <input hidden />
            <div>
                <img />
            </div>
            <label className='a-signup-input'>이미지 업로드</label>
            <label>프로/스트리머 인증(선택)</label>
            <input hidden />
            <div>
                <img />
            </div>
            <label className='a-signup-input'>인증 자료 업로드</label>

        </>
    )
}

export default SignupLecture
