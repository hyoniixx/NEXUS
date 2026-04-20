function setFeedback(state, action) {
    switch (action.type) {
        case 'MESSAGE':
            return {
                status: 'message',
                message: action.payload
            }
        case 'ERROR':
            return {
                status: 'error',
                message: action.payload
            }
        case 'SUCCESS':
            return {
                status: 'success',
                message: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default setFeedback;