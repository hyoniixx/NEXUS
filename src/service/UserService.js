// {
//         userName: "",
//         email: "",
//         birthDate: "",
//         profileImage: null,
//         role: "",
//         isBlacklist: false,
//         csScore: 10,
//         csScoreMax: 10,
//         csGrade: 1,
//         lectures: [],
//         wish: [],
//         createAt: ""
//     }
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";


const COLLECTION_NAME = 'users';

export const createUser = async (newUserInfo) => {
    try {
        await setDoc(doc(db, COLLECTION_NAME, newUserInfo.uid), {
            ...newUserInfo.userInfo,
            isBlacklist: false,
            csScore: 10,
            csScoreMax: 10,
            csGrade: 1,
            lectures: [],
            wish: [],
            createAt: serverTimestamp(),
        })
        console.log('유저 생성 성공')
    } catch (error) {
        console.log('유저 생성 실패', error);
        throw error;
    }
}

export const getUser = async () => {
    const docSnapShot = await getDoc(doc(db, COLLECTION_NAME, auth.currentUser.uid))
    console.log('!!!!!!!!!', auth.currentUser.uid);
    console.log('????????????', docSnapShot.data());
    return docSnapShot.data();
}


