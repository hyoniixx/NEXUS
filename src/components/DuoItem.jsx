import React from "react";
import duoTrashIcon from "../assets/duotrash.png";
import "./DuoItem.css";

function formatCreatedAt(createdAt) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}월 ${day}일 ${hours}:${minutes}`;
}

function DuoItem({ duo, mode = "default", onDelete }) {
  const handleApplyClick = () => {
    console.log(`${duo.nickname} 듀오 신청 클릭`);
  };

  return (
    <div className="duo-item-card">
      {mode === "admin" ? (
        <button
          type="button"
          className="duo-item-trash-btn"
          onClick={onDelete}
          aria-label="듀오 삭제"
        >
          <img src={duoTrashIcon} alt="삭제" className="duo-item-trash-icon" />
        </button>
      ) : (
        <button
          type="button"
          className="duo-item-apply-btn"
          onClick={handleApplyClick}
        >
          <span>듀오 신청</span>
        </button>
      )}

      <div className="duo-item-header">
        <div className="duo-item-profile">
          <div className="duo-item-avatar">
            {duo.nickname?.charAt(0) || "?"}
          </div>

          <div className="duo-item-user-info">
            <div className="duo-item-name">{duo.nickname}</div>
            <div className="duo-item-tag">{duo.gameTag}</div>
          </div>
        </div>
      </div>

      <div className="duo-item-info-wrap">
        <div className="duo-item-info-col">
          <div className="duo-item-label">내 정보</div>
          <div className="duo-item-badge-row">
            <div className="duo-item-line-badge">{duo.myLine}</div>
            <div className="duo-item-tier-badge">{duo.myTier}</div>
          </div>
        </div>

        <div className="duo-item-info-col">
          <div className="duo-item-label">원하는 듀오</div>
          <div className="duo-item-badge-row">
            <div className="duo-item-want-line-badge">{duo.wantLine}</div>
            <div className="duo-item-want-tier-badge">{duo.wantTier}</div>
          </div>
        </div>
      </div>

      <div className="duo-item-bottom">
        <div className="duo-item-intro">{duo.intro}</div>
        <div className="duo-item-date">{formatCreatedAt(duo.createdAt)}</div>
      </div>
    </div>
  );
}

export default DuoItem;
