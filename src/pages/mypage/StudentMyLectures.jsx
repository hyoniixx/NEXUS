import React, { useState } from "react";
import "./StudentMyLectures.css";
import LectureItem from "../../components/lecture/LectureItem";

function StudentMyLectures() {
  const [filter, setFilter] = useState("all");

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
      reviewStatus: "done",
    },
    {
      id: 2,
      instructorName: "Faker",
      badgeType: "PRO",
      title: "다이아 돌파를 위한 미드 라이너 마스터클래스",
      line: "미드",
      level: "심화",
      rating: 4.9,
      reviewCount: 127,
      price: 50000,
      reviewStatus: "done",
    },
    {
      id: 3,
      instructorName: "Faker",
      badgeType: "PRO",
      title: "다이아 돌파를 위한 미드 라이너 마스터클래스",
      line: "미드",
      level: "심화",
      rating: 4.9,
      reviewCount: 127,
      price: 50000,
      reviewStatus: "done",
    },
    {
      id: 4,
      instructorName: "Keria",
      badgeType: "STREAMER",
      title: "서포터 캐리 - 로밍과 비전의 모든 것",
      line: "서폿",
      level: "심화",
      rating: 5.0,
      reviewCount: 201,
      price: 40000,
      reviewStatus: "pending",
    },
  ];

  const filteredLectures =
    filter === "all"
      ? lectures
      : lectures.filter((lecture) => lecture.reviewStatus === filter);

  const doneCount = lectures.filter(
    (lecture) => lecture.reviewStatus === "done",
  ).length;

  return (
    <section className="student-my-lectures-page">
      <div className="student-my-lectures-inner">
        <h1 className="student-my-lectures-title">내 신청 강의</h1>
        <p className="student-my-lectures-description">
          신청한 강의를 확인하고 관리하세요
        </p>

        <div className="student-my-lectures-filter-row">
          <select
            className="student-my-lectures-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="done">후기 작성 완료</option>
            <option value="pending">후기 미작성</option>
          </select>

          <div className="student-my-lectures-count">
            <span>전체 {lectures.length}개</span>
            <span className="student-my-lectures-divider">|</span>
            <span>후기 작성 {doneCount}개</span>
          </div>
        </div>

        <div className="student-my-lectures-grid">
          {filteredLectures.map((lecture) => (
            <LectureItem
              key={lecture.id}
              lecture={lecture}
              cardType="myLecture"
              onChatClick={(id) => console.log("채팅 이동", id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentMyLectures;
