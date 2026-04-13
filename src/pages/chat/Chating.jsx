import './Chating.css'
import sendBtn from '../../assets/chatSendBtn.svg'
import ChatItem from '../../components/chat/ChatItem'

function Chating() {
    return (
        <section className='c-chat-chating-ct'>
            <article className='c-chat-chating-top'>
                <h2>채팅 이름</h2><button>듀오 취소</button>
            </article>
            <article className='c-chat-chatItem-ct'>
                <ChatItem user='i' />
                <ChatItem user='you' />
                <ChatItem user='i' />
            </article>
            <article className='c-chat-chating-bottom'>
                <input placeholder='메세지를 입력하세요.' />
                <button><img src={sendBtn} /></button>
            </article>
        </section >
    )
}

export default Chating