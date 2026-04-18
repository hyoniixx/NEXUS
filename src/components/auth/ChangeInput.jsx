import React, { useContext, useEffect, useRef } from 'react'
import { userFormContext } from '../../pages/auth/SignupForm'

function ChangeInput({ mode, message }) {

    const { userInfo, dispatch } = useContext(userFormContext)

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


    return (
        <>
            <label className='a-user-form-label'>{mode}</label>
            <input
                className='a-signup-input'
                placeholder={`${mode}을 입력해주세요`}
                type={mode === '생년월일' ? 'date' : 'text'}
                onBlur={(e) => dispatch({ type: 'CHANGEINPUT', payload: inputRef.current })}
                ref={inputRef}
                name={name} />
            <p className='a-user-form-p'>{message}</p>
        </>
    )
}

export default ChangeInput