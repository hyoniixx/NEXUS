import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LectureList.css";
import LectureItem from "../../components/lecture/LectureItem";
import champions from "../../data/champions";
import proBadge from "../../assets/probadge.png";
import strmBadge from "../../assets/strmbadge.png";
import { getLectures } from "../../service/LectureService";
import {
  getWishLecturesByUid,
  toggleWishByUid,
} from "../../service/WishService";
import { userContext } from "../../App";

function LectureList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [level, setLevel] = useState("all");
  const [championType, setChampionType] = useState("all");
  const [line, setLine] = useState("all");
  const [badgeFilter, setBadgeFilter] = useState("all");

  const [isChampionOpen, setIsChampionOpen] = useState(false);
  const [championKeyword, setChampionKeyword] = useState("");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isLineOpen, setIsLineOpen] = useState(false);

  const championDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const levelDropdownRef = useRef(null);
  const lineDropdownRef = useRef(null);
  const [lectures, setLectures] = useState([]);

  const { userData, dispatch } = useContext(userContext);


  const convertLevel = (level) => {
    if (level === "BEGINNER") return "초급";
    if (level === "INTERMEDIATE") return "중급";
    if (level === "ADVANCED") return "심화";
    if (level === "초급" || level === "중급" || level === "심화") return level;
    return level || "";
  };

  const convertLine = (line) => {
    if (line === "TOP") return "탑";
    if (line === "JUNGLE") return "정글";
    if (line === "MID") return "미드";
    if (line === "ADC") return "원딜";
    if (line === "SUPPORT") return "서폿";
    if (
      line === "탑" ||
      line === "정글" ||
      line === "미드" ||
      line === "원딜" ||
      line === "서폿"
    ) {
      return line;
    }
    return line || "";
  };

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "star", label: "평점 높은 순" },
    { value: "price", label: "저렴한 순" },
  ];

  const levelOptions = [
    { value: "all", label: "난이도" },
    { value: "초급", label: "초급" },
    { value: "중급", label: "중급" },
    { value: "심화", label: "심화" },
  ];

  const lineOptions = [
    { value: "all", label: "라인 선택" },
    { value: "탑", label: "탑" },
    { value: "정글", label: "정글" },
    { value: "미드", label: "미드" },
    { value: "원딜", label: "원딜" },
    { value: "서폿", label: "서폿" },
  ];

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sort)?.label || "최신순";
  const selectedLevelLabel =
    levelOptions.find((option) => option.value === level)?.label || "난이도";
  const selectedLineLabel =
    lineOptions.find((option) => option.value === line)?.label || "라인 선택";

  useEffect(() => {
    const fetchLectures = async () => {
      // 1. userData가 로드될 때까지 대기
      if (!userData || !userData.uid) {
        return;
      }

      try {
        const uid = userData.uid;
        const [data, wishLectures] = await Promise.all([
          getLectures(),
          getWishLecturesByUid(uid),
        ]);

        // 2. [중요] wishLectures가 객체 배열이든 ID 배열이든 대응할 수 있도록 처리
        // DB의 'wish' 배열에 담긴 문자열과 정확히 비교하기 위해 docId만 추출합니다.
        const wishDocIds = new Set(
          wishLectures.map((lecture) =>
            typeof lecture === "string" ? lecture : (lecture.docId || lecture.id)
          )
        );

        const formatted = data.map((lecture) => {
          // 3. 현재 강의의 고유 ID 추출 (DB의 wish 배열에 있는 값과 일치해야 함)
          const currentId = lecture.docId || lecture.id || lecture.lectureId || "";

          return {
            ...lecture,
            docId: currentId,
            lectureId: currentId,
            uid: lecture.uid ?? null,
            title: lecture.title || "",
            price: Number(lecture.price) || 0,
            createdAt: lecture.createdAt || null,
            instructorName: lecture.instructorName || "강사",
            badgeType: lecture.badgeType || "PRO",
            line: convertLine(lecture.line),
            level: convertLevel(lecture.level),
            champion: Array.isArray(lecture.champion)
              ? lecture.champion
              : lecture.champion ? [lecture.champion] : [],
            star: lecture.star?.average || 0,
            total: lecture.total || 0,
            time: lecture.time ?? null,

            // 4. [핵심] DB wish 배열에 현재 강의 ID가 포함되어 있는지 확인
            isLiked: wishDocIds.has(currentId),
          };
        });

        setLectures(formatted);
      } catch (err) {
        console.error("강의 불러오기 오류", err);
      }
    };

    fetchLectures();
    // 5. [중요] userData가 업데이트될 때마다(로그인 완료 시 등) 다시 실행되도록 설정
  }, [userData?.uid]);

  const handleToggleLike = async (docId) => {
    try {
      const uid = userData.uid;
      const targetLecture = lectures.find((lecture) => lecture.docId === docId);

      if (!targetLecture) return;

      const nextLiked = await toggleWishByUid(
        uid,
        docId,
        targetLecture.isLiked,
      );

      setLectures((prev) =>
        prev.map((lecture) =>
          lecture.docId === docId
            ? { ...lecture, isLiked: nextLiked }
            : lecture,
        ),
      );
    } catch (error) {
      console.error("찜 토글 오류", error);
      alert("찜 처리에 실패했습니다.");
    }
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

      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target)
      ) {
        setIsSortOpen(false);
      }

      if (
        levelDropdownRef.current &&
        !levelDropdownRef.current.contains(e.target)
      ) {
        setIsLevelOpen(false);
      }

      if (
        lineDropdownRef.current &&
        !lineDropdownRef.current.contains(e.target)
      ) {
        setIsLineOpen(false);
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

      const matchesLevel = level === "all" || lecture.level === level;
      const matchesChampion =
        championType === "all" || lecture.champion.includes(championType);
      const matchesLine = line === "all" || lecture.line === line;
      const matchesBadge =
        badgeFilter === "all" || lecture.badgeType === badgeFilter;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesChampion &&
        matchesLine &&
        matchesBadge
      );
    })
    .sort((a, b) => {
      if (sort === "star") return b.star - a.star;
      if (sort === "price") return a.price - b.price;

      // latest면 createdAt 기준 정렬
      if (sort === "latest") {
        const aTime = a.createdAt?.seconds
          ? a.createdAt.seconds
          : a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;
        const bTime = b.createdAt?.seconds
          ? b.createdAt.seconds
          : b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;

        return bTime - aTime;
      }

      return 0;
    });

  const handleMoveLectureDetail = (docId) => {
    navigate(`/lecture/${docId}`);
  };

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
            <div className="lecture-list-custom-dropdown" ref={sortDropdownRef}>
              <button
                type="button"
                className="lecture-list-select lecture-list-sort lecture-list-custom-button"
                onClick={() => {
                  setIsSortOpen((prev) => !prev);
                  setIsLevelOpen(false);
                  setIsLineOpen(false);
                  setIsChampionOpen(false);
                }}
              >
                <span>{selectedSortLabel}</span>
                <span
                  className={`lecture-list-custom-arrow ${isSortOpen ? "open" : ""}`}
                >
                  ▼
                </span>
              </button>

              {isSortOpen && (
                <div className="lecture-list-custom-menu">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`lecture-list-custom-option ${sort === option.value ? "selected" : ""}`}
                      onClick={() => {
                        setSort(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="lecture-list-custom-dropdown"
              ref={levelDropdownRef}
            >
              <button
                type="button"
                className="lecture-list-select lecture-list-level lecture-list-custom-button"
                onClick={() => {
                  setIsLevelOpen((prev) => !prev);
                  setIsSortOpen(false);
                  setIsLineOpen(false);
                  setIsChampionOpen(false);
                }}
              >
                <span>{selectedLevelLabel}</span>
                <span
                  className={`lecture-list-custom-arrow ${isLevelOpen ? "open" : ""}`}
                >
                  ▼
                </span>
              </button>

              {isLevelOpen && (
                <div className="lecture-list-custom-menu">
                  {levelOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`lecture-list-custom-option ${level === option.value ? "selected" : ""}`}
                      onClick={() => {
                        setLevel(option.value);
                        setIsLevelOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="lecture-list-champion-dropdown"
              ref={championDropdownRef}
            >
              <button
                type="button"
                className={`lecture-list-select lecture-list-champion-button ${isChampionOpen ? "open" : ""
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
                    className={`lecture-list-champion-option all ${championType === "all" ? "selected" : ""
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
                          className={`lecture-list-champion-option ${championType === champion ? "selected" : ""
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

            <div className="lecture-list-custom-dropdown" ref={lineDropdownRef}>
              <button
                type="button"
                className="lecture-list-select lecture-list-line lecture-list-custom-button"
                onClick={() => {
                  setIsLineOpen((prev) => !prev);
                  setIsSortOpen(false);
                  setIsLevelOpen(false);
                  setIsChampionOpen(false);
                }}
              >
                <span>{selectedLineLabel}</span>
                <span
                  className={`lecture-list-custom-arrow ${isLineOpen ? "open" : ""}`}
                >
                  ▼
                </span>
              </button>

              {isLineOpen && (
                <div className="lecture-list-custom-menu">
                  {lineOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`lecture-list-custom-option ${line === option.value ? "selected" : ""}`}
                      onClick={() => {
                        setLine(option.value);
                        setIsLineOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lecture-list-filter-right">
            <button
              type="button"
              className={`filter-button streamer ${badgeFilter === "STREAMER" ? "active" : ""
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
              className={`filter-button pro ${badgeFilter === "PRO" ? "active" : ""
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
            <div
              key={lecture.docId}
              onClick={() => handleMoveLectureDetail(lecture.docId)}
              style={{ cursor: "pointer" }}
            >
              <LectureItem
                lecture={{
                  ...lecture,
                  rating: lecture.star,
                  reviewCount: lecture.total,
                }}
                onToggleLike={handleToggleLike}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LectureList;
