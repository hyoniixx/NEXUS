import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LectureItem from "../../components/lecture/LectureItem";
import "./Wish.css";
import filledHeartTitle from "../../assets/like_filled_badge.png";

function Wish() {
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([
    {
      id: 1,
      instructorName: "Faker",
      badgeType: "PRO",
      title: "초보자를 위한 미드 라인 기초",
      line: "미드",
      level: "초급",
      rating: 4.9,
      reviewCount: 245,
      price: 50000,
      isLiked: true,
    },
    {
      id: 2,
      instructorName: "CanyonJG",
      badgeType: "STREAMER",
      title: "정글 루트 최적화 마스터",
      line: "정글",
      level: "중급",
      rating: 4.8,
      reviewCount: 189,
      price: 45000,
      isLiked: true,
    },
    {
      id: 3,
      instructorName: "Zeus",
      badgeType: "PRO",
      title: "탑 라이너의 라인전 장악법",
      line: "탑",
      level: "고급",
      rating: 5,
      reviewCount: 312,
      price: 55000,
      isLiked: true,
    },
  ]);

  const handleRemoveWish = (id) => {
    setLectures((prev) => prev.filter((lecture) => lecture.id !== id));
  };

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
                  key={lecture.id}
                  lecture={lecture}
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
