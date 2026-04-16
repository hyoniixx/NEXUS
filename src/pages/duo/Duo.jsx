import React, { useMemo, useState } from "react";
import DuoItem from "../../components/DuoItem";
import CreateDuoModal from "../../components/common/CreateDuoModal";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import duoChatIcon from "../../assets/duochat.png";
import "./Duo.css";

function Duo() {
  const [role] = useState("user"); // user || admin

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("전체 티어");
  const [selectedLine, setSelectedLine] = useState("전체 라인");
  const [openFilter, setOpenFilter] = useState("");
  const [selectedDuo, setSelectedDuo] = useState(null);

  const [duoList, setDuoList] = useState([
    {
      id: "duo-1",
      nickname: "SoloKing",
      gameTag: "Hide on bush#KR1",
      myLine: "미드",
      myTier: "챌린저",
      wantLine: "정글",
      wantTier: "다이아+",
      intro: "편하게 즐겜하실 분 구합니다!",
      createdAt: "2026-04-15T15:39:00",
    },
    {
      id: "duo-2",
      nickname: "이영희",
      gameTag: "SKT Faker#KR1",
      myLine: "원딜",
      myTier: "다이아",
      wantLine: "서포터",
      wantTier: "플래티넘+",
      intro: "서폿 잘하시는 분 찾습니다",
      createdAt: "2026-04-15T14:12:00",
    },
    {
      id: "duo-3",
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

  const tierOptions = [
    "전체 티어",
    "아이언",
    "브론즈",
    "실버",
    "골드",
    "플래티넘",
    "에메랄드",
    "다이아",
    "마스터",
    "그랜드마스터",
    "챌린저",
  ];

  const lineOptions = ["전체 라인", "탑", "정글", "미드", "원딜", "서포터"];

  const isAdmin = role === "admin";

  const filteredList = useMemo(() => {
    return duoList.filter((duo) => {
      const tierMatch =
        selectedTier === "전체 티어" || duo.myTier === selectedTier;
      const lineMatch =
        selectedLine === "전체 라인" || duo.myLine === selectedLine;

      return tierMatch && lineMatch;
    });
  }, [duoList, selectedTier, selectedLine]);

  const handleCreateDuo = (newDuo) => {
    const newItem = {
      id: Date.now().toString(),
      ...newDuo,
      createdAt: new Date().toISOString(),
    };

    setDuoList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setDuoList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleFilter = (type) => {
    setOpenFilter((prev) => (prev === type ? "" : type));
  };

  const handleSelectTier = (option) => {
    setSelectedTier(option);
    setOpenFilter("");
  };

  const handleSelectLine = (option) => {
    setSelectedLine(option);
    setOpenFilter("");
  };

  const handleConfirmApply = () => {
    if (!selectedDuo) return;
    console.log("듀오 신청 실행:", selectedDuo);
    setSelectedDuo(null);
  };

  const applyDuoModal = useModal(handleConfirmApply);

  const handleOpenApplyModal = (duo) => {
    setSelectedDuo(duo);
    applyDuoModal.openModal();
  };

  return (
    <>
      <div className="duo-page">
        <div className="duo-page-inner">
          <div
            className={`duo-top-section ${isAdmin ? "duo-top-section-admin" : ""}`}
          >
            <div className="duo-title-wrap">
              <h1 className="duo-title">듀오 매칭</h1>
              <p className="duo-subtitle">
                함께 게임할 듀오 파트너를 찾아보세요
              </p>
            </div>

            {!isAdmin && (
              <div className="duo-action-wrap">
                <button className="duo-chat-btn" type="button">
                  <img src={duoChatIcon} alt="채팅" className="duo-btn-icon" />
                  <span className="duo-btn-label">채팅</span>
                </button>

                <button
                  className="duo-create-btn"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="duo-plus">+</span>
                  <span className="duo-btn-label">듀오 신청 등록</span>
                </button>
              </div>
            )}
          </div>

          <div className="duo-filter-row">
            <div className="duo-filters">
              <div className="duo-filter-box">
                <button
                  type="button"
                  className="duo-filter-trigger"
                  onClick={() => handleToggleFilter("tier")}
                >
                  <span>{selectedTier}</span>
                  <span
                    className={`duo-filter-arrow ${
                      openFilter === "tier" ? "open" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {openFilter === "tier" && (
                  <div className="duo-filter-menu">
                    {tierOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`duo-filter-item ${
                          selectedTier === option ? "active" : ""
                        }`}
                        onClick={() => handleSelectTier(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="duo-filter-box">
                <button
                  type="button"
                  className="duo-filter-trigger"
                  onClick={() => handleToggleFilter("line")}
                >
                  <span>{selectedLine}</span>
                  <span
                    className={`duo-filter-arrow ${
                      openFilter === "line" ? "open" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {openFilter === "line" && (
                  <div className="duo-filter-menu">
                    {lineOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`duo-filter-item ${
                          selectedLine === option ? "active" : ""
                        }`}
                        onClick={() => handleSelectLine(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="duo-count">전체 {filteredList.length}개</div>
          </div>

          <div className="duo-card-grid">
            {filteredList.map((duo) => (
              <DuoItem
                key={duo.id}
                duo={duo}
                mode={isAdmin ? "admin" : "default"}
                onDelete={() => handleDelete(duo.id)}
                onApply={handleOpenApplyModal}
              />
            ))}
          </div>
        </div>

        {!isAdmin && isModalOpen && (
          <CreateDuoModal
            mode="create"
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateDuo}
          />
        )}
      </div>

      <div className="duo-modal-blue">
        <Modal
          isModal={applyDuoModal.isModal}
          closeModal={applyDuoModal.closeModal}
          activeModal={applyDuoModal.activeModal}
          title="듀오 신청"
          content={`${selectedDuo?.nickname || ""}님에게 듀오를 신청하시겠습니까?`}
          type="two"
        />
      </div>
    </>
  );
}

export default Duo;
