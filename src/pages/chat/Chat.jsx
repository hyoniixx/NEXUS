import Chating from './Chating';
import ChatList from './ChatList';
import './Chat.css'
import { createContext, useState } from "react"
import leftArrow from '../../assets/leftArrow.svg';

export const chatContext = createContext();

function Chat() {
    const [currentChatInfo, setCurrentChatInfo] = useState({
        currentChatType: '',
        currentChatId: '',
        currentChatOpponent: '',
        currentChatOpponentId: '',
        currentChatStatus: '',
        currentChatI: '',
        currentParticipants: [],
        currentUnreadCount: {}
    });

    // 나중에 전역 콘텍스트로 받아올 사용자 자신의 uid
    const myuid = 'asdf';

    return (
        <div className='c-chat'>
            <main className='c-chat-main'>
                <button className='c-chat-back-btn'><img src={leftArrow} />뒤로 가기</button>
                <section className='c-chat-chatsection'>
                    <chatContext.Provider value={{ currentChatInfo, setCurrentChatInfo }}>
                        <ChatList />
                        <Chating />
                    </chatContext.Provider>
                </section>
            </main>

        </div>
    )
}

export default Chat
