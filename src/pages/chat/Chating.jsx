import './Chating.css'
import sendBtn from '../../assets/chatSendBtn.svg'
import ChatItem from '../../components/chat/ChatItem'
import { useContext, useEffect, useRef, useState } from 'react'
import { chatContext } from './Chat'
import { collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { createMessage } from '../../service/MessageService'
import ChatButton from '../../components/chat/ChatButton'
import { updateChat } from '../../service/ChatService'
import { userContext } from '../../App'

function Chating() {
    const { userData } = useContext(userContext);

    const myuid = userData.uid;

    const { currentChatInfo } = useContext(chatContext);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const messageRef = useRef();
    const chatContainer = useRef();

    const scrollToTop = () => {
        const { scrollHeight, clientHeight } = chatContainer.current;
        chatContainer.current.scrollTo({
            top: scrollHeight - clientHeight,
            behavior: 'auto'
        })
    }

    useEffect(() => {
        //현재 보고 있는 채팅 읽음 처리
        scrollToTop()
        if (currentChatInfo.currentChatId) {
            updateChat(currentChatInfo.currentChatId, {
                [`unreadCount.${myuid}`]: 0
            })
        }
    }, [messages])

    //전체 메시지 중 roomId가 일치하는 메시지만 받아오는 함수
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
        })

        //확인한 채팅 읽음 처리
        if (currentChatInfo.currentChatId) {
            updateChat(currentChatInfo.currentChatId, {
                [`unreadCount.${myuid}`]: 0
            })
        }

        return () => unsub();
    }, [currentChatInfo.currentChatId]);



    //메시지 보내는 함수
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
                fromMemberName: currentChatInfo.currentChatI.nickname,
                content: newMessage
            })

            updateChat(currentChatInfo.currentChatId, {
                lastMessage: newMessage,
                lastMessageAt: serverTimestamp(),
                [`unreadCount.${currentChatInfo.currentChatOpponentId}`]: currentChatInfo.currentUnreadCount[currentChatInfo.currentChatOpponentId] + 1
            })
            setNewMessage('');
            messageRef.current.value = "";
        } catch (error) {
            console.log('메시지 전송 실패')
            console.log(error)
        } finally {
            setLoading(false);
        }
    }



    return (
        <section className='c-chat-chating-ct'>
            <article className='c-chat-chating-top'>
                <h2>{currentChatInfo.currentChatOpponent.nickname}</h2>
                <ChatButton />
            </article>
            <article className='c-chat-chatItem-ct' ref={chatContainer}>
                {messages.map((message) => {
                    return <ChatItem key={message.messageId}{...message} />
                })}
            </article>
            <article className='c-chat-chating-bottom'>
                {/* <input
                    placeholder='메세지를 입력하세요.'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} /> */}
                <input
                    placeholder='메세지를 입력하세요.'
                    ref={messageRef}
                    onBlur={(e) => setNewMessage(messageRef.current.value)} />
                <button onClick={handleCreateChat}><img src={sendBtn} /></button>
            </article>
        </section >
    )
}

export default Chating