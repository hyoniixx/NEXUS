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
    } catch (error) {
        throw error;
    }
}

export const getUser = async (uid = auth.currentUser.uid) => {
    const docSnapShot = await getDoc(doc(db, COLLECTION_NAME, uid))
    console.log('!!!!!!!!!', uid);
    console.log('????????????', docSnapShot.data());
    return docSnapShot.data();
}


