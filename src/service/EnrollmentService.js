import { collection, getDocs, query, where } from "firebase/firestore";
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
