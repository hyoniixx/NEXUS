import React, { createContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import leftArrow from '../../assets/leftArrow.svg'
import './Money.css'
import MoneyDashboardItem from '../../components/admin/MoneyDashboardItem'
import searchIcon from '../../assets/searchIcon.svg'
import right from '../../assets/rightIcon.svg'
import { getMoneyList, createMoney } from '../../service/MoneyManagement.js'

export const PageContext = createContext(); //페이지네이션 요소 뿌리기 반영을 위한것. -> Deposit, Payment

function Money() {
    const [moneyList, setMoneyList] = useState([]); //돈 관련 내역 전부 불러오기
    const [total, setTotal] = useState(1) //전체 데이터 수
    const [pageNow, setPageNow] = useState(1); //현재 선택된 페이지
    const [pages, setPages] = useState(1); //전체 페이지수
    const [pagination, setPagination] = useState([1, 0, 0, 0, 0]); //페이지네이션
    const [pageSelected, setPageSelected] = useState([true, false, false, false, false]) //페이지 아이템들 상태 관리(눌려있는지)
    const [canClick, setCanClick] = useState([false, true]) //좌우 이동 버튼 활성화 관리
    const [moneyValue, setMoneyValue] = useState([0, 0, 0, 0]) //대시보드 표기할 값들
    const [filteredList, setFilteredList] = useState([]); //셀렉트태그(필터링)에 의해 걸러진 데이터들
    const [showList, setShowList] = useState([]); //페이지네이션에 의해 표시할 데이터들

    useEffect(() => { //최초 마운트 시 전체 돈 관련 내역 불러오기
        const render = async () => {
            const tempData = await getMoneyList();
            setMoneyList(tempData);
            setTotal(tempData.length);
            setFilteredList(tempData);
            //페이지네이션
            var temp = tempData.filter((item, index) => index >= pageNow * 5 - 5 && index <= pageNow * 5 - 1)
            setShowList(temp);

            //대시보드 표기 관리
            //입금 받은 돈
            var totalMoney = 0;
            tempData.map((item) => totalMoney += Number(item.price));
            //정산 완료된 돈
            var complete = 0;
            tempData.filter((item) => item.completed === 'true' || item.completed === true).map((item) => complete += Number(item.price));
            setMoneyValue([totalMoney, totalMoney - complete, complete, complete * 0.1]);
        }
        render();
    }, [])
    const [searchValue, setSearchValue] = useState(''); //이 값에 따라 요소 렌더링 달라지게
    const [navActive, setNavActive] = useState([true, false]); //NavBar 요소 두개에 대한 속성

    useEffect(() => { //전체 리스트에 변화가 생길때 대시보드 표기 관리하기
        //대시보드 표기 관리
        //입금 받은 돈
        var tempData = moneyList;
        var totalMoney = 0;
        tempData.map((item) => totalMoney += Number(item.price));
        //정산 완료된 돈
        var complete = 0;
        tempData.filter((item) => item.completed === 'true' || item.completed === true).map((item) => complete += Number(item.price));
        setMoneyValue([totalMoney, totalMoney - complete, complete, complete * 0.1]);
    }, [moneyList])

    useEffect(() => {
        setFilteredList(moneyList)
    }, [navActive])

    useEffect(() => { //검색값 및 페이지 선택에 변화가 생길때 전체 리스트 및 표시할 내역 변경
        //검색값 필터링
        var tempData = filteredList.filter((item) => item.student?.includes(searchValue)
            || item.studentEmail?.includes(searchValue)
            || item.instructor?.includes(searchValue)
            || item.instructorEmail?.includes(searchValue)
            || item.title?.includes(searchValue));
        //페이지네이션
        var temp = tempData.slice(pageNow * 5 - 5, pageNow * 5)
        setTotal(tempData.length);
        setShowList(temp);
    }, [searchValue, pageNow, moneyList, filteredList])

    useEffect(() => {
        setPageNow(1);
    }, [filteredList])
    // console.log(PageContext);


    useEffect(() => {
        const tempPage = Math.ceil(total / 5); //전체 페이지 수 지정(올림)
        setPages(tempPage);
        if (tempPage < 5) {
            var temp = [0, 0, 0, 0, 0];
            for (let i = 0; i < tempPage; i++) {
                temp[i] = i + 1;
            };
            setPagination(temp);
        }
    }, [total])


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

    /*입금,정산 왔다갔다 할때 1페이지로 초기화*/
    useEffect(() => {
        setPageNow(1)
    }, [navActive])

    return (
        <div className='admin-money-layout'>
            <div className='admin-money-header'>
                <div className='admin-money-header-back'>
                    <img src={leftArrow} style={{ width: '20px', height: '20px' }} />
                    <h6>마이페이지로 돌아가기</h6>
                </div>
                <h2>매출 관리</h2>
                <p>수강생 입금 내역과 강사 정산을 관리합니다.</p>
            </div>
            <div className='admin-money-dashboard'>
                <MoneyDashboardItem type="getMoney" value={moneyValue[0]} />
                <MoneyDashboardItem type="wait" value={moneyValue[1]} />
                <MoneyDashboardItem type="completed" value={moneyValue[2]} />
                <MoneyDashboardItem type="total" value={moneyValue[3]} />
            </div>
            <div className='admin-money-search'>
                <img src={searchIcon} alt="" width="20" height="20" />
                <input
                    type="text"
                    placeholder='사용자명, 사용자ID, 강의명으로 검색...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className='admin-money-navbar'>
                <NavLink to='deposit' className={`${navActive[0] ? "admin-money-nav-active" : "admin-money-nav-default"}`} onClick={() => setNavActive([true, false])}>입금</NavLink>
                <NavLink to='payment' className={`${navActive[1] ? "admin-money-nav-active" : "admin-money-nav-default"}`} onClick={() => setNavActive([false, true])}>정산</NavLink>
            </div>
            <div className='admin-money-content'>
                <PageContext.Provider value={{ pageNow, setPageNow, total, setPages, setMoneyList, showList, filteredList, setFilteredList, moneyList }}>
                    <Outlet />
                </PageContext.Provider >
            </div>
            <div className='deposit-pagination'>
                <button className='deposit-page-button' onClick={() => handlePageNow(pagination[0] - 5)} disabled={!canClick[0]}><img src={right} alt="" width='5px' height='10px' style={{ transform: 'scaleX(-1)' }} /></button>
                <button className={pageSelected[0] ? 'deposit-page-button-selected' : 'deposit-page-button'} onClick={() => handlePageNow(pagination[0])} style={{ display: `${pagination[0] === 0 ? 'none' : 'flex'}` }}><p>{pagination[0]}</p></button>
                <button className={pageSelected[1] ? 'deposit-page-button-selected' : 'deposit-page-button'} onClick={() => handlePageNow(pagination[1])} style={{ display: `${pagination[1] === 0 ? 'none' : 'flex'}` }}><p>{pagination[1]}</p></button>
                <button className={pageSelected[2] ? 'deposit-page-button-selected' : 'deposit-page-button'} onClick={() => handlePageNow(pagination[2])} style={{ display: `${pagination[2] === 0 ? 'none' : 'flex'}` }}><p>{pagination[2]}</p></button>
                <button className={pageSelected[3] ? 'deposit-page-button-selected' : 'deposit-page-button'} onClick={() => handlePageNow(pagination[3])} style={{ display: `${pagination[3] === 0 ? 'none' : 'flex'}` }}><p>{pagination[3]}</p></button>
                <button className={pageSelected[4] ? 'deposit-page-button-selected' : 'deposit-page-button'} onClick={() => handlePageNow(pagination[4])} style={{ display: `${pagination[4] === 0 ? 'none' : 'flex'}` }}><p>{pagination[4]}</p></button>
                <button className='deposit-page-button' onClick={() => handlePageNow(pagination[0] + 5)} disabled={!canClick[1]}><img src={right} alt="" width='5px' height='10px' /></button>
            </div>
        </div>
    )
}

export default Money
