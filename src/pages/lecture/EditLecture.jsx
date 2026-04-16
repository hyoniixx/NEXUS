import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import "./EditLecture.css";

function EditLecture() {
  const navigate = useNavigate();
  const [pendingLecture, setPendingLecture] = useState(null);

  // 원래는 여기 firebase에서 가져온 데이터 들어감
  const initialValues = {
    title: "샘플 강의",
    description: "강의 설명입니다",
    line: "미드",
    level: "다이아",
    lessonTime: "60분",
    price: "30000",
    image: null,
    champions: ["아리"],
    curriculum: ["라인전", "운영"],
  };

  const handleConfirmEditLecture = async () => {
    if (!pendingLecture) return;

    console.log("수정할 강의 데이터", pendingLecture);

    // 나중에 firebase updateDoc 넣으면 됨
    navigate("/lecture-list");
  };

  const editLectureModal = useModal(handleConfirmEditLecture);

  const handleOpenEditModal = (formData) => {
    setPendingLecture(formData);
    editLectureModal.openModal();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <LectureForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleOpenEditModal}
        onCancel={handleCancel}
      />

      <div className="lecture-edit-modal-blue">
        <Modal
          isModal={editLectureModal.isModal}
          closeModal={editLectureModal.closeModal}
          activeModal={editLectureModal.activeModal}
          title="강의 수정"
          content={`강의를 수정하시겠습니까?`}
          type="two"
        />
      </div>
    </>
  );
}

export default EditLecture;
