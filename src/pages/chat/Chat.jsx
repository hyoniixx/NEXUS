import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';
import Chating from './Chating';
import ChatList from './ChatList';
import './Chat.css'


function Chat() {

    const handleConfirm = () => {
        console.log("확인");
    };

    const { openModal, closeModal, activeModal, isModal } = useModal(handleConfirm);

    return (
        <div className='c-chat'>
            <main className='c-chat-main'>
                <button><img />뒤로 가기</button>
                <section className='c-chat-chatsection'>
                    <ChatList />
                    <Chating />
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
