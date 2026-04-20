import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { createReviewField } from "./ReviewService";

const COLLECTION_NAME = "lectures";

const curriculumArrayToObject = (curriculum) => {
  if (!Array.isArray(curriculum)) return {};

  return curriculum.reduce((acc, item, index) => {
    acc[String(index + 1)] = item;
    return acc;
  }, {});
};

const curriculumObjectToArray = (curriculum) => {
  if (!curriculum || typeof curriculum !== "object") return [""];

  return Object.keys(curriculum)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => curriculum[key]);
};

// 숫자 안전 변환
const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/* =========================
   전체 조회
========================= */

export const getLectures = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("강의 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getLectureById = async (docId) => {
  try {
    const snapshot = await getDoc(doc(db, COLLECTION_NAME, docId));

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return {
      docId: snapshot.id,
      ...data,
      curriculum: curriculumObjectToArray(data.curriculum),
    };
  } catch (error) {
    console.log("강의 상세 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getLecturesByInstructorId = async (uid) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("uid", "==", uid));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => ({
      docId: docItem.id,
      ...docItem.data(),
    }));
  } catch (error) {
    console.log("강사 강의 조회 실패");
    console.log(error);
    throw error;
  }
};

export const createLecture = async (newLecture) => {
  try {
    const { image, ...rest } = newLecture;

    const lectureData = {
      uid: rest.uid ?? 1,
      title: rest.title,
      level: rest.level,
      champion: Array.isArray(rest.champion) ? rest.champion : [],
      line: rest.line,
      description: rest.description,
      curriculum: curriculumArrayToObject(rest.curriculum),
      time: safeNumber(rest.lectureCount),
      price: safeNumber(rest.price),
      instructor: rest.instructor ?? "",
      instructorId: rest.instructorId ?? "",
      createdAt: serverTimestamp(),
    };

    const lectureRef = await addDoc(
      collection(db, COLLECTION_NAME),
      lectureData,
    );

    await createReviewField(
      lectureRef.id,
      lectureData.title,
      lectureData.instructor,
      lectureData.instructorId,
    );

    console.log("강의 생성 완료:", lectureRef.id);
    return lectureRef.id;
  } catch (error) {
    console.log("강의 등록 실패");
    console.log(error);
    throw error;
  }
};

export const updateLecture = async (docId, updateData) => {
  try {
    const { image, ...rest } = updateData;

    const lectureData = {
      title: rest.title,
      level: rest.level,
      champion: Array.isArray(rest.champion) ? rest.champion : [],
      line: rest.line,
      description: rest.description,
      curriculum: curriculumArrayToObject(rest.curriculum),
      time: safeNumber(rest.lectureCount),
      price: safeNumber(rest.price),
      instructor: rest.instructor ?? "",
      instructorId: rest.instructorId ?? "",
    };

    await updateDoc(doc(db, COLLECTION_NAME, docId), lectureData);

    console.log("강의 수정 완료");
  } catch (error) {
    console.log("강의 수정 실패");
    console.log(error);
    throw error;
  }
};

export const deleteLecture = async (docId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId));
    console.log("강의 삭제 완료");
  } catch (error) {
    console.log("강의 삭제 실패");
    console.log(error);
    throw error;
  }
};
