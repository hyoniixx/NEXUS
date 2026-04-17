import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DuoItem from "../../components/DuoItem";
import CreateDuoModal from "../../components/common/CreateDuoModal";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/useModal";
import duoChatIcon from "../../assets/duochat.png";
import "./Duo.css";
import {
  applyToDuo,
  createDuo,
  deleteDuo,
  getDuos,
} from "../../service/DuoService";

function Duo() {
  const navigate = useNavigate();
  const [role] = useState("user"); // "user" || "admin"
  const isAdmin = role === "admin";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("전체 티어");
  const [selectedLine, setSelectedLine] = useState("전체 라인");
  const [openFilter, setOpenFilter] = useState("");
  const [selectedDuo, setSelectedDuo] = useState(null);

  const [duoList, setDuoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [resultModalMessage, setResultModalMessage] = useState("");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

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
    const fetchDuos = async () => {
      try {
        setIsLoading(true);
        const data = await getDuos();
        setDuoList(formatDuos(data));
      } catch (error) {
        console.error("듀오 목록 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuos();
  }, []);

  const filteredList = useMemo(() => {
    return duoList.filter((duo) => {
      const tierMatch =
        selectedTier === "전체 티어" || duo.writer.tier === selectedTier;
      const lineMatch =
        selectedLine === "전체 라인" || duo.writer.line === selectedLine;

      return tierMatch && lineMatch;
    });
  }, [duoList, selectedTier, selectedLine]);

  const handleCreateDuo = async (newDuo) => {
    try {
      await createDuo(newDuo);
      const data = await getDuos();
      setDuoList(formatDuos(data));
      setIsModalOpen(false);
    } catch (error) {
      console.error("듀오 등록 실패", error);
      setResultModalMessage("듀오 등록에 실패했습니다.");
      setIsResultModalOpen(true);
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDuo(docId);
      setDuoList((prev) => prev.filter((item) => item.docId !== docId));
    } catch (error) {
      console.error("듀오 삭제 실패", error);
      setResultModalMessage("듀오 삭제에 실패했습니다.");
      setIsResultModalOpen(true);
    }
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

  const handleConfirmApply = async () => {
    if (!selectedDuo) return;

    try {
      const applicant = {
        uid: 1, // 나중에 로그인 유저 uid로 교체
        userName: "테스트유저",
      };

      const result = await applyToDuo(selectedDuo, applicant);

      if (result.isNew) {
        setResultModalMessage("듀오 신청이 완료되었습니다.");
      } else {
        setResultModalMessage("이미 신청한 듀오입니다.");
      }

      applyDuoModal.closeModal();
      setSelectedDuo(null);
      setIsResultModalOpen(true);
    } catch (error) {
      console.error("듀오 신청 실패", error);
      setResultModalMessage(error.message || "듀오 신청에 실패했습니다.");
      applyDuoModal.closeModal();
      setSelectedDuo(null);
      setIsResultModalOpen(true);
    }
  };

  const applyDuoModal = useModal(handleConfirmApply);

  const handleOpenApplyModal = (duo) => {
    setSelectedDuo(duo);
    applyDuoModal.openModal();
  };

  if (isLoading) {
    return (
      <div className="duo-page">
        <div className="duo-page-inner">
          <div className="duo-title-wrap">
            <h1 className="duo-title">듀오 매칭</h1>
            <p className="duo-subtitle">듀오 목록을 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="duo-page">
        <div className="duo-page-inner">
          <div
            className={`duo-top-section ${
              isAdmin ? "duo-top-section-admin" : ""
            }`}
          >
            <div className="duo-title-wrap">
              <h1 className="duo-title">듀오 매칭</h1>
              <p className="duo-subtitle">
                함께 게임할 듀오 파트너를 찾아보세요
              </p>
            </div>

            {!isAdmin && (
              <div className="duo-action-wrap">
                <button
                  className="duo-chat-btn"
                  type="button"
                  onClick={() => navigate("/chat")}
                >
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
                key={duo.docId}
                duo={duo}
                mode={isAdmin ? "admin" : "default"}
                onDelete={() => handleDelete(duo.docId)}
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
          content={`${
            selectedDuo?.writer?.userName || selectedDuo?.nickname || ""
          }님에게 듀오를 신청하시겠습니까?`}
          type="two"
          color="blue"
        />
      </div>

      <div className="duo-modal-blue">
        <Modal
          isModal={isResultModalOpen}
          closeModal={() => setIsResultModalOpen(false)}
          activeModal={() => setIsResultModalOpen(false)}
          title="듀오 신청"
          content={resultModalMessage}
          type="one"
          color="blue"
        />
      </div>
    </>
  );
}

export default Duo;
