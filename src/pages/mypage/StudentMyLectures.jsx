import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./StudentMyLectures.css";
import LectureItem from "../../components/lecture/LectureItem";
import { getEnrollmentsByStudentId } from "../../service/EnrollmentService";
import { getLectureById } from "../../service/LectureService";
import { getMyReviewsStudent } from "../../service/ReviewService";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

function StudentMyLectures() {
  const [filter, setFilter] = useState("all");
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  const { userData } = useContext(userContext);
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
    BOTTOM: "원딜",
    SUPPORT: "서폿",
  };

  const getLevelLabel = (value) => levelLabelMap[value] || value || "";
  const getLineLabel = (value) => lineLabelMap[value] || value || "";

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: "done", label: "후기 작성 완료" },
    { value: "pending", label: "후기 미작성" },
  ];

  const selectedFilterLabel =
    filterOptions.find((option) => option.value === filter)?.label || "전체";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(e.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMyLectures = async () => {
      if (!userData?.uid || !userData?.userName) {
        setLectures([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // 1. 내 수강 신청 목록 조회
        const enrollments = await getEnrollmentsByStudentId(userData.uid);

        if (!enrollments || enrollments.length === 0) {
          setLectures([]);
          return;
        }

        // 2. 내가 작성한 리뷰 목록 조회
        const myReviews = await getMyReviewsStudent(userData.userName);

        // lectureId 기준으로 빠르게 찾기 위한 Set
        const reviewedLectureIdSet = new Set(
          myReviews.map((reviewGroup) => String(reviewGroup.lectureId)),
        );

        // 3. 수강 신청 목록 기반으로 강의 상세 조회
        const lectureList = await Promise.all(
          enrollments.map(async (enrollment) => {
            const lecture = await getLectureById(enrollment.lectureId);

            if (!lecture) return null;

            const lectureId = String(lecture.docId);
            const hasReview = reviewedLectureIdSet.has(lectureId);

            return {
              ...lecture,
              enrollmentId: enrollment.docId,
              enrollmentCreatedAt: enrollment.createdAt ?? null,
              chatStatus: enrollment.chatStatus ?? "수강 전",
              lectureTitle: enrollment.lectureTitle ?? lecture.title ?? "",
              reviewStatus: hasReview ? "done" : "pending",
            };
          }),
        );

        // null 제거
        const validLectureList = lectureList.filter(Boolean);

        setLectures(validLectureList);
      } catch (error) {
        console.error("내 신청 강의 불러오기 오류", error);
        setLectures([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyLectures();
  }, [userData?.uid, userData?.userName]);

  const filteredLectures = useMemo(() => {
    if (filter === "all") return lectures;
    return lectures.filter((lecture) => lecture.reviewStatus === filter);
  }, [lectures, filter]);

  const doneCount = useMemo(() => {
    return lectures.filter((lecture) => lecture.reviewStatus === "done").length;
  }, [lectures]);

  const handleMoveLectureDetail = (docId) => {
    navigate(`/lecture/${docId}`);
  };

  if (isLoading) {
    return (
      <section className="student-my-lectures-page">
        <div className="student-my-lectures-inner">
          <h1 className="student-my-lectures-title">내 신청 강의</h1>
          <p className="student-my-lectures-description">
            신청한 강의를 확인하고 관리하세요
          </p>
          <div style={{ color: "#fff", paddingTop: "30px" }}>
            강의 정보를 불러오는 중입니다...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="student-my-lectures-page">
      <div className="student-my-lectures-inner">
        <h1 className="student-my-lectures-title">내 신청 강의</h1>
        <p className="student-my-lectures-description">
          신청한 강의를 확인하고 관리하세요
        </p>

        <div className="student-my-lectures-filter-row">
          <div
            className="student-my-lectures-custom-filter"
            ref={filterDropdownRef}
          >
            <button
              type="button"
              className="student-my-lectures-select"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <span>{selectedFilterLabel}</span>
              <span
                className={`student-my-lectures-filter-arrow ${isFilterOpen ? "open" : ""
                  }`}
              >
                ▾
              </span>
            </button>

            {isFilterOpen && (
              <div className="student-my-lectures-filter-menu">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`student-my-lectures-filter-item ${filter === option.value ? "active" : ""
                      }`}
                    onClick={() => {
                      setFilter(option.value);
                      setIsFilterOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="student-my-lectures-count">
            <span>전체 {lectures.length}개</span>
            <span className="student-my-lectures-divider">|</span>
            <span>후기 작성 {doneCount}개</span>
          </div>
        </div>

        <div className="student-my-lectures-grid">
          {filteredLectures.length > 0 ? (
            filteredLectures.map((lecture) => (
              <div
                key={lecture.enrollmentId || lecture.docId}
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
                  cardType="myLecture"
                  onChatClick={(e) => {
                    e.stopPropagation();
                    navigate("/chat", {
                      state: {
                        id: lecture.docId,
                        enrollmentId: lecture.enrollmentId,
                      },
                    });
                  }}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                color: "#94A3B8",
                fontSize: "18px",
                paddingTop: "40px",
              }}
            >
              표시할 강의가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudentMyLectures;
