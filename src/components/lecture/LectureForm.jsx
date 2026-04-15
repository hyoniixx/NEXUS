import React, { useMemo, useRef, useState } from "react";
import "./LectureForm.css";
import uploadIcon from "../../assets/upload.png";
import lectureIconWhite from "../../assets/lectureIconwhite.png";
import champions from "../../data/champions";

function LectureForm({ mode = "create", initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    line: initialValues?.line ?? "",
    level: initialValues?.level ?? "",
    lessonTime: initialValues?.lessonTime ?? "",
    price: initialValues?.price ?? "",
    image: initialValues?.image ?? null,
    champions: initialValues?.champions ?? [],
    curriculum:
      initialValues?.curriculum && initialValues.curriculum.length > 0
        ? initialValues.curriculum
        : [""],
  });

  const [isChampionOpen, setIsChampionOpen] = useState(false);
  const [championKeyword, setChampionKeyword] = useState("");
  const [isLineOpen, setIsLineOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const fileInputRef = useRef(null);
  const isEdit = mode === "edit";

  const lineOptions = ["탑", "정글", "미드", "원딜", "서폿"];
  const levelOptions = ["초급", "중급", "심화"];

  const filteredChampions = useMemo(() => {
    return champions.filter((champion) =>
      String(champion).toLowerCase().includes(championKeyword.toLowerCase()),
    );
  }, [championKeyword]);

  const closeAllDropdowns = () => {
    setIsChampionOpen(false);
    setIsLineOpen(false);
    setIsLevelOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({
        ...prev,
        image: files?.[0] || null,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setForm((prev) => ({
      ...prev,
      price: onlyNumber,
    }));
  };

  const handleCurriculumChange = (index, value) => {
    setForm((prev) => {
      const next = [...prev.curriculum];
      next[index] = value;
      return {
        ...prev,
        curriculum: next,
      };
    });
  };

  const handleAddCurriculum = () => {
    setForm((prev) => ({
      ...prev,
      curriculum: [...prev.curriculum, ""],
    }));
  };

  const handleRemoveCurriculum = (index) => {
    if (index === 0) return;

    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index),
    }));
  };

  const handleClickFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleSelectChampion = (champion) => {
    setForm((prev) => {
      if (prev.champions.includes(champion)) return prev;

      return {
        ...prev,
        champions: [...prev.champions, champion],
      };
    });
  };

  const handleRemoveChampion = (champion) => {
    setForm((prev) => ({
      ...prev,
      champions: prev.champions.filter((item) => item !== champion),
    }));
  };

  const handleSelectLine = (line) => {
    setForm((prev) => ({
      ...prev,
      line,
    }));
    setIsLineOpen(false);
  };

  const handleSelectLevel = (level) => {
    setForm((prev) => ({
      ...prev,
      level,
    }));
    setIsLevelOpen(false);
  };

  const isFormValid = () => {
    if (!form.title.trim()) return false;
    if (!form.description.trim()) return false;
    if (!form.line.trim()) return false;
    if (!form.level.trim()) return false;
    if (!form.lessonTime.trim()) return false;
    if (!form.price.trim()) return false;
    if (!form.image) return false;
    if (form.champions.length === 0) return false;
    if (form.curriculum.length === 0) return false;
    if (form.curriculum.some((item) => !item.trim())) return false;

    return true;
  };

  const isValid = isFormValid();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    await onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <section className="lecture-form-page" onClick={closeAllDropdowns}>
      <div
        className="lecture-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lecture-form-header">
          <div className="lecture-form-icon-box">
            <img
              src={lectureIconWhite}
              alt="강의 아이콘"
              className="lecture-form-icon-image"
            />
          </div>

          <h1 className="lecture-form-title">
            {isEdit ? "강의 수정" : "강의 등록"}
          </h1>

          <p className="lecture-form-subtitle">
            {isEdit ? "강의 정보를 수정하세요" : "새 강의를 등록하세요"}
          </p>
        </div>

        <form className="lecture-form" onSubmit={handleSubmit}>
          <div className="lecture-form-group">
            <label className="lecture-form-label">
              강의 제목 <span>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="예: 다이아 돌파를 위한 미드 라이너 마스터클래스"
              className="lecture-form-input"
              autoComplete="off"
            />
          </div>

          <div className="lecture-form-group">
            <label className="lecture-form-label">
              강의 소개 <span>*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="강의 내용을 자세히 설명해주세요..."
              className="lecture-form-textarea"
              autoComplete="off"
            />
          </div>

          <div className="lecture-form-row">
            <div className="lecture-form-group lecture-form-dropdown-group">
              <label className="lecture-form-label">
                라인 <span>*</span>
              </label>

              <button
                type="button"
                className="lecture-form-dropdown-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLineOpen((prev) => !prev);
                  setIsLevelOpen(false);
                  setIsChampionOpen(false);
                }}
              >
                <span
                  className={
                    form.line
                      ? "lecture-form-dropdown-value"
                      : "lecture-form-dropdown-placeholder"
                  }
                >
                  {form.line || "라인 선택"}
                </span>
                <span
                  className={`lecture-form-dropdown-arrow ${
                    isLineOpen ? "open" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {isLineOpen && (
                <div
                  className="lecture-form-dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lineOptions.map((line) => (
                    <button
                      type="button"
                      key={line}
                      className={`lecture-form-dropdown-item ${
                        form.line === line ? "selected" : ""
                      }`}
                      onClick={() => handleSelectLine(line)}
                    >
                      {line}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lecture-form-group lecture-form-dropdown-group">
              <label className="lecture-form-label">
                난이도 <span>*</span>
              </label>

              <button
                type="button"
                className="lecture-form-dropdown-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLevelOpen((prev) => !prev);
                  setIsLineOpen(false);
                  setIsChampionOpen(false);
                }}
              >
                <span
                  className={
                    form.level
                      ? "lecture-form-dropdown-value"
                      : "lecture-form-dropdown-placeholder"
                  }
                >
                  {form.level || "난이도 선택"}
                </span>
                <span
                  className={`lecture-form-dropdown-arrow ${
                    isLevelOpen ? "open" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {isLevelOpen && (
                <div
                  className="lecture-form-dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  {levelOptions.map((level) => (
                    <button
                      type="button"
                      key={level}
                      className={`lecture-form-dropdown-item ${
                        form.level === level ? "selected" : ""
                      }`}
                      onClick={() => handleSelectLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lecture-form-group lecture-form-dropdown-group">
            <label className="lecture-form-label">
              다룰 챔피언 <span>*</span>
            </label>

            <div className="lecture-form-help">
              챔피언 선택 시 아래에 태그로 추가됩니다
            </div>

            {form.champions.length > 0 && (
              <div className="lecture-form-champion-tags">
                {form.champions.map((champion) => (
                  <button
                    type="button"
                    key={champion}
                    className="lecture-form-tag"
                    onClick={() => handleRemoveChampion(champion)}
                  >
                    <span>{champion}</span>
                    <span className="lecture-form-tag-close">×</span>
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              className="lecture-form-dropdown-button lecture-form-dropdown-button-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsChampionOpen((prev) => !prev);
                setIsLineOpen(false);
                setIsLevelOpen(false);
              }}
            >
              <span
                className={
                  form.champions.length > 0
                    ? "lecture-form-dropdown-value"
                    : "lecture-form-dropdown-placeholder"
                }
              >
                {form.champions.length > 0 ? "챔피언 추가 선택" : "챔피언 선택"}
              </span>
              <span
                className={`lecture-form-dropdown-arrow ${
                  isChampionOpen ? "open" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {isChampionOpen && (
              <div
                className="lecture-form-dropdown-menu lecture-form-dropdown-menu-search"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lecture-form-dropdown-search-wrap">
                  <input
                    type="text"
                    value={championKeyword}
                    onChange={(e) => setChampionKeyword(e.target.value)}
                    placeholder="챔피언 검색"
                    className="lecture-form-dropdown-search"
                    autoComplete="off"
                  />
                </div>

                <div className="lecture-form-dropdown-list">
                  {filteredChampions.length > 0 ? (
                    filteredChampions.map((champion) => {
                      const isSelected = form.champions.includes(champion);

                      return (
                        <button
                          type="button"
                          key={champion}
                          className={`lecture-form-dropdown-item ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => handleSelectChampion(champion)}
                        >
                          {champion}
                        </button>
                      );
                    })
                  ) : (
                    <div className="lecture-form-dropdown-empty">
                      검색 결과가 없습니다
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lecture-form-group">
            <label className="lecture-form-label">
              수업 시간 <span>*</span>
            </label>
            <input
              type="text"
              name="lessonTime"
              value={form.lessonTime}
              onChange={handleChange}
              placeholder="예: 주 2회, 회당 1시간"
              className="lecture-form-input"
              autoComplete="off"
            />
          </div>

          <div className="lecture-form-group">
            <label className="lecture-form-label">
              가격 (원) <span>*</span>
            </label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handlePriceChange}
              placeholder="예: 50,000"
              className="lecture-form-input"
              autoComplete="off"
            />
          </div>

          <div className="lecture-form-group">
            <label className="lecture-form-label">
              강의 사진 <span>*</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              onChange={handleChange}
              className="lecture-form-hidden-file"
            />

            <button
              type="button"
              className="lecture-form-upload-button"
              onClick={handleClickFileButton}
            >
              <img
                src={uploadIcon}
                alt="업로드"
                className="lecture-form-upload-image"
              />
              <span className="lecture-form-upload-text">
                {form.image && typeof form.image !== "string"
                  ? form.image.name
                  : form.image && typeof form.image === "string"
                    ? "기존 이미지 선택됨"
                    : "강의 이미지 업로드"}
              </span>
            </button>
          </div>

          <div className="lecture-form-group">
            <label className="lecture-form-label">
              커리큘럼 <span>*</span>
            </label>

            <div className="lecture-form-help">
              강의 내용을 순서대로 작성해주세요
            </div>

            <div className="lecture-form-curriculum-list">
              {form.curriculum.map((item, index) => (
                <div key={index} className="lecture-form-curriculum-item">
                  <div className="lecture-form-curriculum-index-wrap">
                    <span className="lecture-form-curriculum-index">
                      {index + 1}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleCurriculumChange(index, e.target.value)
                    }
                    placeholder={`${index + 1}번째 커리큘럼 내용`}
                    className="lecture-form-curriculum-input"
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    className={`lecture-form-curriculum-remove ${
                      index === 0
                        ? "lecture-form-curriculum-remove-disabled"
                        : ""
                    }`}
                    onClick={() => handleRemoveCurriculum(index)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddCurriculum}
              className="lecture-form-curriculum-add"
            >
              + 커리큘럼 항목 추가
            </button>
          </div>

          <div className="lecture-form-button-row">
            <button
              type="button"
              className="lecture-form-cancel-button"
              onClick={onCancel}
            >
              취소
            </button>

            <button
              type="submit"
              className={`lecture-form-submit-button ${
                !isValid ? "disabled" : ""
              }`}
              disabled={!isValid}
            >
              {isEdit ? "강의 수정하기" : "강의 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LectureForm;
