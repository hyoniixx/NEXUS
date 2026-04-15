import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";

function EditLecture() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dummyLectures = [
    {
      id: 1,
      title: "다이아 돌파를 위한 미드 라이너 마스터클래스",
      description: "강의 내용을 자세히 설명해주세요...",
      line: "미드",
      level: "심화",
      lessonTime: "주 2회, 회당 1시간",
      price: "50000",
      image: null,
      champions: ["아지르"],
      curriculum: ["1번째 커리큘럼 내용"],
    },
    {
      id: 2,
      title: "정글 캐리의 정석 - 초보자 환영",
      description: "정글 강의 설명입니다.",
      line: "정글",
      level: "초급",
      lessonTime: "주 1회, 회당 2시간",
      price: "35000",
      image: null,
      champions: ["리 신"],
      curriculum: ["정글 동선 기초"],
    },
    {
      id: 3,
      title: "탑 라인 1:1 압살 테크닉",
      description: "탑 라인 운영과 라인전 강의입니다.",
      line: "탑",
      level: "중급",
      lessonTime: "주 2회, 회당 90분",
      price: "45000",
      image: null,
      champions: ["제이스"],
      curriculum: ["라인전 운영법"],
    },
  ];

  const lecture = dummyLectures.find((item) => String(item.id) === String(id));

  const initialValues = lecture ?? {
    title: "",
    description: "",
    line: "",
    level: "",
    lessonTime: "",
    price: "",
    image: null,
    champions: [],
    curriculum: [""],
  };

  const handleEditLecture = async (updatedForm) => {
    console.log("수정할 강의 데이터", updatedForm);

    // 나중에 Firebase 연결할 때 여기에서 update 처리
    // 예:
    // await updateDoc(doc(db, "lectures", id), updatedForm);

    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!lecture) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0E27",
          color: "#E8EAF0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
        }}
      >
        수정할 강의를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <LectureForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleEditLecture}
      onCancel={handleCancel}
    />
  );
}

export default EditLecture;
