/*
[공통] 특정 강의 리뷰 전체 조회 - getReviews
[공통] 리뷰 작성 - createReview
[공통] 리뷰 조회/수정 시도 - tryEditReview
[강사] 내 강의 리뷰 전체 조회 - getMyReviewsInstructor
[수강생] 내가 작성한 리뷰 조회 - getMyReviewsStudent

DB[{
    lectureId: 3,
    title: "미드 야스오 완전정복",
    instructor: "페이커",
    instructorId: "faker@nexus.com",
    reviews: [
        {
            reviewId: 1,
            uid: 1,
            userName: "김수강",
            profileImage: null,
            star: 4,
            content: "그럭저럭 좋은 강의였습니다.",
            createdAt: "2025-04-01T12:00:00"
        },
        ...
    ],
    star: { "1": 0, "2": 3, "3": 10, "4": 9, "5": 14, average: 4.4 },
    total: 127
}]
*/

import { db } from "../firebase/config.js";
import { doc, getDocs, updateDoc, where, query, collection, serverTimestamp, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'reviews';

/**
 * 특정 강의의 모든 리뷰 정보를 불러오는 함수
 * @param {string} lectureId - 조회할 강의의 고유 ID
 * @returns {Object|null} 해당 강의의 리뷰 문서 전체 (없으면 null)
 */
export const getReviews = async (lectureId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('lectureId', '==', lectureId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() };

    } catch (error) {
        console.log('리뷰 조회 오류');
        throw error;
    }
}

/**
 * 특정 강의에 리뷰를 작성하는 함수
 * reviews 배열에 새 리뷰를 추가하고, star 카운트와 average, total을 갱신함
 * @param {number} lectureId - 리뷰를 작성할 강의 ID
 * @param {Object} reviewData - 작성할 리뷰 데이터
 * @param {number} reviewData.reviewId - 리뷰 고유 ID
 * @param {number} reviewData.uid - 작성자 uid
 * @param {string} reviewData.userName - 작성자 이름
 * @param {string|null} reviewData.profileImage - 작성자 프로필 이미지
 * @param {number} reviewData.star - 별점 (1~5)
 * @param {string} reviewData.content - 리뷰 내용
 */
export const createReview = async (lectureId, reviewData) => {
    try {
        const lectureDoc = await getReviews(lectureId);
        if (!lectureDoc) throw new Error('해당 강의 리뷰 문서가 없습니다.');

        const docRef = doc(db, COLLECTION_NAME, lectureDoc.id);

        // 새 리뷰 객체 생성 (createdAt은 여기서 자동 생성)
        const newReview = {
            ...reviewData,
            createdAt: new Date().toISOString()
        };

        // 기존 reviews 배열에 추가
        const updatedReviews = [...lectureDoc.reviews, newReview];

        // star 카운트 갱신
        const updatedStar = { ...lectureDoc.star };
        updatedStar[String(reviewData.star)] = (updatedStar[String(reviewData.star)] || 0) + 1;

        // average 재계산
        const total = updatedReviews.length;
        const sum = updatedReviews.reduce((acc, r) => acc + r.star, 0);
        updatedStar.average = Math.round((sum / total) * 10) / 10;

        await updateDoc(docRef, {
            reviews: updatedReviews,
            star: updatedStar,
            total: total
        });

        console.log('리뷰 작성 완료');

    } catch (error) {
        console.log('리뷰 작성 오류');
        throw error;
    }
}

/**
 * 리뷰 조회 또는 수정 시도 함수
 * 전달받은 uid가 reviews 중 하나의 uid와 일치하면 "edit"과 해당 리뷰를 반환,
 * 일치하지 않으면 "view"와 전체 reviews 배열을 반환
 * @param {number} lectureId - 조회할 강의 ID
 * @param {number} reviewId - 조회할 리뷰 ID
 * @param {number} uid - 현재 로그인한 사용자의 uid (userContext에서 가져올 것)
 * @returns {{ mode: 'edit'|'view', review: Object|Array }} 모달에 전달할 타입과 리뷰 데이터
 */
export const tryEditReview = async (lectureId, reviewId, uid) => {
    try {
        const lectureDoc = await getReviews(lectureId);
        if (!lectureDoc) throw new Error('해당 강의 리뷰 문서가 없습니다.');

        // uid가 일치하는 리뷰 탐색
        const myReview = lectureDoc.reviews.find(r => r.reviewId === reviewId && r.uid === uid);

        if (myReview) {
            // 내 리뷰면 edit 모드로 반환
            return { mode: 'edit', review: myReview };
        } else {
            // 내 리뷰가 아니면 view 모드로 해당 reviewId 리뷰 반환
            const targetReview = lectureDoc.reviews.find(r => r.reviewId === reviewId);
            return { mode: 'view', review: targetReview };
        }

    } catch (error) {
        console.log('리뷰 조회/수정 시도 오류');
        throw error;
    }
}

/**
 * 특정 강사의 모든 강의에 대한 리뷰 정보를 배열로 반환하는 함수
 * @param {string} instructorId - 강사의 이메일(instructorId)
 * @returns {Array} 해당 강사의 모든 강의 리뷰 문서 배열
 */
export const getMyReviewsInstructor = async (instructorId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('instructorId', '==', instructorId)
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {
        console.log('강사 리뷰 조회 오류');
        throw error;
    }
}

/**
 * 특정 수강생이 작성한 모든 리뷰를 강의별로 묶어서 반환하는 함수
 * star, total 프로퍼티는 제외하고 반환
 * @param {string} userName - 조회할 수강생의 이름
 * @returns {Array} [{ lectureId, title, instructor, instructorId, reviews: [내가 쓴 것만] }, ...]
 */
export const getMyReviewsStudent = async (userName) => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

        const result = [];

        querySnapshot.docs.forEach(docSnap => {
            const data = docSnap.data();

            // 내가 쓴 리뷰만 필터링
            const myReviews = data.reviews.filter(r => r.userName === userName);

            if (myReviews.length > 0) {
                result.push({
                    lectureId: data.lectureId,
                    title: data.title,
                    instructor: data.instructor,
                    instructorId: data.instructorId,
                    reviews: myReviews
                });
            }
        });

        return result;

    } catch (error) {
        console.log('수강생 리뷰 조회 오류');
        throw error;
    }
}

/**
 * 리뷰를 수정하는 함수
 * reviews 배열에서 reviewId가 일치하는 항목을 찾아 star와 content를 수정하고
 * star 카운트와 average를 재계산함
 * @param {number} lectureId - 수정할 리뷰가 속한 강의 ID
 * @param {number} reviewId - 수정할 리뷰의 ID
 * @param {number} newStar - 변경할 별점
 * @param {string} newContent - 변경할 리뷰 내용
 */
export const updateReview = async (lectureId, reviewId, newStar, newContent) => {
    try {
        const lectureDoc = await getReviews(lectureId);
        if (!lectureDoc) throw new Error('해당 강의 리뷰 문서가 없습니다.');

        const docRef = doc(db, COLLECTION_NAME, lectureDoc.id);

        const updatedReviews = lectureDoc.reviews.map(r =>
            r.reviewId === reviewId ? { ...r, star: newStar, content: newContent } : r
        );

        // star 카운트 재계산
        const updatedStar = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        updatedReviews.forEach(r => {
            updatedStar[String(r.star)] += 1;
        });

        // average 재계산
        const sum = updatedReviews.reduce((acc, r) => acc + r.star, 0);
        updatedStar.average = Math.round((sum / updatedReviews.length) * 10) / 10;

        await updateDoc(docRef, {
            reviews: updatedReviews,
            star: updatedStar
        });

        console.log('리뷰 수정 완료');

    } catch (error) {
        console.log('리뷰 수정 오류');
        throw error;
    }
}

/**
 * 리뷰를 삭제하는 함수
 * reviews 배열에서 reviewId가 일치하는 항목을 제거하고
 * star 카운트와 average, total을 재계산함
 * @param {number} lectureId - 삭제할 리뷰가 속한 강의 ID
 * @param {number} reviewId - 삭제할 리뷰의 ID
 */
export const deleteReview = async (lectureId, reviewId) => {
    try {
        const lectureDoc = await getReviews(lectureId);
        if (!lectureDoc) throw new Error('해당 강의 리뷰 문서가 없습니다.');

        const docRef = doc(db, COLLECTION_NAME, lectureDoc.id);

        const updatedReviews = lectureDoc.reviews.filter(r => r.reviewId !== reviewId);

        // star 카운트 재계산
        const updatedStar = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        updatedReviews.forEach(r => {
            updatedStar[String(r.star)] += 1;
        });

        // average 재계산
        const sum = updatedReviews.reduce((acc, r) => acc + r.star, 0);
        updatedStar.average = updatedReviews.length > 0
            ? Math.round((sum / updatedReviews.length) * 10) / 10
            : 0;

        await updateDoc(docRef, {
            reviews: updatedReviews,
            star: updatedStar,
            total: updatedReviews.length
        });

        console.log('리뷰 삭제 완료');

    } catch (error) {
        console.log('리뷰 삭제 오류');
        throw error;
    }
}

/**
 * 강의 생성 시 해당 강의의 리뷰 문서를 초기화하는 함수
 * createLecture 호출 후 연달아 호출할 것
 * @param {string} lectureId - 생성된 강의의 고유 ID (createLecture의 반환값)
 * @param {string} title - 강의 제목
 * @param {string} instructor - 강사 이름
 * @param {string} instructorId - 강사 이메일
 */
export const createReviewField = async (lectureId, title, instructor, instructorId) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, lectureId);

        await setDoc(docRef, {
            lectureId: lectureId,
            title: title,
            instructor: instructor,
            instructorId: instructorId,
            reviews: [],
            star: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, average: 0 },
            total: 0
        });

        console.log('리뷰 필드 초기화 완료');
    } catch (error) {
        console.log('리뷰 필드 초기화 오류');
        throw error;
    }
}

/**
 * 모든 review 배열을 반환하는 함수
 * @returns {[]} - 각 review 배열이 들어있는 배열
 */

export const getReviewTotal = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(db, COLLECTION_NAME)
        );

        const result = querySnapshot.docs.map(doc => ({
            ...doc.data().reviews
        }));

        return result;

    } catch (error) {
        console.log('리뷰 필드 불러오기 오류');
        throw error;
    }
};

/**
 * 리뷰 통계량을 반환하는 함수
 * @returns {[]} - 각 review 배열이 들어있는 배열
 */

export const getReviewStatic = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(db, COLLECTION_NAME)
        );

        const result = querySnapshot.docs.map(doc => ([
            ...doc.data().reviews
        ]));
        var total = 0;
        var stars = 0;
        var a = [];
        result.map((item) => item.map((value) => {
            total++;
            stars += value.star
        }))
        return [total, stars]

    } catch (error) {
        console.log('리뷰 필드 불러오기 오류');
        throw error;
    }
};

/**
 * 관리자용 함수
 * 더미데이터 생성용
 */
export const makeDummyReviews = async (review) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, review.lectureId);

        await setDoc(docRef, {
            lectureId: review.lectureId,
            title: review.title,
            reviews: review.reviews,
            star: review.star,
            total: review.total,
            createdAt: serverTimestamp()
        });

        console.log(`✅ ${review.lectureId} 저장 완료`);
    } catch (error) {
        console.error("❌ 리뷰 더미 생성 실패:", error);
        throw error;
    }
};