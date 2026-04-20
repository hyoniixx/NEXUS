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
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";


const COLLECTION_NAME = 'users';

export const createUser = async (newUserInfo) => {
    try {
        const createData = {
            ...newUserInfo.userInfo,
            isBlacklist: false,
            csScore: 10,
            csScoreMax: 10,
            csGrade: 1,
            lectures: [],
            wish: [],
            createAt: serverTimestamp(),
            gachaTicketCount: 1
        }

        if (newUserInfo.userInfo.role === 'instructor') {
            createData.isApproval = false;
        }

        await setDoc(doc(db, COLLECTION_NAME, newUserInfo.uid), {
            ...createData
        })
    } catch (error) {
        throw error;
    }
}


export const updateUser = async (uid, updateData) => {
    try {
        const userRef = doc(db, COLLECTION_NAME, uid);
        await updateDoc(userRef, updateData);

        return true;
    } catch (error) {
        console.error("사용자 정보 수정 실패:", error);
        throw error;
        return false;
    }
};

export const getUser = async (uid = auth.currentUser.uid) => {
    const docSnapShot = await getDoc(doc(db, COLLECTION_NAME, uid))
    const userData = {
        uid: uid,
        ...docSnapShot.data()
    }
    return userData;
}

export const getUserEmail = async (email) => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where('email', '==', email)
    )
    const docSnapShot = await getDocs(q);

    if (docSnapShot.docs.length !== 0) {
        return 'error'
    }

    return 'sucess';
}

export const getUserEmailLecture = async (email) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('email', '==', email)
        )
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return [];
        }

        const data = querySnapshot.docs.map(doc => ({
            ...doc.data()
        }));

        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }

}


