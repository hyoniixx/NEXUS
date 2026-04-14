import React from "react";
import { useNavigate } from "react-router-dom";
import msgIcon from "../../assets/msgicon.png";
import "./StudentItem.css";

function StudentItem({ student }) {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    if (status === "수강 전") return "before";
    if (status === "수강 중") return "ing";
    return "done";
  };

  return (
    <div className="student-card">
      <div className="student-left">
        <div className="student-avatar">{student.name[0]}</div>

        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>

          <p className="student-lecture">수강 강의: {student.lecture}</p>

          <div className="student-meta">
            <span
              className={`student-status ${getStatusClass(student.status)}`}
            >
              {student.status}
            </span>

            <span className="student-date">등록일: {student.date}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="student-chat-btn"
        onClick={() => navigate("/chat")}
      >
        <img src={msgIcon} alt="채팅" className="student-chat-icon" />
        <span>채팅하기</span>
      </button>
    </div>
  );
}

export default StudentItem;
