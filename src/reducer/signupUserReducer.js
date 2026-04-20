function setUserInfo(state, action) {
    switch (action.type) {
        case 'CHANGEROLE':
            return {
                ...state,
                role: action.payload
            }
        case 'CHANGEINPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CHANGEIMAGE':
            return {
                ...state,
                [action.payload.name]: action.payload.files[0].name
            }
        case 'CHANGECHECK':
            return {
                ...state,
                check: !state.check
            }
        case 'RESETINPUT':
            return {
                userName: "",
                email: "",
                birthDate: "",
                profileImage: null,
                role: "student",
                password: '',
                passwordCheck: '',
                tierImage: null,
                proStreamerImage: null,
            }
    }
}

export default setUserInfo;