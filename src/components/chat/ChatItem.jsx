import React, { useContext, useEffect } from 'react'
import './ChatItem.css';
import { userContext } from '../../App';
// import { updateChat } from '../../service/ChatService';
// import { chatContext } from '../../pages/chat/Chat';
//말풍선
function ChatItem({
    roomId,
    fromMemberId,
    content,
    createdAt,
    isRead
}) {
    // const { currentChatInfo } = useContext(chatContext);

    const { userData } = useContext(userContext);
    const myuid = userData.uid;

    return (
        <div className={fromMemberId === 'admin' ? 'c-chat-admin' : (fromMemberId === myuid ? 'c-chat-blue' : 'c-chat-black')}>
            <p className='c-chat-text'>{content}</p>
            {fromMemberId !== 'admin' && <p className='c-chat-date'>{createdAt?.toDate().toLocaleString().substr(5, 17) || 0}</p>}
        </div>
    )
}

export default ChatItem
