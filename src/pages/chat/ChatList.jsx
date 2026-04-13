import ChatRoom from "../../components/chat/ChatRoom"
import './ChatList.css'

function ChatList() {
    return (
        <section className='c-chat-list-ct'>
            <article className="c-chat-room-top">
                <h3>채팅</h3>
                <select>
                    <option>전체</option>
                    <option>듀오</option>
                    <option>강의</option>
                </select>
            </article>
            <article className="c-chat-room-ct">
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
            </article>
        </section>
    )
}

export default ChatList