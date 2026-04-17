function setUserData(state, action) {
    switch (action.type) {
        case 'SET_USER_DATA':
            console.log('222222', action.payload);
            return {
                ...action.payload
            }
        case 'INIT_USER_DATA':
            return {
                userName: "",
                email: "",
                birthDate: "",
                profileImage: null,
                role: "",
                isBlacklist: false,
                csScore: 0,
                csScoreMax: 0,
                csGrade: 0,
                lectures: [],
                wish: [],
                createAt: '',
            }

    }

}

export default setUserData;

