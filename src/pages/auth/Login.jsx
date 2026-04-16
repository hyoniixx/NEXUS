import React, { useContext, useReducer, useState } from 'react'
import './Login.css';
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'
import { login } from '../../service/AuthService';
import { getUser } from '../../service/UserService';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';


function setLoginInfo(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.payload.id]: action.payload.value
            }
        case 'LODING':
            return {
                ...state,
                loading: !state.loading
            }
        case 'ERROR':
            return {
                ...state,
                errorMessage: action.payload
            }
        case 'INIT':
            return {
                email: '',
                password: '',
                loading: false,
                errorMessage: '로그인 중 오류가 발생했습니다.'
            }
        default:
            return {
                ...state
            }
    }
}

function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const { userData, dispatch } = useContext(userContext);

    const [loginInfo, loginDispatch] = useReducer(setLoginInfo, {
        email: '',
        password: '',
        loading: false,
        errorMessage: '로그인 중 오류가 발생했습니다.'
    })

    const navigate = useNavigate();

    const trimModal = useModal();
    const errorModal = useModal();


    const handleLoginBtn = async (e) => {
        e.preventDefault();
        if (!(loginInfo.email.trim() && loginInfo.password.trim())) {
            trimModal.openModal();
            return;
        }

        try {
            loginDispatch({ type: 'LOADING' })
            await login(loginInfo.email, loginInfo.password)
            const userInfo = await getUser();
            dispatch({ type: 'SET_USER_DATA', payload: userInfo });
            navigate(`/${userInfo.role}`);
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    loginDispatch({ type: 'ERROR', payload: '올바른 이메일 형식이 아닙니다.' })
                    break;
                case 'auth/invalid-credential':
                    loginDispatch({ type: 'ERROR', payload: '등록된 계정이 아닙니다.' })
                    break;
                case 'auth/too-many-requests':
                    loginDispatch({ type: 'ERROR', payload: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.' })
                    break;
            }
            errorModal.openModal();
        } finally {
            loginDispatch({ type: 'LOADING' })
        }
    }

    return (
        <div>
            <section className='a-login-ct'>
                <article className='a-login-top-ct'>
                    <img />
                    <h2>로그인</h2>
                    <p>NEXUS에 오신 것을 환영합니다</p>
                </article>
                <form className='a-login-form-ct'>
                    <label htmlFor='email'>이메일</label>
                    <input
                        className='a-login-email-input'
                        type='email'
                        placeholder='이메일을 입력해주세요.'
                        value={loginInfo.email}
                        id='email'
                        onChange={(e) => loginDispatch({ type: 'CHANGE_INPUT', payload: e.target })} />
                    <label htmlFor='password'>비밀번호</label>
                    <div className='a-login-password-input'>
                        <input
                            type={isVisible ? 'text' : 'password'}
                            placeholder='비밀번호를 입력해주세요'
                            value={loginInfo.password}
                            id='password'
                            onChange={(e) => loginDispatch({ type: 'CHANGE_INPUT', payload: e.target })} />
                        <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
                    </div>
                    <button onClick={(e) => handleLoginBtn(e)}>{loginInfo.loading ? '로그인 중...' : '로그인'}</button>
                </form>
                <p>계정이 없으신가요? <span>회원가입</span></p>
            </section>
            <Modal
                isModal={trimModal.isModal}
                closeModal={trimModal.closeModal}
                activeModal={trimModal.activeModal}
                title='로그인'
                content={`값을 모두 입력해주세요`}
                type='one'
            />
            <Modal
                isModal={errorModal.isModal}
                closeModal={errorModal.closeModal}
                activeModal={errorModal.activeModal}
                title='로그인'
                content={loginInfo.errorMessage}
                type='one'
            />
        </div>
    )
}

export default Login
