import React from 'react'
import './ChatItem.css';
//말풍선
function ChatItem({
    roomId,
    fromMemberId,
    content,
    createdAt,
    isRead
}) {

    const myuid = 'asdf';
    return (
        <div className={fromMemberId === 'admin' ? 'c-chat-admin' : (fromMemberId === myuid ? 'c-chat-blue' : 'c-chat-black')}>
            <p className='c-chat-text'>{content}</p>
            {fromMemberId !== 'admin' && <p className='c-chat-date'>{createdAt?.toDate().toLocaleString().substr(5, 17) || 0}</p>}
        </div>
    )
}

export default ChatItem
