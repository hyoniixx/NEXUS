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
    const [currentChatId, setCurrentChatId] = useState('')

    const { userData } = useContext(userContext);

    const myuid = userData.uid || '';

    const { setCurrentChatInfo } = useContext(chatContext);


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

        //채팅 상태 바뀔 때도 정보를 가져옴
        const unsub = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map((doc) => {
                if (doc.id === currentChatId) {
                    const keys = Object.keys(doc.data().participantInfo);
                    const opponent = keys.find(k => k !== myuid)

                    setCurrentChatInfo({
                        currentChatType: doc.data().type,
                        currentChatId: doc.id,
                        currentChatOpponent: doc.data().participantInfo[opponent],
                        currentChatOpponentId: opponent,
                        currentChatStatus: doc.data().status,
                        currentChatI: doc.data().participantInfo[myuid],
                        currentParticipants: doc.data().participants,
                        currentUnreadCount: doc.data().unreadCount,
                        currentRefId: doc.data().refId,
                        currentEnrollmentId: doc.data().enrollmentId
                    })
                }

                return {
                    roomId: doc.id,
                    ...doc.data()
                }
            });

            setChats(chatData)
        })


        return () => unsub();
    }, [chatCategory, currentChatId])



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
                {chats.map((chat) => {
                    return <ChatRoom key={chat.roomId} chat={chat} setCurrentChatId={setCurrentChatId} />
                })}
            </article>
        </section>
    )
}

export default ChatList