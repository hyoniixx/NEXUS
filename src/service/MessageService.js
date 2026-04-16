// {
//     "type": "duo | lecture",
//         "roomId": 2,
//             "fromMemberId": 4,
//                 "fromMemberName": "tester2",
//                     "content": "ㄴㄴㄴㄴ",
//                         "createdAt": "2024-11-20T15:28:12.411",
//                             "isRead": false
// }


import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config.js";

const COLLECTION_NAME = 'messages';

export const createMessage = async (newMessage) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...newMessage,
            createdAt: serverTimestamp(),
            isRead: false
        })
        console.log('성공');
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteMessage = async (roomId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, roomId))
    } catch (error) {
        console.log(error);
    }
}



