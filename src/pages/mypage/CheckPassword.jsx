import React, { useRef, useState } from 'react'
import AuthTop from '../../components/auth/AuthTop'
import checkPassword from '../../assets/checkPassword.svg'
import { useNavigate } from 'react-router-dom'
import { verifyCurrentPassword } from '../../service/AuthService';
import useModal from '../../hooks/useModal';
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'
import Modal from '../../components/common/Modal';
import './EditProfile.css';

function CheckPassword() {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const modal = useModal();

    const handleCheckPassword = async (e) => {
        e.preventDefault();
        const result = await verifyCurrentPassword(password)
        console.log(result)
        if (result) {
            navigate('/mypage/edit-profile')
        } else {
            modal.openModal();
        }
    }

    return (
        <div className='a-login-background'>
            <section className='a-login-ct'>
                <AuthTop type='비밀번호 확인' img={checkPassword} />
                <form className='a-login-form-ct'>
                    <label htmlFor='password'>비밀번호</label>
                    <div className='a-login-password-input'>
                        <input
                            type={isVisible ? 'text' : 'password'}
                            placeholder='비밀번호를 입력해주세요'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id='password'
                        />
                        <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
                    </div>
                    <button onClick={(e) => handleCheckPassword(e)}>확인</button>
                    <button
                        className='m-edit-cancel-btn'
                        type='button'
                        onClick={() => navigate('/mypage')}>취소</button>
                </form>
            </section>
            <Modal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='비밀번호 확인'
                content={`비밀번호가 일치하지 않습니다.\n다시 시도해 주세요.`}
                type='one'
            />
        </div>
    )
}

export default CheckPassword
