import React, { useContext, useEffect, useState } from 'react'
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'
import { userFormContext } from '../../pages/auth/SignupForm';

function PasswordInput({ mode, message }) {
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const { userInfo, dispatch } = useContext(userFormContext)

    const name = mode === '비밀번호' ? 'password' : mode === '비밀번호 확인' ? 'passwordCheck' : ''

    useEffect(() => {
        if (!userInfo[name]) {
            setError('');
            return;
        }
        const debounceTimer = setTimeout(() => {
            validate(userInfo[name]);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [userInfo[name]]);


    const validate = (value) => {
        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
            if (!passwordRegex.test(value)) {
                setError('숫자와 영문을 1자 이상 포함하여야 합니다.')
            } else if (value.length < 8) {
                setError('비밀번호는 8자 이상이어야 합니다.')
            } else {
                setError('사용 가능한 비밀번호 입니다.')
            }
        } else if (name === 'passwordCheck') {
            if (userInfo.password === value) {
                setError('비밀번호가 일치합니다.')
            } else {
                setError('비밀번호가 일치하지않습니다.')
            }
        }
    }

    return (
        <>
            <label className='a-user-form-label'>{mode}</label>
            <div className='a-signup-password-input'>
                <input
                    type={isVisible ? 'text' : 'password'}
                    placeholder={`${mode}를 입력해주세요`}
                    name={name}
                    value={userInfo[name]}
                    onChange={(e) => dispatch({ type: 'CHANGEINPUT', payload: e.target })}

                />
                <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
            </div>
            <p className='a-user-form-p'>{error || message}</p>
        </>
    )
}

export default PasswordInput
