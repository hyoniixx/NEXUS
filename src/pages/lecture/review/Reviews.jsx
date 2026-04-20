import React, { useEffect, useState } from 'react'
import './Reviews.css'
import { useParams, useNavigate } from 'react-router-dom'
import leftArrow from '../../../assets/leftArrow.svg'
import filledStar from '../../../assets/filledStar.svg'
import ReviewDashboardStar from '../../../components/review/ReviewDashboardStar'
import people from '../../../assets/people.svg'
import write from '../../../assets/writeIcon.svg'
import right from '../../../assets/rightIcon.svg'
import ReviewItem from '../../../components/review/ReviewItem'
import { getReviews } from '../../../service/ReviewService.js'
import { useContext } from 'react'
import { userContext } from '../../../App.jsx'
import ReviewLectureModal from '../../../components/common/ReviewLectureModal.jsx'

function Reviews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState(null);
    const { userData } = useContext(userContext);
    const [average, setAverage] = useState(0);
    const [intAverage, setIntAverage] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    const [pages, setPages] = useState(1);
    const [pagination, setPagination] = useState([1, 0, 0, 0, 0]);
    const [pageSelected, setPageSelected] = useState([true, false, false, false, false])
    const [canClick, setCanClick] = useState([false, true])
    const [total, setTotal] = useState(1)
    const [filter, setFilter] = useState('latest');
    const [showData, setShowData] = useState([]);
    const [isMyReview, setIsMyReview] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);

    useEffect(() => {// 최초 마운트 시 리뷰 데이터 불러오기
        const render = async () => {
            const temp = await getReviews(id);
            setReviewData(temp);
        }
        render();
    }, [])

    useEffect(() => {// reviewData가 불러와지면 평균, 페이지네이션 초기화
        if (!reviewData) return;

        const av = reviewData.star?.average ?? 0;
        setAverage(av.toFixed(2));
        setIntAverage(Math.round(av));
        setTotal(reviewData.total);

        const tempPage = Math.ceil(reviewData.total / 5);
        setPages(tempPage);
        if (tempPage <= 5) {
            var temp = [0, 0, 0, 0, 0];
            for (let i = 0; i < tempPage; i++) {
                temp[i] = i + 1;
            }
            setPagination(temp);
        }
    }, [reviewData])

    useEffect(() => {// 필터 또는 페이지 변경 시 showData 갱신
        if (!reviewData) return;

        let sorted = [...reviewData.reviews];

        // 🔥 내 후기 필터
        if (isMyReview && userData?.uid) {
            sorted = sorted.filter(r => r.uid === userData.uid);
        }

        switch (filter) {
            case 'decrease':
                sorted.sort((a, b) => b.star - a.star);
                break;
            case 'increase':
                sorted.sort((a, b) => a.star - b.star);
                break;
            case 'latest':
            default:
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        const sliced = sorted.slice(pageNow * 5 - 5, pageNow * 5);
        setShowData(sliced);
    }, [filter, pageNow, reviewData, isMyReview, userData])

    useEffect(() => {
        setPageNow(1);
    }, [filter, isMyReview]);

    // 대시보드 별 나열
    const stars = [false, false, false, false, false];
    for (let i = 0; i < Number(intAverage); i++) {
        stars[i] = true;
    }

    const handlePageNow = (number) => { //페이지네이션 변경
        setPageNow(number);
    };

    useEffect(() => { //페이지네이션 관련
        var paginationTemp = [1, 2, 3, 4, 5];
        for (let i = 0; i < 5; i++) {
            if (pageNow - (pageNow - 1) % 5 + i <= pages) {
                paginationTemp[i] = pageNow - (pageNow - 1) % 5 + i
            } else { paginationTemp[i] = 0 }
        }
        setPagination(paginationTemp);

        var selectTemp = [false, false, false, false, false];
        selectTemp[(pageNow - 1) % 5] = true;
        setPageSelected(selectTemp);

        var leftTemp = false;
        var rightTemp = true;
        if (pageNow <= 5) { leftTemp = false } else { leftTemp = true }
        if (pageNow < pages) { rightTemp = true } else { rightTemp = false }
        setCanClick([leftTemp, rightTemp]);
    }, [pageNow, pages])

    useEffect(() => {
        if (!reviewData) return;

        let filtered = [...reviewData.reviews];

        if (isMyReview && userData?.uid) {
            filtered = filtered.filter(r => r.uid === userData.uid);
        }

        const newTotal = filtered.length;
        setTotal(newTotal);

        const tempPage = Math.ceil(newTotal / 5) || 1;
        setPages(tempPage);

        // pagination 초기화
        let temp = [0, 0, 0, 0, 0];
        for (let i = 0; i < Math.min(5, tempPage); i++) {
            temp[i] = i + 1;
        }
        setPagination(temp);

        setPageNow(1); // ⭐ 여기서 같이 초기화
    }, [reviewData, isMyReview, userData]);

    if (!reviewData) return <div>로딩 중...</div>

    return (
        <>
            <ReviewLectureModal
                isModal={isCreateModal}
                onClose={() => setIsCreateModal(false)}
                writer={userData?.userName}
                type="create"
            />
            <div className='review-layout'>
                <div className='review-back' onClick={() => navigate(`/lecture/${id}`)}>
                    <img src={leftArrow} width="20" height="20" />
                    <p>강의 상세보기로 돌아가기</p>
                </div>
                <div className='review-head'>
                    <h2>수강생 후기</h2>
                    <p>"{reviewData.title}"</p>
                </div>
                <div className='review-dashboard'>
                    <div className='review-dashboard-total'>
                        <h2>{average}</h2>
                        <div className='review-dashboard-total-star'>
                            {stars.map((item, index) => {
                                if (item) return <img key={index} src={filledStar} alt="" width="20" height="20" />
                            })}
                        </div>
                        <p>총 {reviewData.total}개의 후기</p>
                    </div>
                    <div className='review-dashboard-star'>
                        {reviewData.star.total ? (
                            <p>아직 후기가 없습니다.</p>
                        ) : (
                            <>
                                <ReviewDashboardStar star='5' now={reviewData.star['5']} all={reviewData.total} />
                                <ReviewDashboardStar star='4' now={reviewData.star['4']} all={reviewData.total} />
                                <ReviewDashboardStar star='3' now={reviewData.star['3']} all={reviewData.total} />
                                <ReviewDashboardStar star='2' now={reviewData.star['2']} all={reviewData.total} />
                                <ReviewDashboardStar star='1' now={reviewData.star['1']} all={reviewData.total} />
                            </>
                        )}
                    </div>
                </div>
                <div className='review-filter'>
                    <div className='review-filter-header'><p>정렬 기준: </p></div>
                    <select name="review-filter" id="review-filter" onChange={(e) => setFilter(e.target.value)}>
                        <option value="latest">최신순</option>
                        <option value="decrease">평점 높은 순</option>
                        <option value="increase">평점 낮은 순</option>
                    </select>
                    <button
                        className={isMyReview ? 'review-filter-my-selected' : 'review-filter-my'}
                        onClick={() => setIsMyReview(prev => !prev)}
                    >
                        <img src={people} alt="" width="16" height="16" />
                        <p>내 후기 보기</p>
                    </button>
                    <button
                        className='review-filter-write'
                        onClick={() => setIsCreateModal(true)}
                    >
                        <img src={write} alt="" width="16" height="16" />
                        <p>후기 작성</p>
                    </button>
                    <div className='review-filter-page'>
                        <p>
                            {pageNow * 5 - 4}-
                            {Math.min(pageNow * 5, total)}/{total}개
                        </p>
                    </div>
                </div>
                <div className='review-list'>
                    {showData.length === 0 ? (
                        <div className='review-list-nothing'>
                            <h1>조회된 후기가 없습니다.</h1>
                        </div>
                    ) : (
                        showData.map((review) => (
                            <ReviewItem
                                key={review.reviewId}
                                review={review}
                                currentUserId={userData?.uid}
                            />
                        ))
                    )
                    }
                </div>
                <div className='review-page'>
                    <button className='review-page-button' onClick={() => handlePageNow(pagination[0] - 5)} disabled={!canClick[0]}>
                        <img src={right} alt="" width='5px' height='10px' style={{ transform: 'scaleX(-1)' }} />
                    </button>
                    <button className={pageSelected[0] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[0])} style={{ display: `${pagination[0] === 0 ? 'none' : 'flex'}` }}><p>{pagination[0]}</p></button>
                    <button className={pageSelected[1] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[1])} style={{ display: `${pagination[1] === 0 ? 'none' : 'flex'}` }}><p>{pagination[1]}</p></button>
                    <button className={pageSelected[2] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[2])} style={{ display: `${pagination[2] === 0 ? 'none' : 'flex'}` }}><p>{pagination[2]}</p></button>
                    <button className={pageSelected[3] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[3])} style={{ display: `${pagination[3] === 0 ? 'none' : 'flex'}` }}><p>{pagination[3]}</p></button>
                    <button className={pageSelected[4] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[4])} style={{ display: `${pagination[4] === 0 ? 'none' : 'flex'}` }}><p>{pagination[4]}</p></button>
                    <button className='review-page-button' onClick={() => handlePageNow(pagination[0] + 5)} disabled={!canClick[1]}>
                        <img src={right} alt="" width='5px' height='10px' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Reviews