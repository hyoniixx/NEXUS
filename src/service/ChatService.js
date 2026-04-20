
import { db } from '../firebase/config.js'
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'chats';

export const createChat = async (chatData) => {
    try {
        const chatRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...chatData,
            createdAt: serverTimestamp(),
            lastMessage: null,
            lastMessageAt: null,
        })
        console.log('채팅 생성되었습니다. ID:', chatRef.id)

        return chatRef.id
    } catch (e) {
        console.log(e)
        throw e
    }
}


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


export const deleteChat = async (roomId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, roomId))
        console.log('채팅이 삭제되었습니다.')
    } catch (error) {
        console.log(error)
    }
}

