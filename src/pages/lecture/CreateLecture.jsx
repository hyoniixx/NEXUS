import React from "react";
import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";

function CreateLecture() {
  const navigate = useNavigate();

  const initialValues = {
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

  const handleCreateLecture = async (newForm) => {
    console.log("등록할 강의 데이터", newForm);

    // Firebase 연결 전 임시 동작
    // 나중에 여기에 addDoc / Storage 업로드 넣으면 됨
    navigate("/lecture-list");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LectureForm
      mode="create"
      initialValues={initialValues}
      onSubmit={handleCreateLecture}
      onCancel={handleCancel}
    />
  );
}

export default CreateLecture;
