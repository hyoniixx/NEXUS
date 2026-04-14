import React, { useMemo, useState } from "react";
import "./InstructorMyStudents.css";
import StudentItem from "../../components/mypage/StudentItem";

function InstructorMyStudents() {
  const [statusFilter, setStatusFilter] = useState("전체");
  const [sortFilter, setSortFilter] = useState("최신순");

  const students = [
    {
      id: 1,
      name: "박민수",
      lecture: "초보자를 위한 미드 라인 강의",
      status: "수강 전",
      date: "2026. 4. 7.",
    },
    {
      id: 2,
      name: "정수진",
      lecture: "정글 캐리력 향상 프로그램",
      status: "수강 중",
      date: "2026. 4. 6.",
    },
    {
      id: 3,
      name: "김철수",
      lecture: "초보자를 위한 미드 라인 강의",
      status: "수강 중",
      date: "2026. 4. 5.",
    },
    {
      id: 4,
      name: "이영희",
      lecture: "다이아 탈출 원딜 마스터",
      status: "수강 완료",
      date: "2026. 4. 3.",
    },
  ];

  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (statusFilter !== "전체") {
      result = result.filter((student) => student.status === statusFilter);
    }

    if (sortFilter === "오래된 순") {
      result = [...result].reverse();
    }

    return result;
  }, [statusFilter, sortFilter]);

  return (
    <section className="instructor-my-students-page">
      <div className="instructor-my-students-filter-row">
        <div className="instructor-my-students-filter-left">
          <select
            className="instructor-my-students-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="수강 전">수강 전</option>
            <option value="수강 중">수강 중</option>
            <option value="수강 완료">수강 완료</option>
          </select>

          <select
            className="instructor-my-students-select"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="오래된 순">오래된 순</option>
          </select>
        </div>

        <div className="instructor-my-students-count">
          전체 {filteredStudents.length}명
        </div>
      </div>

      <div className="instructor-my-students-list">
        {filteredStudents.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </div>
    </section>
  );
}

export default InstructorMyStudents;
