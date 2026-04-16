import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import "./CreateLecture.css";

function CreateLecture() {
  const navigate = useNavigate();
  const [pendingLecture, setPendingLecture] = useState(null);

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

  const handleConfirmCreateLecture = async () => {
    if (!pendingLecture) return;

    console.log("등록할 강의 데이터", pendingLecture);

    // Firebase 연결 전 임시 동작
    // 나중에 여기에 addDoc / Storage 업로드 넣으면 됨
    navigate("/lecture-list");
  };

  const createLectureModal = useModal(handleConfirmCreateLecture);

  const handleOpenCreateModal = (newForm) => {
    setPendingLecture(newForm);
    createLectureModal.openModal();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <LectureForm
        mode="create"
        initialValues={initialValues}
        onSubmit={handleOpenCreateModal}
        onCancel={handleCancel}
      />

      <div className="lecture-create-modal-blue">
        <Modal
          isModal={createLectureModal.isModal}
          closeModal={createLectureModal.closeModal}
          activeModal={createLectureModal.activeModal}
          title="강의 등록"
          content={`새로운 강의를 등록하시겠습니까?`}
          type="two"
        />
      </div>
    </>
  );
}

export default CreateLecture;
