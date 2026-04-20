import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import { createLecture } from "../../service/LectureService";
import { userContext } from "../../App";
import "./CreateLecture.css";

function CreateLecture() {
  const navigate = useNavigate();
  const { userData } = useContext(userContext);

  const [pendingLecture, setPendingLecture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    line: "",
    level: "",
    lectureCount: "",
    price: "",
    image: null,
    champion: [],
    curriculum: [""],
  };

  const handleConfirmCreateLecture = async () => {
    if (!pendingLecture || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { image, ...lectureWithoutImage } = pendingLecture;

      await createLecture({
        ...lectureWithoutImage,
        uid: userData?.uid ?? 1,
        instructor: userData?.userName ?? "",
        instructorId: userData?.email ?? "",
      });

      createLectureModal.closeModal();
      navigate("/lecture-list");
    } catch (error) {
      console.error("강의 등록 오류", error);
      alert("강의 등록 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createLectureModal = useModal(handleConfirmCreateLecture);

  const handleOpenCreateModal = (formData) => {
    setPendingLecture(formData);
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
          activeModal={handleConfirmCreateLecture}
          title="강의 등록"
          content={
            isSubmitting
              ? "강의를 등록하는 중입니다..."
              : "새로운 강의를 등록하시겠습니까?"
          }
          type="two"
          color="blue"
        />
      </div>
    </>
  );
}

export default CreateLecture;
