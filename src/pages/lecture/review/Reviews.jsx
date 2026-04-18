import React, { useEffect, useState } from 'react'
import './Reviews.css'
import { useParams } from 'react-router-dom'
import leftArrow from '../../../assets/leftArrow.svg'
import filledStar from '../../../assets/filledStar.svg'
import ReviewDashboardStar from '../../../components/review/ReviewDashboardStar'
import people from '../../../assets/people.svg'
import write from '../../../assets/writeIcon.svg'
import right from '../../../assets/rightIcon.svg'
import ReviewItem from '../../../components/review/ReviewItem'


function Reviews() {
    const { id } = useParams();
    const lecture = {
        id: 123,
        title: '정글에서 살아남기',
        star: {
            "1": 2,
            "2": 6,
            "3": 6,
            "4": 10,
            "5": 26,
            total: 50
        }
    }
    const [average, setAverage] = useState(0); //대시보드 왼쪽 평점
    const [intAverage, setIntAverage] = useState(0); //대시보드 왼쪽 평점 별 개수(반올림)
    const [pageNow, setPageNow] = useState(1); //현재 선택된 페이지
    const [pages, setPages] = useState(100); //전체 페이지수
    const [pagination, setPagination] = useState([1, 0, 0, 0, 0]); //페이지네이션
    const [pageSelected, setPageSelected] = useState([true, false, false, false, false]) //페이지 아이템들 상태 관리(눌려있는지)
    const [canClick, setCanClick] = useState([false, true]) //좌우 이동 버튼 활성화 관리
    // const []
    useEffect(() => {
        var av = average;
        for (let i = 1; i < 6; i++) {
            av += Number(lecture.star[String(i)]) * i;
        }
        av /= lecture.star.total;
        av = av.toFixed(2);
        setAverage(av); //대시보드 평균평점 표시
        setIntAverage(Math.round(av)); //별 개수 지정(반올림)
        const tempPage = Math.ceil(lecture.star.total / 5); //전체 페이지 수 지정(올림)
        setPages(tempPage);
        if (tempPage < 5) {
            var temp = [0, 0, 0, 0, 0];
            for (let i = 0; i < tempPage; i++) {
                temp[i] = i + 1;
            };
            setPagination(temp);
        }
    }, [])
    const stars = [false, false, false, false, false]; //대시보드 별 나열
    for (let i = 0; i < Number(intAverage); i++) {
        stars[i] = true
    }

    //현재 선택된 페이지를 변경하기 : 페이지 이동 버튼에 이벤트 걸려있음
    const handlePageNow = (number) => {
        setPageNow(number);
    };
    useEffect(() => {//현재 페이지가 바뀔때만 실행
        //페이지네이션 변경( [1][2][3][4][5] -> [6][7][8][9][10] )
        var paginationTemp = [1, 2, 3, 4, 5];
        for (let i = 0; i < 5; i++) {
            if (pageNow - (pageNow - 1) % 5 + i <= pages) {
                paginationTemp[i] = pageNow - (pageNow - 1) % 5 + i
            } else { paginationTemp[i] = 0 }
        }
        setPagination(paginationTemp);

        //페이지 이동버튼 활성화 여부 변경
        var selectTemp = [false, false, false, false, false];
        selectTemp[(pageNow - 1) % 5] = true;
        setPageSelected(selectTemp);

        //페이지 좌우버튼 활성화 여부 변경
        var leftTemp = false;
        var rightTemp = true;
        if (pageNow <= 5) {
            leftTemp = false
        } else { leftTemp = true }
        if (pageNow < pages) {
            rightTemp = true;
        } else { rightTemp = false; }
        setCanClick([leftTemp, rightTemp]);
    }, [pageNow, pages])


    return (
        <div className='review-layout'>
            <div className='review-back'>
                <img src={leftArrow} width="20" height="20" />
                <p>강의 상세보기로 돌아가기</p>
            </div>
            <div className='review-head'>
                <h2>수강생 후기</h2>
                <p>"{lecture.title}"</p>
            </div>
            <div className='review-dashboard'>
                <div className='review-dashboard-total'>
                    <h2>{average}</h2>
                    <div className='review-dashboard-total-star'>
                        {stars.map((item, index) => {
                            if (item) return <img key={index} src={filledStar} alt="" width="20" height="20" />
                        })}
                    </div>
                    <p>총 {lecture.star.total}개의 후기</p>
                </div>
                <div className='review-dashboard-star'>
                    <ReviewDashboardStar star='5' now={lecture.star['5']} all={lecture.star.total} />
                    <ReviewDashboardStar star='4' now={lecture.star['4']} all={lecture.star.total} />
                    <ReviewDashboardStar star='3' now={lecture.star['3']} all={lecture.star.total} />
                    <ReviewDashboardStar star='2' now={lecture.star['2']} all={lecture.star.total} />
                    <ReviewDashboardStar star='1' now={lecture.star['1']} all={lecture.star.total} />
                </div>
            </div>
            <div className='review-filter'>
                <div className='review-filter-header'><p>정렬 기준: </p></div>
                <select name="review-filter" id="review-filter">
                    <option value="latest">최신순</option>
                    <option value="decrease">평점 높은 순</option>
                    <option value="increase">평점 낮은 순</option>
                </select>
                <button className='review-filter-my'><img src={people} alt="" width="16" height="16" /><p>내 후기 보기</p></button>
                <button className='review-filter-write'><img src={write} alt="" width="16" height="16" /><p>후기 작성</p></button>
                <div className='review-filter-page'><p>{pageNow * 5 - 4}-{Math.min(pageNow * 5, lecture.star.total)}/{lecture.star.total}개</p></div>
            </div>
            <div className='review-list'>{/*map((review,index)=>return <ReviewItem key='index' name={} content={} date={} star={})*/}
                <ReviewItem key='1' name='김길동' content='정말 재밌었습니다.' date='2026.04.03' star='5' />
                <ReviewItem key='2' name='김길동' content='정말 재밌었습니다.' date='2026.04.03' star='5' />
                <ReviewItem key='3' name='김길동' content='정말 재밌었습니다.' date='2026.04.03' star='5' />
                <ReviewItem key='4' name='김길동' content='정말 재밌었습니다.' date='2026.04.03' star='5' />
                <ReviewItem key='5' name='김길동' content='정말 재밌었습니다.' date='2026.04.03' star='5' />
            </div>
            <div className='review-page'>
                <button className='review-page-button' onClick={() => handlePageNow(pagination[0] - 5)} disabled={!canClick[0]}><img src={right} alt="" width='5px' height='10px' style={{ transform: 'scaleX(-1)' }} /></button>
                <button className={pageSelected[0] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[0])} style={{ display: `${pagination[0] === 0 ? 'none' : 'flex'}` }}><p>{pagination[0]}</p></button>
                <button className={pageSelected[1] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[1])} style={{ display: `${pagination[1] === 0 ? 'none' : 'flex'}` }}><p>{pagination[1]}</p></button>
                <button className={pageSelected[2] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[2])} style={{ display: `${pagination[2] === 0 ? 'none' : 'flex'}` }}><p>{pagination[2]}</p></button>
                <button className={pageSelected[3] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[3])} style={{ display: `${pagination[3] === 0 ? 'none' : 'flex'}` }}><p>{pagination[3]}</p></button>
                <button className={pageSelected[4] ? 'review-page-button-selected' : 'review-page-button'} onClick={() => handlePageNow(pagination[4])} style={{ display: `${pagination[4] === 0 ? 'none' : 'flex'}` }}><p>{pagination[4]}</p></button>
                <button className='review-page-button' onClick={() => handlePageNow(pagination[0] + 5)} disabled={!canClick[1]}><img src={right} alt="" width='5px' height='10px' /></button>
            </div>
        </div>
    )
}

export default Reviews
