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
//                 status: {
// awds: '중',
//             fdsa: '후'},
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
//                 role: "instructor"
//         }
//     },
//     createdAt: serverTimestamp(),
//         lastMessage: null,
//             lastMessageAt: null,
//                 status: {
//         asdf: '후',
//             fdsa: '중'
//     },
//     unreadCount: {
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
//                 role: "instructor"
//         }
//     },
//     createdAt: serverTimestamp(),
//         lastMessage: null,
//             lastMessageAt: null,
//                 status: {
//         asdf: '중',
//             awds: '후'
//     },
//     unreadCount: {
//         asdf: 1,
//             awds: 2
//     }
// }



import { db } from '../firebase/config.js'
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'chats';

const createChat = async () => {
    try {
        const chatRef = await addDoc(collection(db, COLLECTION_NAME), {
            type: "duo",
            refId: 6, //강의 또는 듀오의 고유 ID값
            participants: [
                'asdf',
                'fdsa'
            ],
            participantInfo: {
                asdf: {
                    nickname: "정프로",
                    role: "host"
                },
                fdsa: {
                    nickname: "박프로",
                    role: "guest"
                }
            },
            createdAt: serverTimestamp(),
            lastMessage: '듀오 호스트 승인 전',
            lastMessageAt: null,
            status: {
                asdf: '전',
                fdsa: '전'
            },
            unreadCount: {
                asdf: 1,
                fdsa: 0
            }
        })
        console.log('채팅 생성되었습니다. ID:', chatRef.id)

        return chatRef.id
    } catch (e) {
        console.log(e)
        throw e
    }
}

// await createChat();

export const updateChat = async (roomId, updateData) => {
    try {
        await updateDoc(doc(db, COLLECTION_NAME, roomId), {
            ...updateData
        })

    } catch (error) {
        console.log('업데이트 실패')
        throw error;
    }
}


// const deleteChat = async (roomId) => {
//     try {
//         await deleteDoc(doc(db, COLLECTION_NAME, roomId))
//         console.log('채팅이 삭제되었습니다.')
//     } catch (error) {
//         console.log(e)
//     }
// }

