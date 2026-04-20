import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import setFeedback from '../../reducer/feedbackReducer';
import { UserFormContext } from '../../context/UserFormContext';

function ChangeInput({ mode, message }) {

    const { userInfo, dispatch, formValidation, setFormValidation } = useContext(UserFormContext)
    const [feedback, feedbackDispatch] = useReducer(setFeedback, {
        status: 'message',
        message: message
    })

    let name = '';
    switch (mode) {
        case '닉네임':
            name = 'userName';
            break;
        case '생년월일':
            name = 'birthDate';
            break;
        case '롤 게임 닉네임':
            name = 'gameName';
            break;
        case '태그라인':
            name = 'gameTag';
            break;
    }

    const inputRef = useRef();

    const validateFunc = (type, payload) => {
        feedbackDispatch({ type: type, payload: payload });
        setFormValidation({ ...formValidation, [name]: type === 'SUCCESS' ? true : false })
    }

    useEffect(() => {
        if (name === 'gameTag') {
            inputRef.current.value = 'kr';
        }
        if (userInfo.userName) {
            inputRef.current.value = userInfo[name];
        }
    }, [])

    const nicnameValidate = () => {
        if (inputRef.current.value.length < 2) {
            validateFunc('ERROR', '닉네임은 2자 이상 작성해주세요.')

        } else {
            validateFunc('SUCCESS', message)
        }
    }

    const validate = () => {
        if (!inputRef.current.value.trim()) {
            if (name === 'userName' || name === 'birthDate') {
                validateFunc('ERROR', '값을 입력해주세요.')
                return;
            } else {
                feedbackDispatch({ type: 'ERROR', payload: '값을 입력해주세요.' });
                return;
            }

        } else {
            if (name === 'userName' || name === 'birthDate') {
                validateFunc('SUCCESS', message)
                return;
            } else {
                feedbackDispatch({ type: 'SUCCESS', payload: message });
                return;
            }
        }
        if (name === 'userName') {
            nicnameValidate();
        }
    }


    return (
        <>
            <label className='a-user-form-label'>{mode} <span className='a-signup-required'>*</span></label>
            <input
                className={`a-signup-${feedback.status}-input a-signup-input`}
                placeholder={`${mode}을 입력해주세요`}
                type={mode === '생년월일' ? 'date' : 'text'}
                onBlur={(e) => { dispatch({ type: 'CHANGEINPUT', payload: inputRef.current }); validate(); }}
                ref={inputRef}
                name={name} />
            <p className={`a-signup-${feedback.status}-p a-user-form-p`}>{feedback.message}</p>
        </>
    )
}

export default ChangeInput