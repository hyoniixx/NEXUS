import React, { useEffect, useMemo, useReducer, useState } from 'react'
import SignupLecture from './SignupLecture'
import './SignupForm.css';
import { logout, signup } from '../../service/AuthService';
import { createUser } from '../../service/UserService';
import imgSelect from '../../assets/imgSelect.svg'
import ChangeInput from '../../components/auth/ChangeInput';
import DebounceInput from '../../components/auth/DebounceInput';
import PasswordInput from '../../components/auth/PasswordInput';
import RoleSelect from '../../components/auth/RoleSelect';
import signupFileUpload from '../../assets/signupFileUpload.svg'
import { type } from 'firebase/firestore/pipelines';
import setUserInfo from '../../reducer/signupUserReducer';
import { useNavigate } from 'react-router-dom';
import { UserFormContext } from '../../context/UserFormContext.js'

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
        instructorCertification: 'undefined',
        tierImage: '',
        proStreamerImage: null,
        check: false
    })

    const [formValidation, setFormValidation] = useState({
        userName: false,
        email: false,
        birthDate: false,
        password: false,
        passwordCheck: false,
        tierImage: false,
        check: false
    })
    const [activeBtn, setActiveBtn] = useState(true)
    const [imgFile, setImgFile] = useState("");

    const navigate = useNavigate();

    //유효성 검사 로직
    useEffect(() => {
        console.log('fffffffffffff', formValidation)
        let filterValidation
        if (userInfo.role === 'student') {
            filterValidation = Object.entries(formValidation).filter(([formName, boolean]) =>
                formName !== 'tierImage'
            )
        } else {
            filterValidation = Object.entries(formValidation)
        }
        const result = filterValidation.every(([formName, boolean]) =>
            boolean
        )

        setActiveBtn(result);
    }, [formValidation])

    //회원가입 제출 버튼
    const handleSignupBtn = async (e) => {
        e.preventDefault();
        try {
            const userId = await signup(userInfo.email, userInfo.password)
            const signupData = {
                userName: userInfo.userName,
                email: userInfo.email,
                birthDate: userInfo.birthDate,
                profileImage: userInfo.profileImage,
                role: userInfo.role,
            }
            if (userInfo.role === 'instructor') {
                signupData.tierImage = userInfo.tierImage;
                signupData.proStreamerImage = userInfo.proStreamerImage;
            }
            console.log('signupData', signupData)

            await createUser({
                uid: userId.uid,
                userInfo: {
                    ...signupData
                }
            })

            console.log('회원가입 완료')
            if (userInfo.role === 'instructor') {
                console.log(userInfo.role)
                await logout();
            }
            navigate(`/signupcomp/${userInfo.role}`)

        } catch (error) {
            console.log('회원가입 실패', error)
        }
    }


    //이미지 미리 보기
    const previewImgFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };

    return (
        <UserFormContext.Provider value={{ userInfo, dispatch, formValidation, setFormValidation }}>
            <form className='a-signup-form-ct'>
                <label className='a-user-form-label'>가입 유형 <span className='a-signup-required'>*</span></label>
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
                    <input
                        type='file'
                        hidden
                        id='profileimg'
                        name='profileImage'
                        accept="image/*"
                        onChange={(e) => { dispatch({ type: 'CHANGEIMAGE', payload: e.target }); previewImgFile(e); }} />
                    <div className='a-signup-profileimg-div'>
                        <img className={imgFile ? 'a-signup-profile-img' : ''} src={imgFile ? imgFile : imgSelect} />
                    </div>
                    <label className='a-signup-input' htmlFor='profileimg'>
                        <img src={signupFileUpload} />
                        <p>이미지 선택</p>
                    </label>
                </div>
                {
                    userInfo.role === 'instructor' && <SignupLecture />
                }
                {userInfo.role === 'instructor' && (!userInfo.instructorCertification || userInfo.instructorCertification === 'undefined') ?
                    (
                        <></>
                    ) :
                    (
                        <>
                            <div className='a-signup-agree'>
                                <input
                                    id='agreeCheck'
                                    type='checkbox'
                                    checked={userInfo.check}
                                    onChange={() => { dispatch({ type: 'CHANGECHECK' }); setFormValidation({ ...formValidation, check: !formValidation.check }); }} />
                                <label htmlFor='agreeCheck'>개인정보 수집 및 이용 동의 <span className='a-signup-required'>*</span></label>
                                <p>전문 보기</p>
                            </div>
                            <button
                                disabled={!activeBtn}
                                className={!activeBtn ? 'a-signup-btn-disabled' : 'a-signup-btn'}
                                onClick={(e) => handleSignupBtn(e)}>
                                회원가입
                            </button>
                        </>
                    )
                }
            </form >
        </UserFormContext.Provider>
    )
}

export default SignupForm
