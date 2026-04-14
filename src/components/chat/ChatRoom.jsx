import React, { useContext } from 'react'
import './ChatRoom.css'
import { chatContext } from '../../pages/chat/Chat';
//채팅방 왼쪽에있는 방 하나하나
function ChatRoom({ type, roomId, participantInfo, lastMessage, lastMessageAt, unreadCount, opponent, createdAt, status }) {
    const { setCurrentChatInfo } = useContext(chatContext);
    const opponentInfo = opponent[0];

    const myuid = 'awds';

    return (
        <div className='c-chatroom-ct' onClick={() => setCurrentChatInfo({
            currentChatType: type,
            currentChatId: roomId,
            currentChatOpponent: participantInfo[opponentInfo].nickname,
            currentChatStatus: status,
            currentChatI: participantInfo[myuid].nickname
        })}>
            <div className='c-chatroom-unread'>{unreadCount[myuid]}</div>
            <p className='c-chatroom-name'>{participantInfo[opponentInfo].nickname}</p>
            <p className='c-chatroom-content'>{lastMessage || '대화가 없습니다.'}</p>
            <p className='c-chatroom-date'>{lastMessageAt || createdAt.toDate().toLocaleString()}</p>
        </div>
    )
}

export default ChatRoom
