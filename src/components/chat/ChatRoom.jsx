import React, { useContext, useEffect } from 'react'
import './ChatRoom.css'
import { chatContext } from '../../pages/chat/Chat';
import { userContext } from '../../App';
import { useLocation } from 'react-router-dom';
//채팅방 왼쪽에있는 방 하나하나
function ChatRoom({ chat, setCurrentChatId }) {
    // { type, roomId, refId, participantInfo, lastMessage, lastMessageAt, unreadCount, createdAt, status, participants, enrollmentId }
    const { userData } = useContext(userContext);
    const myuid = userData.uid;
    const keys = Object.keys(chat.participantInfo);
    const opponent = keys.find(k => k !== myuid)

    const location = useLocation();

    const { id, studentId = '' } = location.state || {};

    useEffect(() => {
        if ((studentId === opponent || !studentId) && id === chat.refId) {
            setCurrentChatId(chat.roomId);
        }
    }, [])

    return (
        <div className='c-chatroom-ct' onClick={() => {
            setCurrentChatId(chat.roomId);
        }}>
            {!!chat.unreadCount[myuid] && (<div className='c-chatroom-unread'>{chat.unreadCount[myuid]}</div>)}
            <p className='c-chatroom-name'>{chat.participantInfo[opponent].nickname}</p>
            <p className='c-chatroom-content'>{chat.lastMessage || '대화가 없습니다.'}</p>
            <p className='c-chatroom-date'>{chat.lastMessageAt
                ? chat.lastMessageAt.toDate().toLocaleString()
                : (chat.createdAt ? chat.createdAt.toDate().toLocaleString() : '날짜 정보 없음')}</p>
        </div>
    )
}

export default ChatRoom
