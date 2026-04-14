import React from "react";
import LectureItem from "../../components/lecture/LectureItem";
import "./InstructorMyLectures.css";

function InstructorMyLectures() {
  const lectures = [
    {
      id: 1,
      instructorName: "Faker",
      badgeType: "PRO",
      title: "다이아 돌파를 위한 미드 라이너 마스터클래스",
      line: "미드",
      level: "심화",
      rating: 4.9,
      reviewCount: 127,
      price: 50000,
      isLiked: false,
    },
    {
      id: 2,
      instructorName: "CanyonJC",
      badgeType: "STREAMER",
      title: "정글 캐리의 정석 - 초보자 환영",
      line: "정글",
      level: "초급",
      rating: 4.8,
      reviewCount: 89,
      price: 35000,
      isLiked: false,
    },
    {
      id: 3,
      instructorName: "Zeus",
      badgeType: "PRO",
      title: "탑 라인 1:1 압살 테크닉",
      line: "탑",
      level: "중급",
      rating: 4.7,
      reviewCount: 64,
      price: 45000,
      isLiked: false,
    },
  ];

  return (
    <div className="instructor-my-lectures-page">
      <p className="instructor-my-lectures-count">
        전체 {lectures.length}개의 강의
      </p>

      <div className="instructor-my-lectures-grid">
        {lectures.map((lecture) => (
          <LectureItem key={lecture.id} lecture={lecture} showLike={false} />
        ))}
      </div>
    </div>
  );
}

export default InstructorMyLectures;
