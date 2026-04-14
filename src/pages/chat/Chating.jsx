import './Chating.css'
import sendBtn from '../../assets/chatSendBtn.svg'
import ChatItem from '../../components/chat/ChatItem'
import { useContext, useEffect, useState } from 'react'
import { chatContext } from './Chat'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { type } from 'firebase/firestore/pipelines'
import { createMessage } from '../../service/MessageService'

function Chating() {
    const myuid = 'awds';

    const { currentChatInfo } = useContext(chatContext);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            where('roomId', '==', currentChatInfo.currentChatId),
            orderBy("createdAt")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const MessageData = snapshot.docs.map((doc) => ({
                messageId: doc.id,
                ...doc.data()
            }));
            setMessages(MessageData);
            console.log(messages)
        })

        return () => unsub();
    }, [currentChatInfo.currentChatId]);


    const handleCreateChat = async () => {
        if (!newMessage.trim()) {
            return;
        }

        try {
            setLoading(true);
            await createMessage({
                type: currentChatInfo.currentChatType,
                roomId: currentChatInfo.currentChatId,
                fromMemberId: myuid,
                fromMemberName: currentChatInfo.currentChatI,
                content: newMessage
            })
        } catch (error) {
            console.log('메시지 전송 실패')
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='c-chat-chating-ct'>
            <article className='c-chat-chating-top'>
                <h2>{currentChatInfo.currentChatOpponent}</h2><button>{currentChatInfo.currentChatStatus}</button>
            </article>
            <article className='c-chat-chatItem-ct'>
                {messages.map((message) => {
                    return <ChatItem key={message.messageId}{...message} />
                })}
            </article>
            <article className='c-chat-chating-bottom'>
                <input placeholder='메세지를 입력하세요.' value={newMessage.content} onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={handleCreateChat}><img src={sendBtn} /></button>
            </article>
        </section >
    )
}

export default Chating