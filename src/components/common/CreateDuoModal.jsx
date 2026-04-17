import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useModal from "../../hooks/useModal";
import "./CreateDuoModal.css";

const LINE_OPTIONS = ["탑", "정글", "미드", "원딜", "서포터"];
const TIER_OPTIONS = [
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

function Dropdown({
  label,
  required = false,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  return (
    <div className="create-duo-modal-group">
      <label className="create-duo-modal-label">
        {label} {required && <span>*</span>}
      </label>

      <button
        type="button"
        className="create-duo-modal-dropdown"
        onClick={onToggle}
      >
        <span style={{ color: value ? "#E8EAF0" : "rgba(232, 234, 240, 0.5)" }}>
          {value || placeholder}
        </span>
        <span className="create-duo-modal-arrow">{isOpen ? "▴" : "▾"}</span>
      </button>

      {isOpen && (
        <div className="create-duo-modal-menu">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`create-duo-modal-menu-item ${
                value === option ? "active" : ""
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateDuoModal({
  mode = "create",
  initialData = null,
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState({
    id: "",
    nickname: "",
    gameTag: "",
    intro: "",
    myLine: "",
    myTier: "",
    wantLine: "",
    wantTier: "",
    createdAt: "",
  });

  const [openDropdown, setOpenDropdown] = useState("");
  const [showFormModal, setShowFormModal] = useState(true);
  const [pendingPayload, setPendingPayload] = useState(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        id: initialData.id || "",
        nickname: initialData.nickname || "",
        gameTag: initialData.gameTag || "",
        intro: initialData.intro || "",
        myLine: initialData.myLine || "",
        myTier: initialData.myTier || "",
        wantLine: initialData.wantLine || "",
        wantTier: initialData.wantTier || "",
        createdAt: initialData.createdAt || "",
      });
    }
  }, [mode, initialData]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const dropdownEl = e.target.closest(".create-duo-modal-group");
      if (!dropdownEl) setOpenDropdown("");
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleChange = (key, value) => {
    if (key === "intro" && value.length > 45) return;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown((prev) => (prev === key ? "" : key));
  };

  const handleDropdownSelect = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown("");
  };

  const isValid =
    form.nickname.trim() &&
    form.gameTag.trim() &&
    form.intro.trim() &&
    form.myLine &&
    form.myTier &&
    form.wantLine &&
    form.wantTier;

  const handleConfirmSubmit = () => {
    if (!pendingPayload) return;
    onCreate(pendingPayload);
  };

  const submitConfirmModal = useModal(handleConfirmSubmit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload =
      mode === "edit"
        ? { ...form }
        : {
            ...form,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };

    setPendingPayload(payload);
    setShowFormModal(false);
    submitConfirmModal.openModal();
  };

  const handleCloseConfirmModal = () => {
    submitConfirmModal.closeModal();
    setPendingPayload(null);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setPendingPayload(null);
    setShowFormModal(false);
    onClose();
  };

  return (
    <>
      {showFormModal && (
        <div
          className="create-duo-modal-overlay"
          onClick={handleCloseFormModal}
        >
          <div
            className="create-duo-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="create-duo-modal-header">
              <h2 className="create-duo-modal-title">
                {mode === "edit" ? "듀오 수정" : "듀오 신청 등록"}
              </h2>

              <button
                type="button"
                className="create-duo-modal-close"
                onClick={handleCloseFormModal}
              >
                ×
              </button>
            </div>

            <form className="create-duo-modal-form" onSubmit={handleSubmit}>
              <div className="create-duo-modal-row">
                <div className="create-duo-modal-group">
                  <label className="create-duo-modal-label">
                    게임 닉네임 <span>*</span>
                  </label>
                  <input
                    className="create-duo-modal-input"
                    value={form.nickname}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    placeholder="닉네임"
                  />
                </div>

                <div className="create-duo-modal-group">
                  <label className="create-duo-modal-label">
                    게임 태그 <span>*</span>
                  </label>
                  <input
                    className="create-duo-modal-input"
                    value={form.gameTag}
                    onChange={(e) => handleChange("gameTag", e.target.value)}
                    placeholder="KR1"
                  />
                </div>
              </div>

              <div className="create-duo-modal-group">
                <label className="create-duo-modal-label">
                  한 줄 소개 <span>*</span>
                </label>
                <input
                  className="create-duo-modal-input"
                  value={form.intro}
                  onChange={(e) => handleChange("intro", e.target.value)}
                  placeholder="간단한 자기소개를 입력하세요"
                />
                <div className="create-duo-modal-count">
                  {form.intro.length}/45
                </div>
              </div>

              <div className="create-duo-modal-row">
                <Dropdown
                  label="내 라인"
                  required
                  value={form.myLine}
                  placeholder="라인 선택"
                  options={LINE_OPTIONS}
                  isOpen={openDropdown === "myLine"}
                  onToggle={() => handleDropdownToggle("myLine")}
                  onSelect={(value) => handleDropdownSelect("myLine", value)}
                />

                <Dropdown
                  label="내 티어"
                  required
                  value={form.myTier}
                  placeholder="티어 선택"
                  options={TIER_OPTIONS}
                  isOpen={openDropdown === "myTier"}
                  onToggle={() => handleDropdownToggle("myTier")}
                  onSelect={(value) => handleDropdownSelect("myTier", value)}
                />
              </div>

              <div className="create-duo-modal-row">
                <Dropdown
                  label="원하는 듀오의 라인"
                  required
                  value={form.wantLine}
                  placeholder="라인 선택"
                  options={LINE_OPTIONS}
                  isOpen={openDropdown === "wantLine"}
                  onToggle={() => handleDropdownToggle("wantLine")}
                  onSelect={(value) => handleDropdownSelect("wantLine", value)}
                />

                <Dropdown
                  label="원하는 듀오의 티어"
                  required
                  value={form.wantTier}
                  placeholder="티어 선택"
                  options={TIER_OPTIONS}
                  isOpen={openDropdown === "wantTier"}
                  onToggle={() => handleDropdownToggle("wantTier")}
                  onSelect={(value) => handleDropdownSelect("wantTier", value)}
                />
              </div>

              <button
                type="submit"
                className={`create-duo-modal-submit ${!isValid ? "disabled" : ""}`}
                disabled={!isValid}
              >
                {mode === "edit" ? "수정하기" : "등록하기"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="create-duo-modal-confirm-blue">
        <Modal
          isModal={submitConfirmModal.isModal}
          closeModal={handleCloseConfirmModal}
          activeModal={submitConfirmModal.activeModal}
          title={mode === "edit" ? "듀오 수정" : "듀오 등록"}
          content={
            mode === "edit"
              ? `듀오 정보를 수정하시겠습니까?`
              : `새로운 듀오 신청을 등록하시겠습니까?`
          }
          type="two"
        />
      </div>
    </>
  );
}

export default CreateDuoModal;
