import React, { useContext, useEffect, useState } from "react";
import LectureItem from "../../components/lecture/LectureItem";
import "./InstructorMyLectures.css";
import { getLecturesByInstructorId } from "../../service/LectureService";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

function InstructorMyLectures() {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userData, dispatch } = useContext(userContext);

  const navigate = useNavigate();
  const levelLabelMap = {
    BEGINNER: "초급",
    INTERMEDIATE: "중급",
    ADVANCED: "심화",
  };

  const lineLabelMap = {
    TOP: "탑",
    JUNGLE: "정글",
    MID: "미드",
    ADC: "원딜",
    SUPPORT: "서폿",
  };

  const getLevelLabel = (value) => levelLabelMap[value] || value;
  const getLineLabel = (value) => lineLabelMap[value] || value;
  const handleMoveLectureDetail = (docId) => {
    navigate(`/lecture/${docId}`);
  };

  useEffect(() => {
    const fetchMyLectures = async () => {
      try {
        setIsLoading(true);

        // 🔥 나중에 로그인 유저 uid로 바꿔야 함
        const uid = userData.uid;

        const data = await getLecturesByInstructorId(uid);

        const formatted = data.map((lecture) => ({
          docId: lecture.docId,
          lectureId: lecture.lectureId ?? null,
          instructorId: lecture.uid ?? null,
          instructorName: lecture.instructorName || "강사",
          badgeType: lecture.badgeType || "PRO",
          title: lecture.title || "",
          line: lecture.line || "",
          level: lecture.level || "",
          champion: Array.isArray(lecture.champion)
            ? lecture.champion
            : lecture.champion
              ? [lecture.champion]
              : [],
          star: lecture.star || { average: 0 },
          total: lecture.total || 0,
          price: lecture.price || 0,
          isLiked: false,
        }));

        setLectures(formatted);
      } catch (error) {
        console.error("강사 강의 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyLectures();
  }, []);

  if (isLoading) {
    return (
      <div className="instructor-my-lectures-page">
        <p className="instructor-my-lectures-count">강의 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="instructor-my-lectures-page">
      <p className="instructor-my-lectures-count">
        전체 {lectures.length}개의 강의
      </p>

      <div className="instructor-my-lectures-grid">
        {lectures.map((lecture) => (
          <div
            key={lecture.docId}
            onClick={() => handleMoveLectureDetail(lecture.docId)}
            style={{ cursor: "pointer" }}
          >
            <LectureItem
              lecture={{
                ...lecture,
                line: getLineLabel(lecture.line),
                level: getLevelLabel(lecture.level),
                rating: lecture.star?.average || 0,
                reviewCount: lecture.total || 0,
              }}
              showLike={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorMyLectures;
