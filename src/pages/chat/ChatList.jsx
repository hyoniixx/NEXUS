import { useContext, useEffect, useState } from "react"
import ChatRoom from "../../components/chat/ChatRoom"
import './ChatList.css'
import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { userContext } from "../../App";
import { chatContext } from "./Chat";


function ChatList() {
    const [chats, setChats] = useState([]);
    const [chatCategory, setChatCategory] = useState('all');

    const { userData } = useContext(userContext);

    const myuid = userData.uid || '';

    const { setCurrentChatInfo } = useContext(chatContext);

    useEffect(() => {
        setCurrentChatInfo({
            currentChatType: chats[0]?.type || '',
            currentChatId: chats[0]?.roomId || '',
            currentChatOpponent: chats[0]?.participantInfo[opponent] || '',
            currentChatOpponentId: chats[0]?.opponent || '',
            currentChatStatus: chats[0]?.status || '',
            currentChatI: chats[0]?.participantInfo[myuid] || '',
            currentParticipants: chats[0]?.participants || [],
            currentUnreadCount: chats[0]?.unreadCount || {},
            currentRefId: chats[0]?.refId || {},
        })
    }, [])

    useEffect(() => {
        let q;

        if (chatCategory === 'all') {
            q = query(
                collection(db, "chats"),
                where("participants", "array-contains", myuid),
                orderBy("createdAt", "desc")
            );
        } else {
            q = query(
                collection(db, "chats"),
                where("participants", "array-contains", myuid),
                where("type", "==", chatCategory),
                orderBy("createdAt", "desc")
            );
        }


        const unsub = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map((doc) => ({
                roomId: doc.id,
                ...doc.data()
            }));

            setChats(chatData)
        })

        return () => unsub();
    }, [chatCategory])

    return (
        <section className='c-chat-list-ct'>
            <article className="c-chat-room-top">
                <h3>채팅</h3>
                <select onChange={(e) => setChatCategory(e.target.value)} value={chatCategory}>
                    <option value='all'>전체</option>
                    <option value='duo'>듀오</option>
                    <option value='lecture'>강의</option>
                </select>
            </article>
            <article className="c-chat-room-ct">
                {chats.map((chat) => <ChatRoom key={chat.roomId}{...chat} />)}
            </article>
        </section>
    )
}

export default ChatList