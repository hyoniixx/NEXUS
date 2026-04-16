import React, { useContext, useEffect } from 'react'
import './ChatItem.css';
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

    const myuid = 'asdf';

    // useEffect(() => {
    //     //현재 보고 있는 채팅 읽음 처리
    //     if (currentChatInfo.currentChatId) {
    //         updateChat(currentChatInfo.currentChatId, {
    //             [`unreadCount.${myuid}`]: 0
    //         })
    //     }
    // })

    return (
        <div className={fromMemberId === 'admin' ? 'c-chat-admin' : (fromMemberId === myuid ? 'c-chat-blue' : 'c-chat-black')}>
            <p className='c-chat-text'>{content}</p>
            {fromMemberId !== 'admin' && <p className='c-chat-date'>{createdAt?.toDate().toLocaleString().substr(5, 17) || 0}</p>}
        </div>
    )
}

export default ChatItem
