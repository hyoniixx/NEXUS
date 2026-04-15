import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { chatContext } from '../../pages/chat/Chat'
import { useNavigate } from 'react-router-dom'
import { deleteChat, updateChat } from '../../service/ChatService'
import { createMessage, deleteMessage } from '../../service/MessageService'
import setUpdataData from '../../reducer/chatButtonReducer'
import ReviewDuo from '../common/ReviewDuoModal'
// import { updateChat } from '../../service/ChatService'





function ChatButton() {
    const { currentChatInfo } = useContext(chatContext);
    const {
        currentChatType,
        currentChatId,
        currentChatOpponentId,
        currentChatStatus,
        currentChatI,
        currentParticipants,
    } = currentChatInfo

    const [copyCurrentParticipants, setCopyCurrentParticipants] = useState(currentParticipants)
    const [copyCurrentChatStatus, setCopyCurrentChatStatus] = useState(currentChatStatus)
    console.log('1', copyCurrentParticipants, copyCurrentChatStatus)
    const [update, dispatch] = useReducer(setUpdataData, {
        updateData: {
            status: currentChatStatus,
            participants: currentParticipants
        },
        sendMessage: ''
    })
    const navigate = useNavigate();
    const myuid = 'asdf';
    const myNickname = '정프로'

    useEffect(() => {

        if (update.sendMessage === '') {
            return;
        }
        console.log('실행')
        //수정된 채팅 정보 업데이트 
        updateChat(currentChatInfo.currentChatId, update.updateData);
        console.log('ddddd', update.updateData)
        console.log('2', { ...copyCurrentChatStatus, ...update.updateData.status })
        setCopyCurrentChatStatus({ ...copyCurrentChatStatus, ...update.updateData.status });
        console.log('3', copyCurrentChatStatus)

        //안내 메세지 보내주는 함수
        createMessage({
            type: currentChatInfo.currentChatType,
            roomId: currentChatInfo.currentChatId,
            fromMemberId: 'admin',
            fromMemberName: '관리자',
            content: update.sendMessage
        });
        console.log('성공');
    }, [update.updateData])


    useEffect(() => {
        setCopyCurrentParticipants(currentParticipants)
        setCopyCurrentChatStatus(currentChatStatus)
        console.log(copyCurrentChatStatus, copyCurrentParticipants)
    }, [currentChatId])

    const chatStatus = () => {
        if (currentChatType === 'duo') {
            if (currentChatI.role === 'host') {
                if (copyCurrentChatStatus[currentChatOpponentId] === '취소') {
                    return { text: '나가기', color: 'purple', clickEvent: 'LEAVE' };
                } else if (copyCurrentChatStatus[myuid] === '전') {
                    return { text: ['듀오 거절', '듀오 승낙'], color: ['red', 'blue'], clickEvent: ['CANCEL_DUO', 'AGREE_DUO'] };
                } else if (copyCurrentChatStatus[myuid] === '중') {
                    return { text: '듀오 완료', color: 'purple', clickEvent: 'COMPLETE_DUO', modal: 'true' };
                } else if (copyCurrentChatStatus[myuid] === '후') {
                    return { text: '나가기', color: 'black', clickEvent: 'LEAVE' };
                } else {
                    return { text: '닫기', color: 'purple', clickEvent: 'LEAVE' };
                }
            } else if (currentChatI.role === 'guest') {
                if (copyCurrentChatStatus[currentChatOpponentId] === '취소') {
                    return { text: '나가기', color: 'purple', clickEvent: 'LEAVE' };
                } else if (copyCurrentChatStatus[myuid] === '전') {
                    return { text: '듀오 취소', color: 'red', clickEvent: 'CANCEL_DUO' };
                } else if (copyCurrentChatStatus[myuid] === '중') {
                    return { text: '듀오 완료', color: 'purple', clickEvent: 'COMPLETE_DUO', modal: 'true' };
                } else if (copyCurrentChatStatus[myuid] === '후') {
                    return { text: '나가기', color: 'black', clickEvent: 'LEAVE' };
                } else {
                    return { text: '닫기', color: 'purple', clickEvent: 'LEAVE' };
                }
            } else {
                return { text: '닫기', color: 'purple' };
            }
        } else if (currentChatType === 'lecture') {
            if (currentChatI.role === 'instructor') {
                switch (copyCurrentChatStatus[currentChatOpponentId]) {
                    case '취소':
                        return { text: '나가기', color: 'purple', clickEvent: 'LEAVE' };
                    case '전':
                        return { text: '강의 확정', color: 'blue', clickEvent: 'AGREE_LECTURE' };
                    case '중':
                        return { text: '강의 중', color: 'purple', clickEvent: 'none' };
                    case '후':
                        return { text: '나가기', color: 'black', clickEvent: 'LEAVE' };
                    default:
                        return { text: '오류', color: 'white', clickEvent: 'LEAVE' }
                }
            } else if (currentChatI.role === 'student') {
                switch (copyCurrentChatStatus[myuid]) {
                    case '취소':
                        return { text: '나가기', color: 'purple', clickEvent: 'LEAVE' };
                    case '전':
                        return { text: '취소하기', color: 'red', clickEvent: 'CANCEL_LECTURE' };
                    case '중':
                        return { text: '수강 완료', color: 'blue', clickEvent: 'COMPLETE_LECTURE' };
                    case '후':
                        return { text: '나가기', color: 'black', clickEvent: 'LEAVE' };
                    default:
                        return { text: '오류', color: 'purple', clickEvent: 'LEAVE' }
                }
            } else {
                return { text: '닫기', color: 'purple' };
            }
        } else {
            return { text: '닫기', color: 'purple' };
        }
    }

    const btn = useMemo(() => {
        console.log('4', copyCurrentChatStatus);
        return chatStatus();
    }, [copyCurrentChatStatus])

    //채팅 정보를 수정하는 함수
    const handleUpdateChat = (clickEvent) => {
        if (clickEvent === 'none') {
            return;
        }

        if (clickEvent === 'LEAVE' && currentParticipants.length === 1) {
            deleteChat(currentChatId);
            deleteMessage(currentChatId);
            return;
        }

        if (clickEvent === 'COMPLETE_DUO') {

        }

        dispatch({
            type: `${clickEvent}`,
            payload: {
                myuid: myuid,
                myNickname: myNickname,
                participants: currentParticipants,
                opponentId: currentChatOpponentId
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
            <ReviewDuo />
        </div>
    )
}

export default ChatButton
