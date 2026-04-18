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
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
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
            gachaTicketCount: 1
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

export const getUserEmail = async (email) => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('email', '==', email)
    )
    const docSnapShot = await getDocs(q);

    console.log(docSnapShot.docs);
    if (docSnapShot.docs.length !== 0) {
        return '이미 사용중인 이메일입니다.'
    }

    return '사용 가능한 이메일입니다.';
}
