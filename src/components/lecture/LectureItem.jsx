import React from "react";
import "./LectureItem.css";
import proBadge from "../../assets/probadge.png";
import strmBadge from "../../assets/strmbadge.png";
import likeEmpty from "../../assets/like_empty_badge.png";
import likeFilled from "../../assets/like_filled_badge.png";
import msgIcon from "../../assets/msgicon.png";

function LectureItem({
  lecture,
  cardType = "default",
  onToggleLike,
  onChatClick,
  onRemoveWish,
  showLike = true,
}) {
  if (!lecture) return null;

  const targetId = lecture.docId || lecture.lectureId;
  const ratingValue = lecture.star?.average ?? lecture.rating ?? 0;
  const reviewCountValue = lecture.total ?? lecture.reviewCount ?? 0;

  const badgeImage = lecture.badgeType === "PRO" ? proBadge : strmBadge;
  const avatarText = lecture.instructorName?.charAt(0).toUpperCase() || "N";

  const reviewStatusClass =
    lecture.reviewStatus === "done"
      ? "lecture-item-status-done"
      : "lecture-item-status-pending";

  const reviewStatusText =
    lecture.reviewStatus === "done" ? "후기 작성 완료" : "후기 미작성";

  const renderTopRightButton = () => {
    if (!showLike && cardType !== "myLecture") {
      return null;
    }

    if (cardType === "wish") {
      return (
        <button
          type="button"
          className="lecture-item-like-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveWish && onRemoveWish(targetId);
          }}
        >
          <img
            src={likeFilled}
            alt="찜 삭제"
            className="lecture-item-like-icon"
          />
        </button>
      );
    }

    if (cardType === "myLecture") {
      return (
        <button
          type="button"
          className="lecture-item-msg-btn"
          onClick={(e) => {
            e.stopPropagation();
            onChatClick && onChatClick(targetId);
          }}
        >
          <img src={msgIcon} alt="메시지" className="lecture-item-msg-icon" />
        </button>
      );
    }

    return (
      <button
        type="button"
        className="lecture-item-like-button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike && onToggleLike(targetId);
        }}
      >
        <img
          src={lecture.isLiked ? likeFilled : likeEmpty}
          alt="찜"
          className="lecture-item-like-icon"
        />
      </button>
    );
  };

  return (
    <article
      className={`lecture-item-card ${cardType === "myLecture"
        ? "lecture-item-card-my"
        : cardType === "wish"
          ? "lecture-item-card-wish"
          : ""
        }`}
    >
      <div className="lecture-item-header">
        <div className="lecture-item-instructor-box">
          <div className="lecture-item-avatar">{avatarText}</div>

          <div className="lecture-item-instructor-info">
            <span className="lecture-item-instructor-name">
              {lecture.instructor || lecture.instructorName}
            </span>

            <img
              src={badgeImage}
              alt="강사 뱃지"
              className="lecture-item-badge-img"
            />
          </div>
        </div>

        {renderTopRightButton()}
      </div>

      <h3 className="lecture-item-title">{lecture.title}</h3>

      <div className="lecture-item-tag-row">
        <span className="lecture-item-tag lecture-item-tag-line">
          {lecture.line}
        </span>

        <span className="lecture-item-tag lecture-item-tag-level">
          {lecture.level}
        </span>

        {cardType === "myLecture" && lecture.reviewStatus && (
          <span className={`lecture-item-tag ${reviewStatusClass}`}>
            {reviewStatusText}
          </span>
        )}
      </div>

      <div className="lecture-item-divider"></div>

      <div className="lecture-item-footer">
        <div className="lecture-item-rating-box">
          <span className="lecture-item-rating-star">☆</span>
          <span className="lecture-item-rating-score">{lecture.average}</span>
          <span className="lecture-item-rating-count">
            ({reviewCountValue})
          </span>
        </div>

        <p className="lecture-item-price">
          {typeof lecture.price === "number"
            ? `${lecture.price.toLocaleString()}원`
            : lecture.price}
        </p>
      </div>
    </article>
  );
}

export default LectureItem;
