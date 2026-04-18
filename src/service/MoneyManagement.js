/*
[관리자] 전체 결제 내역 조회 getDocs
[관리자] 결제 상태 변경updateDoc
[수강생] 결제 내역 추가addDoc (수강생이 강의 신청할때 이용할수 있게끔 연결)
[강사]  강사 자신의 수익 조회 getDocs, where

DB[{
    id : 1,
    completed : 정산 여부 true|false
    price : 10000,
    student : 돈을 보낸 회원의 이름,
    studentEmail : 돈을 보낸 회원의 email,
    instructor : 돈을 받을 회원,
    instructorEmail : 돈을 받을 회원의 email,
    title : 어떤 강의에 대한 돈인지,
    createdAt : 입금 일시,
    completedAt : 정산 되었다면 정산 일시
},
...
]
*/

import { db } from "../firebase/config.js";
import { doc, getDocs, addDoc, where, updateDoc, query, collection, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'money';

/**
 * 전체 돈 관련 내역 불러오는 함수
 * @returns {Array} 조회된 배열 (각 게시글 객체에 ID 포함)
 */
export const getMoneyList = async () => {
    try {// const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        //쿼리 생성
        const q = query(
            collection(db, COLLECTION_NAME)
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
        throw error;
    }
}

/**
 * 특정 강사의 돈 관련 내역 불러오는 함수
 * @param {string} uid - 조회할 강사의 uid
 * @returns {Array} 조회된 배열 (각 게시글 객체에 ID 포함)
 */
export const getMyMoneyList = async (uid) => {
    try {// const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        //쿼리 생성
        const q = query(
            collection(db, COLLECTION_NAME),
            where('instructor', '==', uid)
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
        throw error;
    }
}

/**
 * 신규 결제 내역을 생성(회원이 강의를 신청할때 생성)
 * @param {Object} postData - 등록할 결제 데이터
    {price : 가격,
    student : 돈을 보낸 회원,
    studentEmail : 돈을 보낸 회원의 이메일,
    instructor : 돈을 받을 회원,
    instructorEmail : 돈을 받을 회원의 이메일,
    title : 어떤 강의에 대한 돈인지,
    createdAt : 입금 일시}
 * @returns {string} 생성된 게시글 고유 ID
 */
export const createMoney = async (postData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...postData,
            // createdAt: serverTimestamp(),
            completedAt: null,
            completed: false
        })
        // console.log('게시글이 생성되었습니다. ID:', docRef.id)
        return docRef.id
    } catch (error) {
        // console.log('결제 오류');
        throw error;
    }
}

/**
 * 특정 결제 내역 정산하는 함수
 * @param {string} id - 정산할 결제 내역 고유 ID
 */
export const payComplete = async (postId) => {
    try {
        await updateDoc(doc(db, COLLECTION_NAME, postId), {
            completed: true,
            completedAt: serverTimestamp()
        })
        console.log('정산이 완료되었습니다.')
    } catch (error) {
        console.log('정산 오류');
        throw error;
    }
}