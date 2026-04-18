import React, { useContext, useEffect, useState } from 'react'
import { userFormContext } from '../../pages/auth/SignupForm'
import { getUserEmail } from '../../service/UserService';

function DebounceInput({ mode, message }) {

    const { userInfo, dispatch } = useContext(userFormContext)
    const [error, setError] = useState('');
    const name = mode === '이메일' ? 'email' : ''

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

    const validate = async (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setError('올바른 이메일 형식이 아닙니다.');
        } else {
            const emailMessage = await getUserEmail(value)
            setError(emailMessage);
        }
    }

    return (
        <>
            <label className='a-user-form-label'>{mode}</label>
            <input
                className='a-signup-input'
                placeholder={`${mode}을 입력해주세요`}
                value={userInfo[name]}
                onChange={(e) => { dispatch({ type: 'CHANGEINPUT', payload: e.target }); }}
                name={name}
            />
            <p className='a-user-form-p'>{error || message}</p>
        </ >
    )
}

export default DebounceInput