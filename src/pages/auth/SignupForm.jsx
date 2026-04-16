import React, { useReducer, useState } from 'react'
import SignupLecture from './SignupLecture'
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'
import './SignupForm.css';
import { signup } from '../../service/AuthService';
import { createUser } from '../../service/UserService';

function setUserInfo(state, action) {
    switch (action.type) {
        case 'inputInfo':
            return {

            }
    }
}

function SignupForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCheckVisible, setIsCheckVisible] = useState(false);
    const [userInfo, dispatch] = useReducer(setUserInfo, {
        userName: "",
        email: "",
        birthDate: "",
        profileImage: null,
        role: "",
        isBlacklist: false,
        csScore: 10,
        csScoreMax: 10,
        csGrade: 1,
        lectures: [],
        wish: [],
        createAt: ""
    })

    const handleSignupBtn = async (e) => {
        e.preventDefault();
        try {
            const userId = await signup('admin01@nexus.com', 'admin1234')
            await createUser({
                uid: userId.uid,
                userInfo: {
                    userName: "admin01",
                    email: "admin01@nexus.com",
                    birthDate: "2004-00-00",
                    profileImage: null,
                    role: "admin"
                }
            })
            console.log('회원가입 완료')
        } catch (error) {
            console.log('회원가입 실패', error)
        }
    }

    return (
        <form className='a-signup-form-ct'>
            <label>가입 유형</label>
            <article className='a-signup-form-role-btn'>
                <button type='button' id='student' name='student'>
                    <h4>수강생</h4>
                    <p>강의를 수강합니다</p>
                </button>
                <button type='button' id='instructor' name='instructor' className='a-active-role-btn'>
                    <h4>강사</h4>
                    <p>강의를 개설합니다</p>
                </button>
            </article>
            <label>닉네임</label>
            <input className='a-signup-input' placeholder='닉네밍' />
            <p></p>
            <label>이메일</label>
            <input className='a-signup-input' />
            <p></p>
            <label>비밀번호</label>
            <div className='a-signup-password-input'>
                <input type={isVisible ? 'text' : 'password'} placeholder='비밀번호를 입력해주세요' />
                <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
            </div>
            <p></p>
            <label>비밀번호 확인</label>
            <div className='a-signup-password-input'>
                <input type={isCheckVisible ? 'text' : 'password'} placeholder='비밀번호를 입력해주세요' />
                <img onClick={() => setIsCheckVisible(!isCheckVisible)} src={isCheckVisible ? activeEye : noneActiveEye} />
            </div>
            <p></p>
            <label>생년월일</label>
            <input className='a-signup-input' />
            <p></p>
            <label>프로필 이미지</label>
            <div className='a-signup-profileimg-ct'>
                <input hidden />
                <div className='a-signup-profileimg-div'>
                    <img />
                </div>
                <label className='a-signup-input'><img /><p>이미지 선택</p></label>
            </div>
            <SignupLecture />
            <div>
                <p>개인정보 수집 및 이용 동의</p> <p>전문 보기</p>
            </div>
            <button className='a-signup-btn' onClick={(e) => handleSignupBtn(e)}>회원가입</button>
        </form>
    )
}

export default SignupForm
