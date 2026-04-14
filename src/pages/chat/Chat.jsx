import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';
import Chating from './Chating';
import ChatList from './ChatList';
import './Chat.css'
import { createContext, useEffect, useState } from "react"

export const chatContext = createContext();

function Chat() {

    const handleConfirm = () => {
        console.log("확인");
    };

    const { openModal, closeModal, activeModal, isModal } = useModal(handleConfirm);

    const [currentChatInfo, setCurrentChatInfo] = useState({
        currentChatType: '',
        currentChatId: '',
        currentChatOpponent: '',
        currentChatStatus: '',
        currentChatI: ''
    });



    // 나중에 전역 콘텍스트로 받아올 사용자 자신의 uid
    const myuid = 'awds';
    console.log(currentChatInfo)
    return (
        <div className='c-chat'>
            <main className='c-chat-main'>
                <button><img />뒤로 가기</button>
                <section className='c-chat-chatsection'>
                    <chatContext.Provider value={{ currentChatInfo, setCurrentChatInfo }}>
                        <ChatList />
                        <Chating />
                    </chatContext.Provider>
                </section>
            </main>
            <Modal
                isModal={isModal}
                closeModal={closeModal}
                activeModal={activeModal}
                title='듀오 거절'
                content={`안녕하세요\n안녕히계세요`}
                type='one'
            />
        </div>
    )
}

export default Chat
