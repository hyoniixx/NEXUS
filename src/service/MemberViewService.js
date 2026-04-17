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
import { getDoc, doc, setDoc, query, collection, getDocs, where } from "firebase/firestore"
import { auth, db } from "../firebase/config.js";

const COLLECTION_NAME = 'users';

/**
 * 전체 회원 목록 조회하는 함수
 * @returns {Array} 조회된 게시글 배열 (각 게시글 객체에 ID 포함)
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
        console.log('회원 목록 조회 오류');
        throw error;
    }
}


// console.log(db)