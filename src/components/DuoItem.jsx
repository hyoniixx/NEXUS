import React from "react";
import duoTrashIcon from "../assets/duotrash.png";
import modifyIcon from "../assets/modify.png";
import msgIcon from "../assets/msgicon.png";
import "./DuoItem.css";

function formatCreatedAt(createdAt) {
  if (!createdAt) return "";

  const date =
    typeof createdAt?.toDate === "function"
      ? createdAt.toDate()
      : new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}월 ${day}일 ${hours}:${minutes}`;
}

function DuoItem({ duo, mode = "default", onDelete, onEdit, onChat, onApply }) {
  if (!duo) return null;

  const duoId = duo.docId || duo.duoId || duo.id || "";
  const nickname = duo.writer?.userName || duo.nickname || "";
  const gameName = duo.writer?.gameName || duo.gameName || "";
  const gameTagValue = duo.writer?.gameTag || duo.gameTag || "";
  const gameTag = `${gameName}${gameTagValue}`;
  const myLine = duo.writer?.line || duo.myLine || "";
  const myTier = duo.writer?.tier || duo.myTier || "";
  const wantLine = duo.wishDuo?.line || duo.wantLine || "";
  const wantTier = duo.wishDuo?.tier || duo.wantTier || "";
  const intro = duo.content || duo.intro || "";
  const createdAt = duo.createdAt || "";

  const handleApplyClick = () => {
    if (onApply) {
      onApply(duo);
      return;
    }
    console.log(`${nickname} 듀오 신청 클릭`);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(duo);
      return;
    }
    console.log(`${nickname} 듀오 삭제 클릭`);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(duo);
      return;
    }
    console.log(`${nickname} 듀오 수정 클릭`);
  };

  const handleChatClick = () => {
    if (onChat) {
      onChat(duo);
      return;
    }
    console.log(`${nickname} 채팅 클릭`);
  };

  const renderActionButtons = () => {
    if (mode === "admin") {
      return (
        <button
          type="button"
          className="duo-item-trash-btn"
          onClick={handleDeleteClick}
          aria-label="듀오 삭제"
        >
          <img src={duoTrashIcon} alt="삭제" className="duo-item-trash-icon" />
        </button>
      );
    }

    if (mode === "my") {
      return (
        <div className="duo-item-action-group">
          <button
            type="button"
            className="duo-item-icon-btn"
            onClick={handleEditClick}
            aria-label="수정"
          >
            <img src={modifyIcon} alt="수정" className="duo-item-action-icon" />
          </button>

          <button
            type="button"
            className="duo-item-icon-btn"
            onClick={handleDeleteClick}
            aria-label="삭제"
          >
            <img
              src={duoTrashIcon}
              alt="삭제"
              className="duo-item-action-icon"
            />
          </button>

          <button
            type="button"
            className="duo-item-icon-btn"
            onClick={handleChatClick}
            aria-label="채팅"
          >
            <img src={msgIcon} alt="채팅" className="duo-item-action-icon" />
          </button>
        </div>
      );
    }

    if (mode === "pending") {
      return (
        <div className="duo-item-action-group">
          <button
            type="button"
            className="duo-item-icon-btn"
            onClick={handleChatClick}
            aria-label="채팅"
          >
            <img src={msgIcon} alt="채팅" className="duo-item-action-icon" />
          </button>
        </div>
      );
    }

    if (mode === "done") {
      return (
        <div className="duo-item-action-group">
          <button
            type="button"
            className="duo-item-icon-btn"
            onClick={handleDeleteClick}
            aria-label="삭제"
          >
            <img
              src={duoTrashIcon}
              alt="삭제"
              className="duo-item-action-icon"
            />
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        className="duo-item-apply-btn"
        onClick={handleApplyClick}
      >
        <span>듀오 신청</span>
      </button>
    );
  };

  return (
    <div className="duo-item-card" data-duo-id={duoId}>
      {renderActionButtons()}

      <div className="duo-item-header">
        <div className="duo-item-profile">
          <div className="duo-item-avatar">{nickname?.charAt(0) || "?"}</div>

          <div className="duo-item-user-info">
            <div className="duo-item-name">{nickname}</div>
            <div className="duo-item-tag">{gameTag}</div>
          </div>
        </div>
      </div>

      <div className="duo-item-info-wrap">
        <div className="duo-item-info-col">
          <div className="duo-item-label">내 정보</div>
          <div className="duo-item-badge-row">
            <div className="duo-item-line-badge">{myLine}</div>
            <div className="duo-item-tier-badge">{myTier}</div>
          </div>
        </div>

        <div className="duo-item-info-col">
          <div className="duo-item-label">원하는 듀오</div>
          <div className="duo-item-badge-row">
            <div className="duo-item-want-line-badge">{wantLine}</div>
            <div className="duo-item-want-tier-badge">{wantTier}</div>
          </div>
        </div>
      </div>

      <div className="duo-item-bottom">
        <div className="duo-item-intro">{intro}</div>
        <div className="duo-item-date">{formatCreatedAt(createdAt)}</div>
      </div>
    </div>
  );
}

export default DuoItem;
