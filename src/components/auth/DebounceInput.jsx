import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getUserEmail } from '../../service/UserService';
import setFeedback from '../../reducer/feedbackReducer';
import { UserFormContext } from '../../context/UserFormContext';

function DebounceInput({ mode, message }) {
    const { userInfo, dispatch, formValidation, setFormValidation } = useContext(UserFormContext)


    const [feedback, feedbackDispatch] = useReducer(setFeedback, {
        status: 'message',
        message: message
    })
    const [first, setFirst] = useState(true)

    const name = mode === '이메일' ? 'email' : ''


    const validateFunc = (type, payload) => {
        feedbackDispatch({ type: type, payload: payload });
        setFormValidation({ ...formValidation, [name]: type === 'SUCCESS' ? true : false })
    }

    //debounce 작동
    useEffect(() => {
        if (!userInfo[name] && first) {
            validateFunc('MESSAGE', message)
            return;
        }

        const debounceTimer = setTimeout(() => {
            validate(userInfo[name]);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [userInfo[name]]);


    const handleEmpth = () => {
        setFirst(false)
        if (!userInfo[name].trim()) {
            validateFunc('ERROR', '값을 입력해주세요.')

            // feedbackDispatch({ type: 'ERROR', payload: '값을 입력해주세요.' })
            return;
        }
    }



    //유효성 검사
    const validate = async (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            validateFunc('ERROR', '올바른 이메일 형식이 아닙니다.')
            // feedbackDispatch({ type: 'ERROR', payload: '올바른 이메일 형식이 아닙니다.' })
        } else {
            const emailMessage = await getUserEmail(value)
            emailMessage === 'error' ?
                validateFunc('ERROR', '이미 사용 중인 이메일입니다.')
                // feedbackDispatch({ type: 'ERROR', payload: '이미 사용 중인 이메일입니다.' })
                :
                validateFunc('SUCCESS', '사용 가능한 이메일입니다.')

            // feedbackDispatch({ type: 'SUCCESS', payload: '사용 가능한 이메일입니다.' })

        }
    }

    return (
        <>
            <label className='a-user-form-label'>{mode} <span className='a-signup-required'>*</span></label>
            <input
                className={`a-signup-${feedback.status}-input a-signup-input`}
                placeholder={`${mode}을 입력해주세요`}
                value={userInfo[name]}
                onChange={(e) => { dispatch({ type: 'CHANGEINPUT', payload: e.target }); }}
                onBlur={handleEmpth}
                name={name}
            />
            <p className={`a-signup-${feedback.status}-p a-user-form-p`}>{feedback.message}</p>
        </ >
    )
}

export default DebounceInput