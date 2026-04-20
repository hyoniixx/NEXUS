import React, { useContext, useEffect, useReducer, useState } from 'react'
import activeEye from '../../assets/activeEye.svg'
import noneActiveEye from '../../assets/noneActiveEye.svg'
import setFeedback from '../../reducer/feedbackReducer';
import { UserFormContext } from '../../context/UserFormContext';


function PasswordInput({ mode, message }) {
    const [isVisible, setIsVisible] = useState(false);
    const [feedback, feedbackDispatch] = useReducer(setFeedback, {
        status: 'message',
        message: message
    })
    const { userInfo, dispatch, formValidation, setFormValidation } = useContext(UserFormContext)



    const [first, setFirst] = useState(true)

    const validateFunc = (type, payload) => {
        feedbackDispatch({ type: type, payload: payload });
        setFormValidation({ ...formValidation, [name]: type === 'SUCCESS' ? true : false })
    }

    const name = mode === '비밀번호' ? 'password' : mode === '비밀번호 확인' ? 'passwordCheck' : ''

    useEffect(() => {
        if (!userInfo[name]) {
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
            return;
        }
    }


    const validate = (value) => {
        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
            if (!passwordRegex.test(value)) {
                validateFunc('ERROR', '숫자와 영문을 1자 이상 포함하여야 합니다.')

            } else if (value.length < 8) {
                validateFunc('ERROR', '비밀번호는 8자 이상이어야 합니다.')

            } else {
                validateFunc('SUCCESS', '사용 가능한 비밀번호 입니다.')

            }

        } else if (name === 'passwordCheck') {
            if (userInfo.password === value) {
                validateFunc('SUCCESS', '비밀번호가 일치합니다.')

            } else {
                validateFunc('ERROR', '비밀번호가 일치하지않습니다.')

            }
        }

    }

    return (
        <>
            <label className='a-user-form-label'>{mode} <span className='a-signup-required'>*</span></label>
            <div className={`a-signup-${feedback.status}-input a-signup-password-input`}>
                <input
                    type={isVisible ? 'text' : 'password'}
                    placeholder={`${mode}를 입력해주세요`}
                    name={name}
                    value={userInfo[name]}
                    onChange={(e) => dispatch({ type: 'CHANGEINPUT', payload: e.target })}
                    onBlur={handleEmpth}
                />
                <img onClick={() => setIsVisible(!isVisible)} src={isVisible ? activeEye : noneActiveEye} />
            </div>
            <p className={`a-signup-${feedback.status}-p a-user-form-p`}>{feedback.message}</p>
        </>
    )
}

export default PasswordInput
