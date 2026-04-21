import React, { useContext, useEffect } from 'react'
import './ChatRoom.css'
import { chatContext } from '../../pages/chat/Chat';
import { userContext } from '../../App';
import { useLocation } from 'react-router-dom';
//채팅방 왼쪽에있는 방 하나하나
function ChatRoom({ type, roomId, refId, participantInfo, lastMessage, lastMessageAt, unreadCount, createdAt, status, participants }) {
    const { setCurrentChatInfo } = useContext(chatContext);
    const { userData } = useContext(userContext);
    const myuid = userData.uid;
    const keys = Object.keys(participantInfo);
    const opponent = keys.find(k => k !== myuid)

    const location = useLocation();

    const { id } = location.state || {};

    useEffect(() => {
        if (id === refId) {
            setCurrentChatInfo({
                currentChatType: type,
                currentChatId: roomId,
                currentChatOpponent: participantInfo[opponent],
                currentChatOpponentId: opponent,
                currentChatStatus: status,
                currentChatI: participantInfo[myuid],
                currentParticipants: participants,
                currentUnreadCount: unreadCount,
                currentRefId: refId,
            })
        }
    }, [])

    return (
        <div className='c-chatroom-ct' onClick={() => setCurrentChatInfo({
            currentChatType: type,
            currentChatId: roomId,
            currentChatOpponent: participantInfo[opponent],
            currentChatOpponentId: opponent,
            currentChatStatus: status,
            currentChatI: participantInfo[myuid],
            currentParticipants: participants,
            currentUnreadCount: unreadCount,
            currentRefId: refId,

        })}>

            {!!unreadCount[myuid] && (<div className='c-chatroom-unread'>{unreadCount[myuid]}</div>)}
            <p className='c-chatroom-name'>{participantInfo[opponent].nickname}</p>
            <p className='c-chatroom-content'>{lastMessage || '대화가 없습니다.'}</p>
            <p className='c-chatroom-date'>{lastMessageAt
                ? lastMessageAt.toDate().toLocaleString()
                : (createdAt ? createdAt.toDate().toLocaleString() : '날짜 정보 없음')}</p>
        </div>
    )
}

export default ChatRoom
