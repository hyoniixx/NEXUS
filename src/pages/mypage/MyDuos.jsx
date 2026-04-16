import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DuoItem from "../../components/DuoItem";
import CreateDuoModal from "../../components/common/CreateDuoModal";
import "./MyDuos.css";

function MyDuos() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("my"); //my, pending, completed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDuo, setEditingDuo] = useState(null);

  const [myDuoList, setMyDuoList] = useState([
    {
      id: "my-1",
      nickname: "SoloKing",
      gameTag: "Hide on bush#KR1",
      myLine: "미드",
      myTier: "챌린저",
      wantLine: "정글",
      wantTier: "다이아+",
      intro: "편하게 즐겜하실 분 구합니다!",
      createdAt: "2026-04-15T15:39:00",
    },
  ]);

  const [pendingDuoList] = useState([
    {
      id: "pending-1",
      nickname: "이영희",
      gameTag: "SKT Faker#KR1",
      myLine: "원딜",
      myTier: "다이아",
      wantLine: "서포터",
      wantTier: "플래티넘+",
      intro: "서폿 잘하시는 분 찾습니다",
      createdAt: "2026-04-15T14:12:00",
    },
  ]);

  const [completedDuoList, setCompletedDuoList] = useState([
    {
      id: "done-1",
      nickname: "박민수",
      gameTag: "Deft#KR1",
      myLine: "탑",
      myTier: "마스터",
      wantLine: "정글",
      wantTier: "다이아+",
      intro: "랭크 올리실 분 구해요",
      createdAt: "2026-04-15T13:05:00",
    },
  ]);

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

  const handleUpdateDuo = (updatedDuo) => {
    setMyDuoList((prev) =>
      prev.map((item) => (item.id === updatedDuo.id ? updatedDuo : item)),
    );
    handleCloseEditModal();
  };

  const handleChat = (duo) => {
    navigate("/chat", {
      state: {
        duoId: duo.id,
        nickname: duo.nickname,
        gameTag: duo.gameTag,
      },
    });
  };

  const handleDelete = (duo) => {
    if (activeTab === "my") {
      setMyDuoList((prev) => prev.filter((item) => item.id !== duo.id));
      return;
    }

    if (activeTab === "done") {
      setCompletedDuoList((prev) => prev.filter((item) => item.id !== duo.id));
    }
  };

  return (
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
            className={`myduos-tab ${activeTab === "pending" ? "active" : ""}`}
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
              key={duo.id}
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
  );
}

export default MyDuos;
