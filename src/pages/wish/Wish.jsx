import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LectureItem from "../../components/lecture/LectureItem";
import "./Wish.css";
import filledHeartTitle from "../../assets/like_filled_badge.png";
import {
  getWishLecturesByUid,
  removeWishByUid,
} from "../../service/WishService";

function Wish() {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getLevelLabel = (value) => levelLabelMap[value] || value;
  const getLineLabel = (value) => lineLabelMap[value] || value;

  useEffect(() => {
    const fetchWishLectures = async () => {
      try {
        setIsLoading(true);

        // 🔥 나중에 로그인 유저 uid로 교체
        const uid = 1;

        const data = await getWishLecturesByUid(uid);

        const formatted = data.map((lecture) => ({
          docId: lecture.docId,
          lectureId: lecture.docId,
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
          isLiked: true,
        }));

        setLectures(formatted);
      } catch (error) {
        console.error("찜 강의 불러오기 오류", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishLectures();
  }, []);

  const handleRemoveWish = async (lectureId) => {
    try {
      // 🔥 나중에 로그인 유저 uid로 교체
      const uid = 1;

      const targetLecture = lectures.find(
        (lecture) => lecture.docId === lectureId,
      );

      if (!targetLecture) return;

      await removeWishByUid(uid, targetLecture);

      setLectures((prev) =>
        prev.filter((lecture) => lecture.docId !== targetLecture.docId),
      );
    } catch (error) {
      console.error("찜 삭제 오류", error);
      alert("찜 삭제 실패");
    }
  };

  if (isLoading) {
    return (
      <section className="wish-page">
        <div className="wish-inner">
          <div className="wish-title-row">
            <img
              src={filledHeartTitle}
              alt="찜한 강의"
              className="wish-title-heart-image"
            />
            <h1 className="wish-title">찜한 강의</h1>
          </div>

          <p className="wish-description">
            마음에 드는 강의를 저장하고 언제든 다시 확인하세요
          </p>

          <div className="wish-count-box">
            <p className="wish-count-text">불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wish-page">
      <div className="wish-inner">
        <div className="wish-title-row">
          <img
            src={filledHeartTitle}
            alt="찜한 강의"
            className="wish-title-heart-image"
          />
          <h1 className="wish-title">찜한 강의</h1>
        </div>

        <p className="wish-description">
          마음에 드는 강의를 저장하고 언제든 다시 확인하세요
        </p>

        <div className="wish-count-box">
          <p className="wish-count-text">
            <span className="wish-count-number">{lectures.length}</span>개의
            강의를 찜했습니다
          </p>
        </div>

        {lectures.length > 0 ? (
          <>
            <div className="wish-grid">
              {lectures.map((lecture) => (
                <LectureItem
                  key={lecture.docId}
                  lecture={{
                    ...lecture,
                    line: getLineLabel(lecture.line),
                    level: getLevelLabel(lecture.level),
                    rating: lecture.star?.average || 0,
                    reviewCount: lecture.total || 0,
                  }}
                  cardType="wish"
                  onRemoveWish={handleRemoveWish}
                />
              ))}
            </div>

            <div className="wish-more-button-wrap">
              <button
                type="button"
                className="wish-more-button"
                onClick={() => navigate("/lecture-list")}
              >
                더 많은 강의 둘러보기
              </button>
            </div>
          </>
        ) : (
          <div className="wish-empty-box">
            <p className="wish-empty-text">찜한 강의가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Wish;
