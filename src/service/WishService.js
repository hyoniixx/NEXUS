import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { getLectures } from "./LectureService";

const MEMBERS_COLLECTION = "members";

const getMemberDocByUid = async (uid) => {
  const q = query(collection(db, MEMBERS_COLLECTION), where("uid", "==", uid));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];

  return {
    docId: docSnap.id,
    ...docSnap.data(),
  };
};

export const getWishLecturesByUid = async (uid) => {
  try {
    const member = await getMemberDocByUid(uid);

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

export const removeWishByUid = async (uid, lecture) => {
  try {
    const member = await getMemberDocByUid(uid);

    if (!member) {
      throw new Error("회원 정보를 찾을 수 없습니다.");
    }

    if (!lecture.docId) {
      throw new Error("강의 문서 ID가 없습니다.");
    }

    await updateDoc(doc(db, MEMBERS_COLLECTION, member.docId), {
      wish: arrayRemove(lecture.docId),
    });
    console.log("찜 삭제 완료");
  } catch (error) {
    console.log("찜 삭제 실패");
    console.log(error);
    throw error;
  }
};

export const addWishByUid = async (uid, lectureDocId) => {
  try {
    const member = await getMemberDocByUid(uid);

    if (!member) {
      throw new Error("회원 정보를 찾을 수 없습니다.");
    }

    if (!lectureDocId) {
      throw new Error("강의 문서 ID가 없습니다.");
    }

    await updateDoc(doc(db, MEMBERS_COLLECTION, member.docId), {
      wish: arrayUnion(lectureDocId),
    });

    console.log("찜 추가 완료");
  } catch (error) {
    console.log("찜 추가 실패");
    console.log(error);
    throw error;
  }
};

export const toggleWishByUid = async (uid, lectureDocId, isLiked) => {
  try {
    if (isLiked) {
      const lecture = { docId: lectureDocId };
      await removeWishByUid(uid, lecture);
      return false;
    }

    await addWishByUid(uid, lectureDocId);
    return true;
  } catch (error) {
    console.log("찜 토글 실패");
    console.log(error);
    throw error;
  }
};
