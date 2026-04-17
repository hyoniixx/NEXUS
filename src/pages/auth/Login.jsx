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
import loginMain from '../../assets/loginMain.svg'
import AuthTop from '../../components/auth/AuthTop';
import setLoginInfo from '../../reducer/loginReducer';
import { type } from 'firebase/firestore/pipelines';


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

    const sucesssModal = useModal();
    const errorModal = useModal();


    const handleLoginBtn = async (e) => {
        e.preventDefault();
        if (!(loginInfo.email.trim() && loginInfo.password.trim())) {
            loginDispatch({ type: 'ERROR' })
            errorModal.openModal();
            return;
        }

        try {
            loginDispatch({ type: 'LOADING' })
            await login(loginInfo.email, loginInfo.password)
            const userInfo = await getUser();
            dispatch({ type: 'SET_USER_DATA', payload: userInfo });
            console.log('1');
            sucesssModal.openModal();
        } catch (error) {
            loginDispatch({ type: error.code })
            console.log('2');
            errorModal.openModal();
        } finally {
            loginDispatch({ type: 'LOADING' })
        }
    }

    return (
        <div className='a-login-background'>
            <section className='a-login-ct'>
                <AuthTop type='로그인' img={loginMain} />
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
                <p className='a-login-question'>계정이 없으신가요? <span onClick={() => navigate('/signup')}>회원가입</span></p>
            </section>
            <Modal
                isModal={sucesssModal.isModal}
                closeModal={() => { sucesssModal.closeModal(); navigate(`/${userData.role}`); }}
                activeModal={sucesssModal.activeModal}
                title='로그인'
                content={'로그인 성공하였습니다.'}
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
