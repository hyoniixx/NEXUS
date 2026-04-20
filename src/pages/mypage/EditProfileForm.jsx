
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
import '../auth/Signup.css';
import setUserInfo from '../../reducer/signupUserReducer';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { changePassword, logout, signup } from '../../service/AuthService';
import { createUser, getUser, updateUser } from '../../service/UserService';
import imgSelect from '../../assets/imgSelect.svg'
import signupFileUpload from '../../assets/signupFileUpload.svg'
import ChangeInput from '../../components/auth/ChangeInput';
import PasswordInput from '../../components/auth/PasswordInput';
import FileInput from '../../components/auth/FileInput';
import { UserFormContext } from '../../context/UserFormContext.js';
import Modal from '../../components/common/Modal.jsx';
import useModal from '../../hooks/useModal.jsx';
import { auth } from '../../firebase/config.js';


function EditProfileForm() {

    const { userData, dispatch: userDispatch } = useContext(userContext);

    const [userInfo, dispatch] = useReducer(setUserInfo, {
        userName: userData.userName,
        birthDate: userData.birthDate,
        profileImage: userData.profileImage,
        role: userData.role,
        password: '',
        passwordCheck: '',
        proStreamerImage: userData.proStreamerImage,
    })
    console.log(userInfo)
    const [formValidation, setFormValidation] = useState({

    })
    const [validateResult, setValidateResult] = useState(false);
    const [imgFile, setImgFile] = useState("");
    const [update, setUpdate] = useState(false);

    const navigate = useNavigate();
    const modal = useModal();
    const modalError = useModal();

    useEffect(() => {
        if (!update) return;
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docSnapShot = await getUser(user.uid);
                userDispatch({ type: 'SET_USER_DATA', payload: docSnapShot })
            }
        })

        return () => unsubscribe();
    }, [update]);

    //유효성 검사 로직
    useEffect(() => {
        let filterValidation
        filterValidation = Object.entries(formValidation).filter(([formName, boolean]) =>
            formName !== 'password'
        ).filter(([formName, boolean]) =>
            formName !== 'passwordCheck'
        )

        const result = filterValidation.filter(([formName, boolean]) =>
            boolean
        )
        setValidateResult(result);
    }, [formValidation])

    //유저 정보 업데이트
    const handleEditBtn = async () => {
        try {
            const updateData = {
                userName: userInfo.userName || userData.userName,
                birthDate: userInfo.birthDate || userData.birthDate,
                profileImage: userData.profileImage || userData.profileImage,
            }
            if (userData.role === 'instructor') {
                updateData.proStreamerImage = userInfo.proStreamerImage || userData.proStreamerImage
            }
            if (userInfo.password.trim() && formValidation.password && formValidation.passwordCheck) {
                const resultPassword = await changePassword(userInfo.password)
            }
            if (validateResult) {
                const resultUser = await updateUser(userData.uid, updateData)
            }
            setUpdate(true);
            modal.openModal();
        } catch (error) {
            console.log('회원정보 수정 실패', error)
            modalError.openModal();
        }
    }

    const modalCheck = useModal(handleEditBtn);


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
                <ChangeInput mode='닉네임' message='2자 이상 입력해주세요.' />
                <PasswordInput mode='비밀번호' message='8자 이상 작성해주세요.' />
                <PasswordInput mode='비밀번호 확인' message='비밀번호를 다시 입력해주세요.' />
                <ChangeInput mode='생년월일' message='' />
                {
                    userData.role === 'instructor' && <FileInput mode='프로/스트리머 인증(선택)' message='프로게이머 또는 스트리머라면 인증 자료를 첨부해주세요 (선택사항)' />
                }

                <button
                    type='button'
                    className={'a-signup-btn m-edit-btn'}
                    onClick={modalCheck.openModal}>
                    저장하기
                </button>

                <button
                    type='button'
                    className={'m-edit-cancel-btn'}
                    onClick={() => navigate('/mypage')}>
                    취소
                </button>


            </form >
            <Modal
                isModal={modal.isModal}
                closeModal={() => { navigate('/mypage'); modal.closeModal() }}
                activeModal={modal.activeModal}
                title='회원정보 수정'
                content={`회원정보가 수정되었습니다.`}
                type='one'
            />
            <Modal
                isModal={modalError.isModal}
                closeModal={modalError.closeModal}
                activeModal={modalError.activeModal}
                title='회원정보 수정'
                content={`회원정보 수정을 실패했습니다.\n다시 시도해주세요.`}
                type='one'
            />
            <Modal
                isModal={modalCheck.isModal}
                closeModal={modalCheck.closeModal}
                activeModal={modalCheck.activeModal}
                title='회원정보 수정'
                content={`회원정보를 수정하시겠습니까?`}
                type='two'
                color='blue'
            />
        </UserFormContext.Provider>
    )
}

export default EditProfileForm

