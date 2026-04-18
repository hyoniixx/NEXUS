import React, { createContext, useReducer, useState } from 'react'
import SignupLecture from './SignupLecture'
import './SignupForm.css';
import { signup } from '../../service/AuthService';
import { createUser } from '../../service/UserService';
import imgSelect from '../../assets/imgSelect.svg'
import ChangeInput from '../../components/auth/ChangeInput';
import DebounceInput from '../../components/auth/DebounceInput';
import PasswordInput from '../../components/auth/PasswordInput';
import RoleSelect from '../../components/auth/RoleSelect';

function setUserInfo(state, action) {
    switch (action.type) {
        case 'CHANGEROLE':
            return {
                ...state,
                role: action.payload
            }
        case 'CHANGEINPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'RESETINPUT':
            return {
                userName: "",
                email: "",
                birthDate: "",
                profileImage: null,
                role: "student",
                password: '',
                passwordCheck: '',
                tierImage: null,
                proStreamerImage: null,
            }
    }
}

export const userFormContext = createContext();

function SignupForm() {
    const [userInfo, dispatch] = useReducer(setUserInfo, {
        userName: "",
        email: "",
        birthDate: "",
        profileImage: null,
        role: "student",
        password: '',
        passwordCheck: '',
        gameName: '',
        gameTag: '',
        instructorCertification: false,
        tierImage: null,
        proStreamerImage: null,
    })
    console.log(userInfo)

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
        <userFormContext.Provider value={{ userInfo, dispatch }}>
            <form className='a-signup-form-ct'>
                <label className='a-user-form-label'>가입 유형</label>
                <article className='a-signup-form-role-btn'>
                    <RoleSelect mode='student' message='강의를 수강합니다' />
                    <RoleSelect mode='instructor' message='강의를 개설합니다' />
                </article>
                <ChangeInput mode='닉네임' message='2자 이상 입력해주세요.' />
                <DebounceInput mode='이메일' message='이메일 형식을 맞춰주세요.' />
                <PasswordInput mode='비밀번호' message='8자 이상 작성해주세요.' />
                <PasswordInput mode='비밀번호 확인' message='비밀번호를 다시 입력해주세요.' />
                <ChangeInput mode='생년월일' message='' />
                <label className='a-user-form-label'>프로필 이미지</label>
                <div className='a-signup-profileimg-ct'>
                    <input type='file' hidden id='profileimg' />
                    <div className='a-signup-profileimg-div'>
                        <img src={imgSelect} />
                    </div>
                    <label className='a-signup-input' htmlFor='profileimg'><img /><p>이미지 선택</p></label>
                </div>
                {
                    userInfo.role === 'instructor' && <SignupLecture />
                }
                {userInfo.role === 'instructor' && !userInfo.instructorCertification ? (
                    <></>
                ) :
                    (<>
                        <div>
                            <p>개인정보 수집 및 이용 동의</p> <p>전문 보기</p>
                        </div>
                        <button className='a-signup-btn' onClick={(e) => handleSignupBtn(e)}>회원가입</button>
                    </>)
                }
            </form >
        </userFormContext.Provider>
    )
}

export default SignupForm
