import React, { useMemo, useState } from "react";
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
const WANT_TIER_OPTIONS = [
  "아이언+",
  "브론즈+",
  "실버+",
  "골드+",
  "플래티넘+",
  "에메랄드+",
  "다이아+",
  "마스터+",
  "그랜드마스터+",
  "챌린저+",
];

function CreateDuoModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    nickname: "",
    gameTag: "",
    intro: "",
    myLine: "",
    myTier: "",
    wantLine: "",
    wantTier: "",
  });

  const [openDropdown, setOpenDropdown] = useState("");

  const isValid = useMemo(() => {
    return (
      formData.nickname.trim() &&
      formData.gameTag.trim() &&
      formData.intro.trim() &&
      formData.myLine.trim() &&
      formData.myTier.trim() &&
      formData.wantLine.trim() &&
      formData.wantTier.trim()
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "intro") {
      setFormData((prev) => ({
        ...prev,
        intro: value.slice(0, 45),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpenDropdown("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onCreate({
      ...formData,
      intro: formData.intro.slice(0, 45),
    });
  };

  return (
    <div className="create-duo-modal-overlay" onClick={onClose}>
      <div className="create-duo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-duo-modal-header">
          <h2 className="create-duo-modal-title">듀오 신청 등록</h2>
          <button
            type="button"
            className="create-duo-modal-close"
            onClick={onClose}
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
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임"
                className="create-duo-modal-input"
              />
            </div>

            <div className="create-duo-modal-group">
              <label className="create-duo-modal-label">
                게임 태그 <span>*</span>
              </label>
              <input
                type="text"
                name="gameTag"
                value={formData.gameTag}
                onChange={handleChange}
                placeholder="#KR1"
                className="create-duo-modal-input"
              />
            </div>
          </div>

          <div className="create-duo-modal-group">
            <label className="create-duo-modal-label">
              한 줄 소개 <span>*</span>
            </label>
            <input
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              maxLength={24}
              placeholder="간단한 자기소개를 입력하세요"
              className="create-duo-modal-input"
            />
            <div className="create-duo-modal-count">
              {formData.intro.length}/25
            </div>
          </div>

          <div className="create-duo-modal-row">
            <div className="create-duo-modal-group create-duo-modal-dropdown-group">
              <label className="create-duo-modal-label">
                내 라인 <span>*</span>
              </label>
              <button
                type="button"
                className="create-duo-modal-dropdown"
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "myLine" ? "" : "myLine"))
                }
              >
                <span>{formData.myLine || "라인 선택"}</span>
                <span className="create-duo-modal-arrow">▾</span>
              </button>

              {openDropdown === "myLine" && (
                <div className="create-duo-modal-menu">
                  {LINE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`create-duo-modal-menu-item ${
                        formData.myLine === option ? "active" : ""
                      }`}
                      onClick={() => handleSelect("myLine", option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="create-duo-modal-group create-duo-modal-dropdown-group">
              <label className="create-duo-modal-label">
                내 티어 <span>*</span>
              </label>
              <button
                type="button"
                className="create-duo-modal-dropdown"
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "myTier" ? "" : "myTier"))
                }
              >
                <span>{formData.myTier || "티어 선택"}</span>
                <span className="create-duo-modal-arrow">▾</span>
              </button>

              {openDropdown === "myTier" && (
                <div className="create-duo-modal-menu">
                  {TIER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`create-duo-modal-menu-item ${
                        formData.myTier === option ? "active" : ""
                      }`}
                      onClick={() => handleSelect("myTier", option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="create-duo-modal-row">
            <div className="create-duo-modal-group create-duo-modal-dropdown-group">
              <label className="create-duo-modal-label">
                원하는 듀오의 라인 <span>*</span>
              </label>
              <button
                type="button"
                className="create-duo-modal-dropdown"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "wantLine" ? "" : "wantLine",
                  )
                }
              >
                <span>{formData.wantLine || "라인 선택"}</span>
                <span className="create-duo-modal-arrow">▾</span>
              </button>

              {openDropdown === "wantLine" && (
                <div className="create-duo-modal-menu">
                  {LINE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`create-duo-modal-menu-item ${
                        formData.wantLine === option ? "active" : ""
                      }`}
                      onClick={() => handleSelect("wantLine", option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="create-duo-modal-group create-duo-modal-dropdown-group">
              <label className="create-duo-modal-label">
                원하는 듀오의 티어 <span>*</span>
              </label>
              <button
                type="button"
                className="create-duo-modal-dropdown"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "wantTier" ? "" : "wantTier",
                  )
                }
              >
                <span>{formData.wantTier || "티어 선택"}</span>
                <span className="create-duo-modal-arrow">▾</span>
              </button>

              {openDropdown === "wantTier" && (
                <div className="create-duo-modal-menu">
                  {WANT_TIER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`create-duo-modal-menu-item ${
                        formData.wantTier === option ? "active" : ""
                      }`}
                      onClick={() => handleSelect("wantTier", option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`create-duo-modal-submit ${!isValid ? "disabled" : ""}`}
            disabled={!isValid}
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDuoModal;
