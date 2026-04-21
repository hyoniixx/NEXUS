import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/config.js";

const COLLECTION_NAME = "enrollments";

export const getEnrollmentsByInstructorId = async (instructorId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("instructorId", "==", instructorId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("수강생 목록 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getEnrollmentsByStudentId = async (studentId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("studentId", "==", studentId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("내 수강 목록 조회 실패");
    console.log(error);
    throw error;
  }
};

/**
 * 강의 생성 시, 강사의 마이페이지에 수강생 목록을 표현하기 위한 함수
 * @param {string} lectureId - 강의 ID
 * @param {string} lectureTitle - 강의 제목
 * @param {string} instructorId - 강사 ID
 * @param {string} studentId - 수강생 ID
 * @param {string} studentName - 수강생 userName
 */
export const createEnrollment = async (lectureId, lectureTitle, instructorId, studentId, studentName) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      instructorId: instructorId,
      studentId: studentId,
      studentName: studentName,
      lectureId: lectureId,
      lectureTitle: lectureTitle,
      chatStatus: "수강 전",
      createdAt: serverTimestamp()
    });
    console.log('수강 등록 완료:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.log('수강 등록 오류');
    throw error;
  }
}


export const getEnrollment = async (uid) => {

  const q = query(
    collection(db, COLLECTION_NAME),
    where('instructorId', '==', uid)
  )

  try {
    const enrollSnapShot = await getDocs(q)

    const enrolls = enrollSnapShot.docs.map((doc) => (
      {
        id: doc.id,
        ...doc.data()
      }
    ))
    return enrolls
  } catch (error) {
    console.log(error)
  }
}

export const updateEnrollment = async (id, status) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), {
      chatStatus: status
    })
    console.log('게시글이 수정되었습니다.')
  } catch (e) {
    console.log('게시글 수정 오류');
    throw e;
  }
}


export const deleteEnrollment = async (id) => {
  try {
    console.log('22222222222', id)

    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log('333333333', id)

  } catch (error) {
    console.log(error)
  }
}
