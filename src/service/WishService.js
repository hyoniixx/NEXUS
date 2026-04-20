import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { getLectures } from "./LectureService";

const MEMBERS_COLLECTION = "users";

const getMemberDocByUid = async (uid) => {

  if (!uid) {
    console.warn("getMemberDocByUid: uid가 제공되지 않았습니다.");
    return null;
  }

  const docSnapShot = await getDoc(doc(db, MEMBERS_COLLECTION, uid))


  const userData = {
    uid: uid,
    ...docSnapShot.data()
  }

  return userData;
};

export const getWishLecturesByUid = async (uid) => {
  try {
    const member = await getMemberDocByUid(uid);
    console.log(member)
    if (!member) {
      return [];
    }

    const wishIds = Array.isArray(member.wish) ? member.wish : [];
    if (wishIds.length === 0) {
      return [];
    }

    const lectures = await getLectures();

    const wishedLectures = lectures.filter((lecture) =>
      wishIds.includes(lecture.docId),
    );

    return wishedLectures;
  } catch (error) {
    console.log("찜 강의 조회 실패");
    console.log(error);
    throw error;
  }
};


export const addWishByUid = async (uid, lectureDocId) => {
  try {
    if (!uid) throw new Error("로그인이 필요합니다.");
    if (!lectureDocId) throw new Error("강의 ID가 없습니다.");

    const userDocRef = doc(db, MEMBERS_COLLECTION, uid);

    await updateDoc(userDocRef, {
      wish: arrayUnion(lectureDocId),
    });

    console.log("찜 추가 완료");
  } catch (error) {
    console.error("찜 추가 실패:", error);
    throw error;
  }
};

export const removeWishByUid = async (uid, lecture) => {
  try {
    if (!uid) throw new Error("로그인이 필요합니다.");
    const lectureId = lecture.docId || lecture;

    const userDocRef = doc(db, MEMBERS_COLLECTION, uid);

    await updateDoc(userDocRef, {
      wish: arrayRemove(lectureId),
    });

    console.log("찜 삭제 완료");
  } catch (error) {
    console.error("찜 삭제 실패:", error);
    throw error;
  }
};

export const toggleWishByUid = async (uid, lectureDocId, isLiked) => {
  try {
    if (isLiked) {
      await removeWishByUid(uid, lectureDocId);
      return false;
    } else {
      await addWishByUid(uid, lectureDocId);
      return true;
    }
  } catch (error) {
    console.error("찜 토글 실패:", error);
    throw error;
  }
};
