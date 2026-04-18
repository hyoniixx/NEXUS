import React, { useContext } from 'react'
import { userFormContext } from '../../pages/auth/SignupForm'

function RoleSelect({ mode, message }) {

    const { userInfo, dispatch } = useContext(userFormContext);

    return (
        <>
            <button
                onClick={(e) => dispatch({ type: 'CHANGEROLE', payload: e.target.closest(`#${mode}`).name })}
                type='button'
                id={mode}
                name={mode}
                className={mode === userInfo.role && 'a-active-role-btn'}>
                <h4>{mode === 'student' ? '수강생' : '강사'}</h4>
                <p>{message}</p>
            </button>
        </>
    )
}

export default RoleSelect
