function setUpdataData(state, action) {
    switch (action.type) {
        case 'CANCEL_DUO':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '취소',
                        [`${action.payload.opponentId}`]: state.updateData.status[action.payload.opponentId],
                    },
                    participants: action.payload.participants.find(p => p !== action.payload.myuid)
                },
                sendMessage: '듀오가 취소되었습니다.'
            }
        case 'CANCEL_LECTURE':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '취소',
                        [`${action.payload.opponentId}`]: state.updateData.status[action.payload.opponentId],
                    },
                    participants: action.payload.participants.find(p => p !== action.payload.myuid)
                },
                sendMessage: '강의가 취소되었습니다.'
            }
        case 'AGREE_DUO':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '중',
                        [`${action.payload.opponentId}`]: '중',
                    },
                    participants: action.payload.participants
                },
                sendMessage: '듀오가 확정되었습니다.'
            }
        case 'AGREE_LECTURE':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '중',
                        [`${action.payload.opponentId}`]: '중',
                    },
                    participants: action.payload.participants
                },
                sendMessage: '강의가 확정되었습니다.'
            }
        case 'COMPLETE_DUO':
            console.log('comp')
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '후',
                        [`${action.payload.opponentId}`]: state.updateData.status[action.payload.opponentId],
                    },
                    participants: action.payload.participants
                },
                sendMessage: `${action.payload.myNickname}님이 듀오 평가를 완료했습니다.`
            }
        case 'LEAVE':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: state.updateData.status[action.payload.myuid],
                        [`${action.payload.opponentId}`]: state.updateData.status[action.payload.opponentId],
                    },
                    participants: action.payload.participants.find(p => p !== action.payload.myuid)
                },
                sendMessage: `${action.payload.myNickname}님이 채팅방을 나갔습니다.`
            }
        case 'COMPLETE_LECTURE':
            return {
                ...state,
                updateData: {
                    status: {
                        [`${action.payload.myuid}`]: '후',
                        [`${action.payload.opponentId}`]: '후',
                    },
                    participants: action.payload.participants
                },
                sendMessage: `수강 완료되었습니다.`
            }
        default:
            return {

            }
    }
}

export default setUpdataData;