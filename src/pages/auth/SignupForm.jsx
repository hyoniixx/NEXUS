import React, { useState } from 'react'
import SignupLecture from './SignupLecture'
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'

function SignupForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCheckVisible, setIsCheckVisible] = useState(false);

    return (
        <form>
            <label>가입 유형</label>
            <article>
                <button type='button' id='student' name='student'>
                    <h4>수강생</h4>
                    <p>강의를 수강합니다</p>
                </button>
                <button type='button' id='instructor' name='instructor'>
                    <h4>강사</h4>
                    <p>강의를 개설합니다</p>
                </button>
            </article>
            <label>닉네임</label>
            <input />
            <p></p>
            <label>이메일</label>
            <input />
            <p></p>
            <label>비밀번호</label>
            <div className='a-login-password-input'>
                <input type={isVisible ? 'text' : 'password'} placeholder='비밀번호를 입력해주세요' />
                <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
            </div>
            <p></p>
            <label>비밀번호 확인</label>
            <div className='a-login-password-input'>
                <input type={isCheckVisible ? 'text' : 'password'} placeholder='비밀번호를 입력해주세요' />
                <img onClick={() => setIsCheckVisible(!isCheckVisible)} src={isCheckVisible ? activeEye : noneActiveEye} />
            </div>
            <p></p>
            <label>생년월일</label>
            <input />
            <p></p>
            <label>프로필 이미지</label>
            <input />
            <div>
                <img />
            </div>
            <label>이미지 선택</label>
            <SignupLecture />
            <div>
                <p>개인정보 수집 및 이용 동의</p> <p>전문 보기</p>
            </div>
            <button>회원가입</button>
        </form>
    )
}

export default SignupForm
