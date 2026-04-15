import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { chatContext } from '../../pages/chat/Chat'
import { useNavigate } from 'react-router-dom'
import { updateChat } from '../../service/ChatService'
// import { updateChat } from '../../service/ChatService'


function setUpdataData(state, action) {
    switch (action.type) {
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


function ChatButton() {
    const { currentChatInfo } = useContext(chatContext);
    const {
        currentChatType,
        currentChatId,
        currentChatOpponentId,
        currentChatStatus,
        currentChatI,
        currentParticipants
    } = currentChatInfo
    const [updateData, dispatch] = useReducer(setUpdataData, currentChatInfo.currentChatStatus)
    const navigate = useNavigate();
    const myuid = 'asdf';

    useEffect(() => {
        updateChat(currentChatInfo.currentChatId, updateData)
        console.log('성공');
    }, [updateData])


    const chatStatus = () => {
        if (currentChatType === 'duo') {
            if (currentChatI.role === 'host') {
                if (currentChatStatus[currentChatOpponentId] === '취소') {
                    return { text: '나가기', color: 'purple', clickEvent: 'LEAVE_DUO' };
                } else if (currentChatStatus[myuid] === '전') {
                    return { text: ['듀오 거절', '듀오 승낙'], color: ['red', 'blue'], clickEvent: ['CANCEL_DUO', 'AGREE_DUO'] };
                } else if (currentChatStatus[myuid] === '중') {
                    return { text: '듀오 완료', color: 'purple', clickEvent: 'COMPLETE_DUO' };
                } else if (currentChatStatus[myuid] === '후') {
                    return { text: '나가기', color: 'black', clickEvent: 'LEAVE_DUO' };
                } else {
                    return { text: '닫기', color: 'purple', clickEvent: 'LEAVE_DUO' };
                }
            } else if (currentChatI.role === 'guest') {
                if (currentChatStatus[currentChatOpponentId] === '취소') {
                    return { text: '나가기', color: 'purple', clickEvent: 'LEAVE_DUO' };
                } else if (currentChatStatus[myuid] === '전') {
                    return { text: '듀오 취소', color: 'red', clickEvent: 'CANCEL_DUO' };
                } else if (currentChatStatus[myuid] === '중') {
                    return { text: '듀오 완료', color: 'purple', clickEvent: 'COMPLETE_DUO' };
                } else if (currentChatStatus[myuid] === '후') {
                    return { text: '나가기', color: 'black', clickEvent: 'LEAVE_DUO' };
                } else {
                    return { text: '닫기', color: 'purple', clickEvent: 'LEAVE_DUO' };
                }
            } else {
                return { text: '닫기', color: 'purple' };
            }
        } else if (currentChatType === 'lecture') {
            if (currentChatI.role === 'instructor') {
                switch (currentChatStatus[currentChatOpponentId]) {
                    case '취소':
                        return { text: '닫기', color: 'purple', clickEvent: '채팅방 삭제' };
                    case '전':
                        return { text: '강의 확정', color: 'blue', clickEvent: '둘다 중으로 상태 변경' };
                    case '중':
                        return { text: '강의 중', color: 'purple', clickEvent: 'none' };
                    case '후':
                        return { text: '강의 완료', color: 'black', clickEvent: 'none' };
                    default:
                        return { text: '오류', color: 'white', clickEvent: 'none' }
                }
            } else if (currentChatI.role === 'student') {
                switch (currentChatStatus[myuid]) {
                    case '취소':
                        return { text: '닫기', color: 'purple', clickEvent: '채팅방 나감' };
                    case '전':
                        return { text: '취소하기', color: 'red', clickEvent: '취소 문자 발송, 자신의 상태 취소로' };
                    case '중':
                        return { text: '수강 완료', color: 'blue', clickEvent: '둘다 후로 상태 변경, 수강종료되었습니다. 문자 발송' };
                    case '후':
                        return { text: '수강 완료', color: 'black', clickEvent: 'none' };
                    default:
                        return { text: '오류', color: 'purple', clickEvent: 'none' }
                }
            } else {
                return { text: '닫기', color: 'purple' };
            }
        } else {
            return { text: '닫기', color: 'purple' };
        }
    }

    const btn = useMemo(() => {
        return chatStatus();
    }, [currentChatStatus, currentChatId])

    //채팅 정보를 업데이트 하는 함수
    const handleUpdateChat = (clickEvent) => {
        dispatch({
            type: `${clickEvent}`,
            payload: {
                myuid: myuid,
                participants: currentParticipants
            }
        })
    }

    return (
        <div>
            {typeof btn.text === 'object' ? (<>
                <button className={`c-chat-${btn.color[0]}button`} onClick={() => handleUpdateChat(btn.clickEvent[0])}>{btn.text[0]}</button>
                <button className={`c-chat-${btn.color[1]}button`} onClick={() => handleUpdateChat(btn.clickEvent[1])}>{btn.text[1]}</button>
            </>) : (
                <button className={`c-chat-${btn.color}button`} onClick={() => handleUpdateChat(btn.clickEvent)}>{btn.text}</button>
            )}
        </div>
    )
}

export default ChatButton
