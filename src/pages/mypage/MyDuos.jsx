import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DuoItem from "../../components/DuoItem";
import CreateDuoModal from "../../components/common/CreateDuoModal";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import "./MyDuos.css";
import {
  deleteDuo,
  getDuoApplicationsByApplicantUid,
  getDuos,
  getDuosByWriterUid,
  updateDuo,
} from "../../service/DuoService";
import { userContext } from "../../App";

function MyDuos() {
  const navigate = useNavigate();
  const { userData, loading } = useContext(userContext);

  const uid = userData?.uid || null;
  const userName = userData?.userName || "";

  const [activeTab, setActiveTab] = useState("my");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDuo, setEditingDuo] = useState(null);
  const [deletingDuo, setDeletingDuo] = useState(null);

  const [myDuoList, setMyDuoList] = useState([]);
  const [pendingDuoList, setPendingDuoList] = useState([]);
  const [completedDuoList, setCompletedDuoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDuos = (data) =>
    data.map((duo) => ({
      docId: duo.docId,
      writer: {
        uid: duo.writer?.uid ?? null,
        userName: duo.writer?.userName ?? "",
        profileImage: duo.writer?.profileImage ?? null,
        gameName: duo.writer?.gameName ?? "",
        gameTag: duo.writer?.gameTag ?? "",
        tier: duo.writer?.tier ?? "",
        line: duo.writer?.line ?? "",
      },
      wishDuo: {
        tier: duo.wishDuo?.tier ?? "",
        line: duo.wishDuo?.line ?? "",
      },
      content: duo.content ?? "",
      createdAt: duo.createdAt ?? null,
      isMatched: duo.isMatched ?? false,
    }));

  useEffect(() => {
    const fetchMyDuos = async () => {
      if (!uid) {
        setMyDuoList([]);
        setPendingDuoList([]);
        setCompletedDuoList([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const [myDuosRaw, allDuosRaw, myApplications] = await Promise.all([
          getDuosByWriterUid(uid),
          getDuos(),
          getDuoApplicationsByApplicantUid(uid),
        ]);

        const myDuos = formatDuos(myDuosRaw);
        const allDuos = formatDuos(allDuosRaw);

        const pendingAppliedDuos = myApplications
          .filter((application) => application.status === "pending")
          .map((application) =>
            allDuos.find((duo) => duo.docId === application.duoId),
          )
          .filter(Boolean);

        setMyDuoList(myDuos.filter((duo) => !duo.isMatched));
        setCompletedDuoList(myDuos.filter((duo) => duo.isMatched));
        setPendingDuoList(pendingAppliedDuos);
      } catch (error) {
        console.error("내 듀오 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchMyDuos();
    }
  }, [uid, loading]);

  const currentList = useMemo(() => {
    if (activeTab === "my") return myDuoList;
    if (activeTab === "pending") return pendingDuoList;
    return completedDuoList;
  }, [activeTab, myDuoList, pendingDuoList, completedDuoList]);

  const handleEdit = (duo) => {
    setEditingDuo(duo);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingDuo(null);
  };

  const handleUpdateDuo = async (updatedDuo) => {
    try {
      const docId = updatedDuo.docId || editingDuo?.docId;
      if (!docId || !uid) return;

      const duoData = {
        writer: {
          uid,
          userName:
            updatedDuo.nickname ?? editingDuo?.writer?.userName ?? userName,
          profileImage: editingDuo?.writer?.profileImage ?? null,
          gameName: updatedDuo.gameName ?? editingDuo?.writer?.gameName ?? "",
          gameTag: updatedDuo.gameTag ?? editingDuo?.writer?.gameTag ?? "",
          tier: updatedDuo.myTier ?? editingDuo?.writer?.tier ?? "",
          line: updatedDuo.myLine ?? editingDuo?.writer?.line ?? "",
        },
        wishDuo: {
          tier: updatedDuo.wantTier ?? editingDuo?.wishDuo?.tier ?? "",
          line: updatedDuo.wantLine ?? editingDuo?.wishDuo?.line ?? "",
        },
        content: updatedDuo.intro ?? editingDuo?.content ?? "",
        isMatched: editingDuo?.isMatched ?? false,
      };

      await updateDuo(docId, duoData);

      const nextUpdated = {
        ...editingDuo,
        ...duoData,
      };

      setMyDuoList((prev) =>
        prev.map((item) => (item.docId === docId ? nextUpdated : item)),
      );

      setCompletedDuoList((prev) =>
        prev.map((item) => (item.docId === docId ? nextUpdated : item)),
      );

      handleCloseEditModal();
    } catch (error) {
      console.error("듀오 수정 실패", error);
      alert("듀오 수정 실패");
    }
  };

  const handleChat = (duo) => {
    if (!uid || !userName) {
      alert("로그인 후 채팅 이용이 가능합니다.");
      return;
    }

    navigate("/chat", {
      state: {
        duoId: duo.docId,
        nickname: duo.writer.userName,
        gameTag: `${duo.writer.gameName}${duo.writer.gameTag}`,
      },
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletingDuo) return;

    try {
      await deleteDuo(deletingDuo.docId);

      if (activeTab === "my") {
        setMyDuoList((prev) =>
          prev.filter((item) => item.docId !== deletingDuo.docId),
        );
      }

      if (activeTab === "done") {
        setCompletedDuoList((prev) =>
          prev.filter((item) => item.docId !== deletingDuo.docId),
        );
      }

      setDeletingDuo(null);
      deleteModal.closeModal();
    } catch (error) {
      console.error("듀오 삭제 실패", error);
      alert("듀오 삭제 실패");
    }
  };

  const deleteModal = useModal(handleConfirmDelete);

  const handleDelete = (duo) => {
    setDeletingDuo(duo);
    deleteModal.openModal();
  };

  const handleCloseDeleteModal = () => {
    setDeletingDuo(null);
    deleteModal.closeModal();
  };

  if (loading || isLoading) {
    return (
      <div className="myduos-page">
        <div className="myduos-inner">
          <div className="myduos-header">
            <div className="myduos-title-wrap">
              <h1 className="myduos-title">내 듀오</h1>
              <p className="myduos-subtitle">
                듀오 정보를 불러오는 중입니다...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="myduos-page">
        <div className="myduos-inner">
          <div className="myduos-header">
            <div className="myduos-title-wrap">
              <h1 className="myduos-title">내 듀오</h1>
              <p className="myduos-subtitle">
                등록한 듀오와 신청한 듀오를 관리하세요
              </p>
            </div>
          </div>

          <div className="myduos-tab-row">
            <button
              type="button"
              className={`myduos-tab ${activeTab === "my" ? "active" : ""}`}
              onClick={() => setActiveTab("my")}
            >
              내 듀오
            </button>

            <button
              type="button"
              className={`myduos-tab ${
                activeTab === "pending" ? "active" : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              신청 중인 듀오
            </button>

            <button
              type="button"
              className={`myduos-tab ${activeTab === "done" ? "active" : ""}`}
              onClick={() => setActiveTab("done")}
            >
              완료된 듀오
            </button>
          </div>

          <div className="myduos-count">전체 {currentList.length}개</div>

          <div className="myduos-card-grid">
            {currentList.map((duo) => (
              <DuoItem
                key={duo.docId}
                duo={duo}
                mode={activeTab}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onChat={handleChat}
              />
            ))}
          </div>
        </div>

        {isEditModalOpen && editingDuo && (
          <CreateDuoModal
            mode="edit"
            initialData={editingDuo}
            onClose={handleCloseEditModal}
            onCreate={handleUpdateDuo}
          />
        )}
      </div>

      <div className="myduos-delete-modal-red">
        <Modal
          isModal={deleteModal.isModal}
          closeModal={handleCloseDeleteModal}
          activeModal={handleConfirmDelete}
          title="듀오 삭제"
          content={`정말 이 듀오를 삭제하시겠습니까?\n삭제 후에는 되돌릴 수 없습니다.`}
          type="two"
          color="red"
        />
      </div>
    </>
  );
}

export default MyDuos;
