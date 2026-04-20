function setLoginInfo(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.payload.id]: action.payload.value
            }
        case 'LODING':
            return {
                ...state,
                loading: !state.loading
            }
        case 'ERROR':
            return {
                ...state,
                errorMessage: `값을 모두 입력해주세요`
            }
        case 'auth/invalid-email':
            return {
                ...state,
                errorMessage: '올바른 이메일 형식이 아닙니다.'
            }
        case 'auth/invalid-credential':
            return {
                ...state,
                errorMessage: '등록된 계정이 아닙니다.'
            }
        case 'auth/too-many-requests':
            return {
                ...state,
                errorMessage: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.'
            }
        case 'INIT':
            return {
                email: '',
                password: '',
                loading: false,
                errorMessage: '로그인 중 오류가 발생했습니다.'
            }
        default:
            return {
                ...state
            }
    }
}

export default setLoginInfo;
