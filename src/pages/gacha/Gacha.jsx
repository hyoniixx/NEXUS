import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { userContext } from "../../App";
import "./Gacha.css";

const GACHA_ITEMS = [
  {
    id: 1,
    grade: "전설",
    engGrade: "Legendary",
    emoji: "👑",
    reward: "수강료 25% 할인권",
    probability: 3,
    cardRate: "25%",
  },
  {
    id: 2,
    grade: "영웅",
    engGrade: "Epic",
    emoji: "🎁",
    reward: "수강료 20% 할인권",
    probability: 10,
    cardRate: "20%",
  },
  {
    id: 3,
    grade: "희귀",
    engGrade: "Rare",
    emoji: "🎟️",
    reward: "수강료 15% 할인권",
    probability: 17,
    cardRate: "15%",
  },
  {
    id: 4,
    grade: "고급",
    engGrade: "Uncommon",
    emoji: "🎫",
    reward: "수강료 10% 할인권",
    probability: 20,
    cardRate: "10%",
  },
  {
    id: 5,
    grade: "일반",
    engGrade: "Common",
    emoji: "🏷️",
    reward: "수강료 5% 할인권",
    probability: 50,
    cardRate: "5%",
  },
];

function pickRandomReward() {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const item of GACHA_ITEMS) {
    cumulative += item.probability;
    if (random <= cumulative) {
      return item;
    }
  }

  return GACHA_ITEMS[GACHA_ITEMS.length - 1];
}

function formatDate(dateValue) {
  if (!dateValue) return "";

  const date =
    typeof dateValue?.toDate === "function"
      ? dateValue.toDate()
      : new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}월 ${day}일 ${hours}:${minutes}`;
}

function Gacha() {
  const navigate = useNavigate();
  const { userData, loading } = useContext(userContext);

  const uid = userData?.uid || null;

  const [ticketCount, setTicketCount] = useState(0);
  const [isTicketLoading, setIsTicketLoading] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [resultItem, setResultItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponTab, setCouponTab] = useState("available");
  const [ownedCoupons, setOwnedCoupons] = useState([]);
  const [couponHistory, setCouponHistory] = useState([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  const probabilityList = useMemo(() => GACHA_ITEMS, []);

  const fetchTicketCount = async () => {
    if (!uid) {
      setTicketCount(0);
      setIsTicketLoading(false);
      return;
    }

    try {
      setIsTicketLoading(true);

      const userRef = doc(db, "users", uid);
      const userSnapShot = await getDoc(userRef);

      if (!userSnapShot.exists()) {
        setTicketCount(0);
        return;
      }

      const currentUserData = userSnapShot.data();
      setTicketCount(currentUserData.gachaTicketCount ?? 0);
    } catch (error) {
      console.error("가챠권 조회 실패", error);
      setErrorMessage("가챠권 정보를 불러오지 못했습니다.");
    } finally {
      setIsTicketLoading(false);
    }
  };

  const fetchCoupons = async () => {
    if (!uid) {
      setOwnedCoupons([]);
      setCouponHistory([]);
      return;
    }

    try {
      setIsCouponLoading(true);

      const couponsRef = collection(db, "coupons");
      const q = query(couponsRef, where("ownerUid", "==", uid));

      const snapshot = await getDocs(q);

      const couponList = snapshot.docs
        .map((item) => ({
          couponId: item.id,
          ...item.data(),
        }))
        .sort((a, b) => {
          const aTime =
            typeof a.createdAt?.toDate === "function"
              ? a.createdAt.toDate().getTime()
              : 0;

          const bTime =
            typeof b.createdAt?.toDate === "function"
              ? b.createdAt.toDate().getTime()
              : 0;

          return bTime - aTime;
        });

      setCouponHistory(couponList);
      setOwnedCoupons(
        couponList.filter((coupon) => coupon.status === "available"),
      );
    } catch (error) {
      console.error("쿠폰 조회 실패", error);
    } finally {
      setIsCouponLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchTicketCount();
      fetchCoupons();
    }
  }, [uid, loading]);

  const handleSelectCoupon = (item) => {
    setSelectedCoupon(item);
  };

  const handleGachaDraw = async () => {
    if (isRolling || isTicketLoading) return;

    if (!uid) {
      setErrorMessage("로그인 후 이용 가능합니다.");
      return;
    }

    if (ticketCount <= 0) {
      setErrorMessage("가챠권이 부족합니다.");
      return;
    }

    try {
      setErrorMessage("");
      setIsRolling(true);
      setResultItem(null);

      const reward = pickRandomReward();

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        gachaTicketCount: increment(-1),
      });

      await addDoc(collection(db, "coupons"), {
        ownerUid: uid,
        reward: reward.reward,
        grade: reward.grade,
        engGrade: reward.engGrade,
        emoji: reward.emoji,
        status: "available",
        createdAt: serverTimestamp(),
      });

      setTimeout(async () => {
        setResultItem(reward);
        setTicketCount((prev) => prev - 1);
        await fetchCoupons();
        setIsRolling(false);
      }, 2000);
    } catch (error) {
      console.error("가챠 실행 실패", error);
      setErrorMessage("가챠 실행에 실패했습니다.");
      setIsRolling(false);
    }
  };

  const openCouponModal = async () => {
    setIsCouponModalOpen(true);
    await fetchCoupons();
  };

  const closeCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  if (loading || isTicketLoading) {
    return (
      <div className="gacha-page">
        <div className="gacha-page-inner">
          <div className="gacha-title-wrap">
            <h1 className="gacha-title">
              <span className="gacha-title-nexus">NEXUS</span>
              <span className="gacha-title-treasure"> Treasure</span>
            </h1>
            <p className="gacha-subtitle">가챠 정보를 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="gacha-page">
        <div className="gacha-page-inner">
          <button
            type="button"
            className="gacha-back-button"
            onClick={() => navigate(-1)}
          >
            ← 뒤로 가기
          </button>

          <div className="gacha-hero">
            <div className="gacha-hero-icon">✦</div>
            <h1 className="gacha-title">
              <span className="gacha-title-nexus">NEXUS</span>
              <span className="gacha-title-treasure"> Treasure</span>
            </h1>
            <p className="gacha-subtitle">행운을 시험해보세요!</p>
          </div>

          <div className="gacha-ticket-box">
            <div className="gacha-ticket-left">
              <span className="gacha-ticket-icon">🎟</span>
              <span className="gacha-ticket-label">보유 가챠권</span>
            </div>

            <div className="gacha-ticket-count">{ticketCount}개</div>
          </div>

          <div className="gacha-draw-box">
            <div className="gacha-draw-content">
              <div className={`gacha-draw-orb ${isRolling ? "rolling" : ""}`}>
                {isRolling ? "✦" : resultItem ? resultItem.emoji : "✦"}
              </div>

              {!isRolling && resultItem ? (
                <div className="gacha-result-box">
                  <div className="gacha-result-grade">{resultItem.grade}</div>
                  <div className="gacha-result-title">{resultItem.reward}</div>
                  <div className="gacha-result-desc">
                    축하합니다! 보상을 획득했습니다.
                  </div>

                  <button
                    type="button"
                    className="gacha-draw-button"
                    onClick={handleGachaDraw}
                    disabled={ticketCount <= 0}
                  >
                    다시 뽑기
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="gacha-draw-button"
                  onClick={handleGachaDraw}
                  disabled={isRolling || ticketCount <= 0}
                >
                  {isRolling ? "뽑는 중..." : "가챠 뽑기"}
                </button>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="gacha-error-message">{errorMessage}</div>
          )}

          <div className="gacha-coupon-box">
            <div className="gacha-section-title">🎁 획득 가능한 쿠폰</div>

            <div className="gacha-coupon-grid">
              {GACHA_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`gacha-coupon-card ${
                    selectedCoupon?.id === item.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectCoupon(item)}
                >
                  <div className="gacha-coupon-emoji">{item.emoji}</div>
                  <div className="gacha-coupon-rate">{item.cardRate}</div>
                  <div className="gacha-coupon-grade">{item.grade}</div>
                </button>
              ))}
            </div>

            <div className="gacha-coupon-guide">
              카드를 클릭하여 상세 정보를 확인하세요
            </div>
          </div>

          <div className="gacha-my-coupon-box">
            <div className="gacha-section-title">🎫 내 쿠폰</div>

            <div className="gacha-my-coupon-content">
              <div className="gacha-my-coupon-left">
                <div className="gacha-my-coupon-count-label">
                  보유 쿠폰 개수
                </div>
                <div className="gacha-my-coupon-count-value">
                  {ownedCoupons.length}개
                </div>
              </div>

              <button
                type="button"
                className="gacha-my-coupon-button"
                onClick={openCouponModal}
              >
                내 쿠폰 보기
              </button>
            </div>
          </div>

          <div className="gacha-probability-box">
            <div className="gacha-section-title">등급별 획득 확률</div>

            <div className="gacha-probability-list">
              {probabilityList.map((item) => (
                <div key={item.id} className="gacha-probability-item">
                  <div className="gacha-probability-left">
                    <div className="gacha-probability-emoji">{item.emoji}</div>

                    <div className="gacha-probability-texts">
                      <div className="gacha-probability-grade">
                        {item.grade} ({item.engGrade})
                      </div>
                      <div className="gacha-probability-reward">
                        {item.reward.replace("수강료 ", "")}
                      </div>
                    </div>
                  </div>

                  <div className="gacha-probability-rate">
                    {item.probability}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCouponModalOpen && (
        <div className="gacha-modal-overlay" onClick={closeCouponModal}>
          <div className="gacha-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gacha-modal-header">
              <h2 className="gacha-modal-title">내 쿠폰</h2>
              <button
                type="button"
                className="gacha-modal-close"
                onClick={closeCouponModal}
              >
                ×
              </button>
            </div>

            <div className="gacha-modal-tab-row">
              <button
                type="button"
                className={`gacha-modal-tab ${
                  couponTab === "available" ? "active" : ""
                }`}
                onClick={() => setCouponTab("available")}
              >
                사용 가능한 쿠폰
              </button>

              <button
                type="button"
                className={`gacha-modal-tab ${
                  couponTab === "history" ? "active" : ""
                }`}
                onClick={() => setCouponTab("history")}
              >
                쿠폰 히스토리
              </button>
            </div>

            <div className="gacha-modal-body">
              {isCouponLoading ? (
                <div className="gacha-modal-empty">
                  쿠폰 정보를 불러오는 중입니다.
                </div>
              ) : couponTab === "available" ? (
                ownedCoupons.length > 0 ? (
                  <div className="gacha-modal-list">
                    {ownedCoupons.map((coupon) => (
                      <div
                        key={coupon.couponId}
                        className="gacha-modal-coupon-card"
                      >
                        <div className="gacha-modal-coupon-left">
                          <div className="gacha-modal-coupon-emoji">
                            {coupon.emoji}
                          </div>

                          <div className="gacha-modal-coupon-texts">
                            <div className="gacha-modal-coupon-title">
                              {coupon.reward}
                            </div>
                            <div className="gacha-modal-coupon-meta">
                              {coupon.grade} · {formatDate(coupon.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="gacha-modal-coupon-status available">
                          사용 가능
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="gacha-modal-empty">
                    아직 보유한 쿠폰이 없습니다.
                  </div>
                )
              ) : couponHistory.length > 0 ? (
                <div className="gacha-modal-list">
                  {couponHistory.map((coupon) => (
                    <div
                      key={coupon.couponId}
                      className="gacha-modal-coupon-card"
                    >
                      <div className="gacha-modal-coupon-left">
                        <div className="gacha-modal-coupon-emoji">
                          {coupon.emoji}
                        </div>

                        <div className="gacha-modal-coupon-texts">
                          <div className="gacha-modal-coupon-title">
                            {coupon.reward}
                          </div>
                          <div className="gacha-modal-coupon-meta">
                            {coupon.grade} · {formatDate(coupon.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="gacha-modal-coupon-status history">
                        획득 완료
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="gacha-modal-empty">
                  아직 쿠폰 획득 기록이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gacha;
