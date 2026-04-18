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
import { getDoc, doc, setDoc, query, collection, getDocs, where, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config.js";

const COLLECTION_NAME = 'users';

/**
 * 전체 회원 목록 조회하는 함수
 * @returns {Array} 조회된 회원 배열 (각 회원 객체에 ID 포함)
 */

export const getUserList = async () => {
    try {// const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        //쿼리 생성
        const q = query(
            collection(db, COLLECTION_NAME),
            where('role', '!=', 'admin')
        )
        // 쿼리조회
        const querySnapshot = await getDocs(q);

        // 조회 결과 가공
        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        return posts;

    } catch (error) {
        // console.log('회원 목록 조회 오류');
        throw error;
    }
}

/**
 * 특정 회원의 블랙리스트 여부를 관리하는 함수
 * @param {string} userId - 블랙리스트 여부 변경할 회원의 고유 ID
 * @param {boolean} want - 블랙리스트를 어떤 상태로 변경할 것인지
 */
export const toggleBlackList = async (userId, want) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, userId);
        await updateDoc(docRef, {
            isBlacklist: want
        });
        console.log('블랙리스트 변경 완료');
    } catch (error) {
        console.log('블랙리스트 변경 오류');
        throw error;
    }
}


// console.log(db)