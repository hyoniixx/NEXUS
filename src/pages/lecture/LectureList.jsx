import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LectureList.css";
import LectureItem from "../../components/lecture/LectureItem";
import champions from "../../data/champions";
import proBadge from "../../assets/probadge.png";
import strmBadge from "../../assets/strmbadge.png";

function LectureList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [level, setLevel] = useState("all");
  const [championType, setChampionType] = useState("all");
  const [line, setLine] = useState("all");
  const [badgeFilter, setBadgeFilter] = useState("all");

  const [isChampionOpen, setIsChampionOpen] = useState(false);
  const [championKeyword, setChampionKeyword] = useState("");

  const championDropdownRef = useRef(null);

  const [lectures, setLectures] = useState([
    {
      id: 1,
      instructorName: "Faker",
      badgeType: "PRO",
      title: "다이아 돌파를 위한 미드 라이너 마스터클래스",
      line: "미드",
      level: "심화",
      champion: "야스오",
      rating: 4.9,
      reviewCount: 127,
      price: 50000,
      isLiked: false,
    },
    {
      id: 2,
      instructorName: "Canyon",
      badgeType: "STREAMER",
      title: "정글 캐리의 정석 - 초보자 환영",
      line: "정글",
      level: "초급",
      champion: "리 신",
      rating: 4.8,
      reviewCount: 89,
      price: 35000,
      isLiked: true,
    },
    {
      id: 3,
      instructorName: "Zeus",
      badgeType: "PRO",
      title: "탑 라인 1:1 압살 테크닉",
      line: "탑",
      level: "중급",
      champion: "제이스",
      rating: 4.7,
      reviewCount: 64,
      price: 45000,
      isLiked: false,
    },
    {
      id: 4,
      instructorName: "Gumayusi",
      badgeType: "STREAMER",
      title: "원딜 포지셔닝 완전 정복",
      line: "원딜",
      level: "심화",
      champion: "이즈리얼",
      rating: 4.9,
      reviewCount: 102,
      price: 55000,
      isLiked: false,
    },
    {
      id: 5,
      instructorName: "Keria",
      badgeType: "PRO",
      title: "서폿 시야 장악과 한타 설계",
      line: "서폿",
      level: "중급",
      champion: "쓰레쉬",
      rating: 4.8,
      reviewCount: 91,
      price: 42000,
      isLiked: false,
    },
    {
      id: 6,
      instructorName: "Chovy",
      badgeType: "PRO",
      title: "라인전 우위 잡는 미드 운영법",
      line: "미드",
      level: "중급",
      champion: "아리",
      rating: 4.9,
      reviewCount: 110,
      price: 48000,
      isLiked: false,
    },
    {
      id: 7,
      instructorName: "Deft",
      badgeType: "STREAMER",
      title: "원딜 기본기 완성",
      line: "원딜",
      level: "초급",
      champion: "케이틀린",
      rating: 4.7,
      reviewCount: 80,
      price: 30000,
      isLiked: false,
    },
    {
      id: 8,
      instructorName: "Bdd",
      badgeType: "PRO",
      title: "미드 컨트롤 완벽 정리",
      line: "미드",
      level: "심화",
      champion: "아지르",
      rating: 4.8,
      reviewCount: 76,
      price: 47000,
      isLiked: false,
    },
    {
      id: 9,
      instructorName: "Peanut",
      badgeType: "STREAMER",
      title: "정글 동선 완벽 이해",
      line: "정글",
      level: "중급",
      champion: "세주아니",
      rating: 4.7,
      reviewCount: 68,
      price: 38000,
      isLiked: false,
    },
  ]);

  const handleToggleLike = (lectureId) => {
    setLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId
          ? { ...lecture, isLiked: !lecture.isLiked }
          : lecture,
      ),
    );
  };

  const handleBadgeFilterClick = (type) => {
    setBadgeFilter((prev) => (prev === type ? "all" : type));
  };

  const filteredChampionList = useMemo(() => {
    const keyword = championKeyword.trim().toLowerCase();

    if (!keyword) return champions;

    return champions.filter((champion) =>
      champion.toLowerCase().includes(keyword),
    );
  }, [championKeyword]);

  const handleChampionSelect = (champion) => {
    setChampionType(champion);
    setChampionKeyword("");
    setIsChampionOpen(false);
  };

  const handleChampionReset = () => {
    setChampionType("all");
    setChampionKeyword("");
    setIsChampionOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        championDropdownRef.current &&
        !championDropdownRef.current.contains(e.target)
      ) {
        setIsChampionOpen(false);
        setChampionKeyword("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredLectures = lectures
    .filter((lecture) => {
      const keyword = search.trim().toLowerCase();

      const matchesSearch =
        keyword === "" ||
        lecture.title.toLowerCase().includes(keyword) ||
        lecture.instructorName.toLowerCase().includes(keyword);

      const matchesLevel = level === "all" ? true : lecture.level === level;
      const matchesChampion =
        championType === "all" ? true : lecture.champion === championType;
      const matchesLine = line === "all" ? true : lecture.line === line;
      const matchesBadge =
        badgeFilter === "all" ? true : lecture.badgeType === badgeFilter;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesChampion &&
        matchesLine &&
        matchesBadge
      );
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return a.price - b.price;
      return a.id - b.id;
    });

  return (
    <section className="lecture-list-page">
      <div className="lecture-list-inner">
        <h1 className="lecture-list-title">강의 목록</h1>
        <p className="lecture-list-description">
          나에게 딱 맞는 강의를 찾아보세요
        </p>

        <input
          type="text"
          placeholder="강의 또는 강사 검색..."
          className="lecture-list-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="lecture-list-filter-row">
          <div className="lecture-list-filter-left">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="lecture-list-select lecture-list-sort"
            >
              <option value="latest">최신순</option>
              <option value="rating">평점 높은 순</option>
              <option value="price">저렴한 순</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="lecture-list-select lecture-list-level"
            >
              <option value="all">난이도</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="심화">심화</option>
            </select>

            <div
              className="lecture-list-champion-dropdown"
              ref={championDropdownRef}
            >
              <button
                type="button"
                className={`lecture-list-select lecture-list-champion-button ${
                  isChampionOpen ? "open" : ""
                }`}
                onClick={() => setIsChampionOpen((prev) => !prev)}
              >
                <span>
                  {championType === "all" ? "챔피언 선택" : championType}
                </span>
                <span className="lecture-list-champion-arrow">▼</span>
              </button>

              {isChampionOpen && (
                <div className="lecture-list-champion-menu">
                  <input
                    type="text"
                    placeholder="챔피언 검색"
                    className="lecture-list-champion-search"
                    value={championKeyword}
                    onChange={(e) => setChampionKeyword(e.target.value)}
                  />

                  <button
                    type="button"
                    className={`lecture-list-champion-option all ${
                      championType === "all" ? "selected" : ""
                    }`}
                    onClick={handleChampionReset}
                  >
                    전체 보기
                  </button>

                  <div className="lecture-list-champion-options">
                    {filteredChampionList.length > 0 ? (
                      filteredChampionList.map((champion) => (
                        <button
                          type="button"
                          key={champion}
                          className={`lecture-list-champion-option ${
                            championType === champion ? "selected" : ""
                          }`}
                          onClick={() => handleChampionSelect(champion)}
                        >
                          {champion}
                        </button>
                      ))
                    ) : (
                      <div className="lecture-list-champion-empty">
                        검색 결과가 없습니다
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <select
              value={line}
              onChange={(e) => setLine(e.target.value)}
              className="lecture-list-select lecture-list-line"
            >
              <option value="all">라인 선택</option>
              <option value="탑">탑</option>
              <option value="정글">정글</option>
              <option value="미드">미드</option>
              <option value="원딜">원딜</option>
              <option value="서폿">서폿</option>
            </select>
          </div>

          <div className="lecture-list-filter-right">
            <button
              type="button"
              className={`filter-button streamer ${
                badgeFilter === "STREAMER" ? "active" : ""
              }`}
              onClick={() => handleBadgeFilterClick("STREAMER")}
            >
              <img
                src={strmBadge}
                alt="스트리머"
                className="filter-button-icon"
              />
              <span>스트리머</span>
            </button>

            <button
              type="button"
              className={`filter-button pro ${
                badgeFilter === "PRO" ? "active" : ""
              }`}
              onClick={() => handleBadgeFilterClick("PRO")}
            >
              <img src={proBadge} alt="프로" className="filter-button-icon" />
              <span>프로</span>
            </button>
          </div>
        </div>

        <div className="lecture-list-grid">
          {filteredLectures.map((lecture) => (
            <LectureItem
              key={lecture.id}
              lecture={lecture}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LectureList;
