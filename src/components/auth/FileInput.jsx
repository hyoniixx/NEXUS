import React, { useContext, useReducer } from 'react'
import signupFileUpload from '../../assets/signupFileUpload.svg'
import setFeedback from '../../reducer/feedbackReducer'
import { UserFormContext } from '../../context/UserFormContext'

function FileInput({ mode, message }) {

    const { userInfo, dispatch, formValidation, setFormValidation } = useContext(UserFormContext)

    const [feedback, feedbackDispatch] = useReducer(setFeedback, {
        status: 'message',
        message: message
    })
    const validateFunc = (type, payload) => {
        feedbackDispatch({ type: type, payload: payload });
        setFormValidation({ ...formValidation, [name]: type === 'SUCCESS' ? true : false })
    }
    const name = mode === '티어 인증 이미지' ? 'tierImage' : mode === '프로/스트리머 인증(선택)' ? 'proStreamerImage' : ''

    const validate = (value) => {
        if (name === 'tierImage' && value) {
            validateFunc('SUCCESS', '티어 인증 이미지가 제출되었습니다.')
        } else if (name === 'tierImage' && !value) {
            console.log(value)
            validateFunc('ERROR', '티어 인증 이미지를 제출해주세요')
        }
    }
    return (
        <>
            <label className='a-user-form-file-label'>{mode}</label>
            <p className={`a-user-form-file-p a-signup-${feedback.status}-p`}>{feedback.message}</p>
            <input
                hidden
                id={mode}
                name={name}
                type='file'
                accept="image/*"
                onChange={(e) => { dispatch({ type: 'CHANGEIMAGE', payload: e.target }); validate(e.target.files[0].name); }}
            />
            <label className='a-signup-input' htmlFor={mode}><img src={signupFileUpload} /> 인증 자료 업로드</label>
            <p className='a-user-form-p'>{userInfo[name]}</p>
        </>
    )
}

export default FileInput