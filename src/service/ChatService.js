// [
// {
//     "type": "duo",
//         "refId": 0, //강의 또는 듀오의 고유 ID값
//             "roomId": 4,
//                 "participants": [
//                     "awds",
//                     "fdsa"
//                 ],
//                     "participantInfo": {
//         "awds": {
//             "nickname": "김프로",
//                 "role": "host"
//         },
//         "fdsa": {
//             "nickname": "박프로",
//                 "role": "host"
//         }
//     },
//     "createdAt": serverTimestamp(),
//         "lastMessage": null,
//             "lastMessageAt": null,
//                 "status": "중",
//                     "unreadCount": {
//         "awds": 2,
//             "fdsa": 0
//     }
// }
// ]


// {
//     type: "duo",
//         refId: 1, //강의 또는 듀오의 고유 ID값
//             participants: [
//                 'awds,
//                 "fdsa"
//             ],
//                 participantInfo: {
//         awds: {
//             nickname: "김프로",
//                 role: "guest"
//         },
//         fdsa: {
//             nickname: "박프로",
//                 role: "host"
//         }
//     },
//     createdAt: serverTimestamp(),
//         lastMessage: null,
//             lastMessageAt: null,
//                 status: "전",
//                     unreadCount: {
//         awds: 2,
//             fdsa: 0
//     }
// },
// {
//     type: "lecture",
//         refId: 6, //강의 또는 듀오의 고유 ID값
//             participants: [
//                 'asdf',
//                 'fdsa'
//             ],
//                 participantInfo: {
//         asdf: {
//             nickname: "정프로",
//                 role: "student"
//         },
//         fdsa: {
//             nickname: "박프로",
//                 role: "intructor"
//         }
//     },
//     createdAt: serverTimestamp(),
//         lastMessage: null,
//             lastMessageAt: null,
//                 status: "중",
//                     unreadCount: {
//         asdf: 1,
//             fdsa: 0
//     }
// },
// {
//     type: "lecture",
//         refId: 8, //강의 또는 듀오의 고유 ID값
//             participants: [
//                 'asdf',
//                 'awds'
//             ],
//                 participantInfo: {
//         asdf: {
//             nickname: "정프로",
//                 role: "student"
//         },
//         awds: {
//             nickname: "김프로",
//                 role: "intructor"
//         }
//     },
//     createdAt: serverTimestamp(),
//         lastMessage: null,
//             lastMessageAt: null,
//                 status: "전",
//                     unreadCount: {
//         asdf: 1,
//             awds: 2
//     }
// }



import { db } from '../firebase/config.js'
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

const COLLECTION_NAME = 'chats';

const createChat = async () => {
    try {
        const chatRef = await addDoc(collection(db, COLLECTION_NAME), {
            "type": "duo",
            "refId": 0, //강의 또는 듀오의 고유 ID값
            "roomId": 4,
            "participants": [
                "awds",
                "fdsa"
            ],
            "participantInfo": {
                "awds": {
                    "nickname": "김프로",
                    "role": "host"
                },
                "fdsa": {
                    "nickname": "박프로",
                    "role": "host"
                }
            },
            "createdAt": serverTimestamp(),
            "lastMessage": null,
            "lastMessageAt": null,
            "status": "중",
            "unreadCount": {
                "awds": 2,
                "fdsa": 0
            }
        })
        console.log('채팅 생성되었습니다. ID:', chatRef.id)

        return chatRef.id
    } catch (e) {
        console.log(e)
        throw e
    }
}


const deletePost = async (roomId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, roomId))
        console.log('채팅이 삭제되었습니다.')
    } catch (error) {
        console.log(e)
    }
}

await createChat();