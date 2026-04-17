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

const DUO_COLLECTION = "duos";
const APPLICATION_COLLECTION = "duoApplications";

export const getDuos = async () => {
  try {
    const q = query(
      collection(db, DUO_COLLECTION),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("듀오 목록 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getDuoById = async (docId) => {
  try {
    const snapshot = await getDoc(doc(db, DUO_COLLECTION, docId));

    if (!snapshot.exists()) return null;

    return {
      docId: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.log("듀오 상세 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getDuosByWriterUid = async (uid) => {
  try {
    const q = query(
      collection(db, DUO_COLLECTION),
      where("writer.uid", "==", uid),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("내 듀오 조회 실패");
    console.log(error);
    throw error;
  }
};

export const createDuo = async (newDuo) => {
  try {
    const duoData = {
      writer: {
        uid: newDuo.uid ?? null,
        userName: newDuo.nickname ?? "",
        profileImage: newDuo.profileImage ?? null,
        gameName: newDuo.gameName ?? "",
        gameTag: newDuo.gameTag ?? "",
        tier: newDuo.myTier ?? "",
        line: newDuo.myLine ?? "",
      },
      wishDuo: {
        tier: newDuo.wantTier ?? "",
        line: newDuo.wantLine ?? "",
      },
      content: newDuo.intro ?? "",
      createdAt: serverTimestamp(),
      isMatched: false,
    };

    const duoRef = await addDoc(collection(db, DUO_COLLECTION), duoData);

    console.log("듀오 생성 완료:", duoRef.id);
    return duoRef.id;
  } catch (error) {
    console.log("듀오 등록 실패");
    console.log(error);
    throw error;
  }
};

export const updateDuo = async (docId, updateData) => {
  try {
    const duoData = {
      writer: {
        uid: updateData.writer?.uid ?? null,
        userName: updateData.writer?.userName ?? "",
        profileImage: updateData.writer?.profileImage ?? null,
        gameName: updateData.writer?.gameName ?? "",
        gameTag: updateData.writer?.gameTag ?? "",
        tier: updateData.writer?.tier ?? "",
        line: updateData.writer?.line ?? "",
      },
      wishDuo: {
        tier: updateData.wishDuo?.tier ?? "",
        line: updateData.wishDuo?.line ?? "",
      },
      content: updateData.content ?? "",
      isMatched: updateData.isMatched ?? false,
    };

    await updateDoc(doc(db, DUO_COLLECTION, docId), duoData);
    console.log("듀오 수정 완료");
  } catch (error) {
    console.log("듀오 수정 실패");
    console.log(error);
    throw error;
  }
};

export const deleteDuo = async (docId) => {
  try {
    await deleteDoc(doc(db, DUO_COLLECTION, docId));
    console.log("듀오 삭제 완료");
  } catch (error) {
    console.log("듀오 삭제 실패");
    console.log(error);
    throw error;
  }
};

export const applyToDuo = async (duo, applicant) => {
  try {
    if (!duo?.docId) {
      throw new Error("듀오 문서 ID가 없습니다.");
    }

    if (!applicant?.uid) {
      throw new Error("신청자 정보가 없습니다.");
    }

    if (duo.writer?.uid === applicant.uid) {
      throw new Error("본인이 등록한 듀오에는 신청할 수 없습니다.");
    }

    const q = query(
      collection(db, APPLICATION_COLLECTION),
      where("duoId", "==", duo.docId),
      where("applicantUid", "==", applicant.uid),
    );

    const snapshot = await getDocs(q);

    const existing = snapshot.docs.find((item) => {
      const data = item.data();
      return data.status === "pending" || data.status === "matched";
    });

    if (existing) {
      return {
        isNew: false,
        applicationId: existing.id,
      };
    }

    const applicationRef = await addDoc(
      collection(db, APPLICATION_COLLECTION),
      {
        duoId: duo.docId,
        writerUid: duo.writer?.uid ?? null,
        writerName: duo.writer?.userName ?? "",
        applicantUid: applicant.uid,
        applicantName: applicant.userName ?? "",
        status: "pending",
        createdAt: serverTimestamp(),
      },
    );

    console.log("듀오 신청 완료:", applicationRef.id);

    return {
      isNew: true,
      applicationId: applicationRef.id,
    };
  } catch (error) {
    console.log("듀오 신청 실패");
    console.log(error);
    throw error;
  }
};

export const getDuoApplicationsByApplicantUid = async (uid) => {
  try {
    const q = query(
      collection(db, APPLICATION_COLLECTION),
      where("applicantUid", "==", uid),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("신청한 듀오 조회 실패");
    console.log(error);
    throw error;
  }
};

export const getDuoApplicationsByWriterUid = async (uid) => {
  try {
    const q = query(
      collection(db, APPLICATION_COLLECTION),
      where("writerUid", "==", uid),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.log("받은 듀오 신청 조회 실패");
    console.log(error);
    throw error;
  }
};

export const updateDuoApplicationStatus = async (applicationDocId, status) => {
  try {
    await updateDoc(doc(db, APPLICATION_COLLECTION, applicationDocId), {
      status,
    });

    console.log("듀오 신청 상태 수정 완료");
  } catch (error) {
    console.log("듀오 신청 상태 수정 실패");
    console.log(error);
    throw error;
  }
};
