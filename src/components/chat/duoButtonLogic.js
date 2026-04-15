export function setUpdataData(clickEvent) {
    switch (clickEvent) {
        case 'CANCEL_DUO':
            console.log('cancel')
            return {
                [`status.${action.payload.myuid}`]: '취소',
                'participants': action.payload.participants.find(p => p !== action.payload.myuid)
            }
        case 'AGREE_DUO':
            console.log('agree')
            return {
                [`status.${action.payload.myuid}`]: '중',
                [`status.${action.payload.opponentId}`]: '중'
            }
        case 'COMPLETE_DUO':
            console.log('comp')
            return {
                [`status.${action.payload.myuid}`]: '후',
            }
        case 'LEAVE_DUO':
            console.log('le')
            return {
                'participants': action.payload.participants.find(p => p !== action.payload.myuid)
            }
    }
}