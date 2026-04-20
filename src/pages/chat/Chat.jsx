import Chating from './Chating';
import ChatList from './ChatList';
import './Chat.css'
import { createContext, useContext, useState } from "react"
import leftArrow from '../../assets/leftArrow.svg';
import { userContext } from '../../App';

export const chatContext = createContext();

function Chat() {
    const { userData } = useContext(userContext);

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

    const myuid = userData.uid;

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
