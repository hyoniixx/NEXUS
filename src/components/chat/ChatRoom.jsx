import React from 'react'
import './ChatRoom.css'
//채팅방 왼쪽에있는 방 하나하나
function ChatRoom() {
    return (
        <div className='c-chatroom-ct'>
            <div className='c-chatroom-unread'>2</div>
            <p className='c-chatroom-name'>사람 이름</p>
            <p className='c-chatroom-content'>내용</p>
            <p className='c-chatroom-date'>날짜</p>
        </div>
    )
}

export default ChatRoom
