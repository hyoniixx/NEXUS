import React from 'react'

function FileInput({ mode, message }) {
    return (
        <>
            <label className='a-user-form-label'>{mode}</label>
            <p className='a-user-form-p'>{message}</p>
            <input hidden id={mode} type='file' />
            <label className='a-signup-input' htmlFor={mode}>인증 자료 업로드</label>
        </>
    )
}

export default FileInput