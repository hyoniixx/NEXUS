import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./InstructorMyStudents.css";
import StudentItem from "../../components/mypage/StudentItem";
import { getEnrollment, getEnrollmentsByInstructorId } from "../../service/EnrollmentService";
import { userContext } from "../../App";

function InstructorMyStudents() {
  const [statusFilter, setStatusFilter] = useState("전체");
  const [sortFilter, setSortFilter] = useState("최신순");
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isSortFilterOpen, setIsSortFilterOpen] = useState(false);
  const statusFilterRef = useRef(null);
  const sortFilterRef = useRef(null);
  const { userData, dispatch } = useContext(userContext);


  const getLectureStatus = (item) => {
    if (item.hasReview) return "수강 완료";
    if (item.refundedAt) return "수강 완료";
    if (item.paymentStatus === "PAID") return "수강 중";
    return "수강 전";
  };

  const getTimeValue = (value) => {
    if (!value) return 0;

    if (typeof value?.toDate === "function") {
      return value.toDate().getTime();
    }

    return new Date(value).getTime() || 0;
  };

  const statusOptions = ["전체", "수강 전", "수강 중", "수강 완료"];
  const sortOptions = ["최신순", "오래된 순"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        statusFilterRef.current &&
        !statusFilterRef.current.contains(e.target)
      ) {
        setIsStatusFilterOpen(false);
      }

      if (sortFilterRef.current && !sortFilterRef.current.contains(e.target)) {
        setIsSortFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);

        // 🔥 나중에 로그인한 강사 uid로 교체
        const instructorId = userData.uid;

        const enrollData = await getEnrollment(instructorId)
        console.log(enrollData)
        setEnrollments(enrollData);
      } catch (error) {
        console.error("수강생 목록 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...enrollments];

    if (statusFilter !== "전체") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (sortFilter === "최신순") {
      result.sort(
        (a, b) => getTimeValue(b.enrolledAt) - getTimeValue(a.enrolledAt),
      );
    }

    if (sortFilter === "오래된 순") {
      result.sort(
        (a, b) => getTimeValue(a.enrolledAt) - getTimeValue(b.enrolledAt),
      );
    }

    return result;
  }, [enrollments, statusFilter, sortFilter]);

  if (isLoading) {
    return (
      <section className="instructor-my-students-page">
        <div className="instructor-my-students-filter-row">
          <div className="instructor-my-students-count">
            수강생 목록 불러오는 중...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="instructor-my-students-page">
      <div className="instructor-my-students-filter-row">
        <div className="instructor-my-students-filter-left">
          <div
            className="instructor-my-students-custom-filter"
            ref={statusFilterRef}
          >
            <button
              type="button"
              className="instructor-my-students-select"
              onClick={() => {
                setIsStatusFilterOpen((prev) => !prev);
                setIsSortFilterOpen(false);
              }}
            >
              <span>{statusFilter}</span>
              <span
                className={`instructor-my-students-filter-arrow ${isStatusFilterOpen ? "open" : ""
                  }`}
              >
                ▾
              </span>
            </button>

            {isStatusFilterOpen && (
              <div className="instructor-my-students-filter-menu">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`instructor-my-students-filter-item ${statusFilter === option ? "active" : ""
                      }`}
                    onClick={() => {
                      setStatusFilter(option);
                      setIsStatusFilterOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="instructor-my-students-custom-filter"
            ref={sortFilterRef}
          >
            <button
              type="button"
              className="instructor-my-students-select"
              onClick={() => {
                setIsSortFilterOpen((prev) => !prev);
                setIsStatusFilterOpen(false);
              }}
            >
              <span>{sortFilter}</span>
              <span
                className={`instructor-my-students-filter-arrow ${isSortFilterOpen ? "open" : ""
                  }`}
              >
                ▾
              </span>
            </button>

            {isSortFilterOpen && (
              <div className="instructor-my-students-filter-menu">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`instructor-my-students-filter-item ${sortFilter === option ? "active" : ""
                      }`}
                    onClick={() => {
                      setSortFilter(option);
                      setIsSortFilterOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="instructor-my-students-count">
          전체 {filteredStudents.length}명
        </div>
      </div>

      <div className="instructor-my-students-list">
        {filteredStudents.map((item) => (
          <StudentItem
            key={item.id}
            student={{
              name: item.studentName,
              lecture: item.lectureTitle,
              status: item.chatStatus,
              date: item.createdAt?.toDate().toLocaleString(),
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default InstructorMyStudents;
