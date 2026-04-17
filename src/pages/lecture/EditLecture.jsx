import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import { getLectureById, updateLecture } from "../../service/LectureService";
import "./EditLecture.css";

function EditLecture() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);
  const [pendingLecture, setPendingLecture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Firestore → 폼 데이터 변환
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        setIsLoading(true);

        const lecture = await getLectureById(id);
        console.log("불러온 강의:", lecture);

        if (!lecture) {
          alert("강의를 찾을 수 없습니다.");
          navigate("/lecture-list");
          return;
        }

        setInitialValues({
          lectureId: lecture.docId, // 🔥 Firestore docId 사용
          title: lecture.title || "",
          description: lecture.description || "",
          line: lecture.line || "",
          level: lecture.level || "",
          lectureCount: lecture.time ?? "", // 🔥 time → lectureCount
          price: lecture.price ?? "",
          image: null,
          champion: lecture.champion || [],
          curriculum: lecture.curriculum || [""], // 🔥 이미 배열로 변환됨
        });
      } catch (error) {
        console.error("강의 불러오기 실패", error);
        alert("강의 불러오기 실패");
        navigate("/lecture-list");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchLecture();
  }, [id, navigate]);

  // 🔥 수정 실행
  const handleConfirmEditLecture = async () => {
    if (!pendingLecture || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { lectureId, image, ...rest } = pendingLecture;

      await updateLecture(lectureId, rest);

      editLectureModal.closeModal();
      navigate("/lecture-list");
    } catch (error) {
      console.error("강의 수정 실패", error);
      alert("강의 수정 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  const editLectureModal = useModal(handleConfirmEditLecture);

  const handleOpenEditModal = (formData) => {
    setPendingLecture({
      ...formData,
      lectureId: id, // 🔥 docId 넣기
    });
    editLectureModal.openModal();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 🔥 로딩 처리
  if (isLoading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        강의 정보를 불러오는 중...
      </div>
    );
  }

  if (!initialValues) return null;

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
          activeModal={handleConfirmEditLecture}
          title="강의 수정"
          content={
            isSubmitting
              ? "강의를 수정하는 중입니다..."
              : "강의를 수정하시겠습니까?"
          }
          type="two"
          color="blue"
        />
      </div>
    </>
  );
}

export default EditLecture;
