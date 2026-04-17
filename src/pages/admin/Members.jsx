import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Members.css'
import leftArrow from '../../assets/leftArrow.svg'
import search from '../../assets/searchIcon.svg'
import right from '../../assets/rightIcon.svg'
import MemberListItem from '../../components/admin/MemberListItem'

function Members() {
    const [navSelected, setNavSelected] = useState([true, false, false, false]);
    const [onlyBlacklist, setOnlyBlacklist] = useState(true);
    const total = 27; //전체 데이터 수
    const [pageNow, setPageNow] = useState(1); //현재 선택된 페이지
    const [pages, setPages] = useState(1); //전체 페이지수
    const [pagination, setPagination] = useState([1, 0, 0, 0, 0]); //페이지네이션
    const [pageSelected, setPageSelected] = useState([true, false, false, false, false]) //페이지 아이템들 상태 관리(눌려있는지)
    const [canClick, setCanClick] = useState([false, true]) //좌우 이동 버튼 활성화 관리

    const navigate = useNavigate();

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
    }, [])
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
        <div className='admin-members-layout'>
            <div className='admin-members-header'>
                <div
                    className='admin-members-header-back'
                    onClick={() => navigate('/mypage')}
                >
                    <img src={leftArrow} alt="" style={{ width: '20px', height: '20px' }} />
                    <p>마이페이지로 돌아가기</p>
                </div>
                <div className='admin-members-header-title'>
                    <h2>회원 조회</h2>
                    <p>모든 회원 정보를 조회하고 관리합니다.</p>
                </div>
            </div>
            <div className='admin-members-search'>
                <div className='admin-members-search-box'>
                    <img src={search} alt="" width='20px' height='20px' />
                    <input type="text" placeholder='이름, 아이디, 이메일, 전화번호로 검색...' />
                </div>
                <select name="member-filter" id="member-filter">
                    <option value="">가입일 순</option>
                    <option value="">이름 순</option>
                </select>
            </div>
            <div className='admin-members-navbar'>
                <div
                    className='admin-members-navbar-all'
                    onClick={() => setNavSelected([true, false, false, false])}
                    style={{ borderBottom: navSelected[0] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[0] ? '#3B82F6' : '#94A3B8' }}>전체</p>
                </div>
                <div
                    className='admin-members-navbar-student'
                    onClick={() => setNavSelected([false, true, false, false])}
                    style={{ borderBottom: navSelected[1] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[1] ? '#3B82F6' : '#94A3B8' }}>수강생</p>
                </div>
                <div
                    className='admin-members-navbar-instructor'
                    onClick={() => setNavSelected([false, false, true, false])}
                    style={{ borderBottom: navSelected[2] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[2] ? '#3B82F6' : '#94A3B8' }}>강사</p>
                </div>
                <div
                    className='admin-members-navbar-blacklist'
                    onClick={() => setNavSelected([false, false, false, true])}
                    style={{ borderBottom: navSelected[3] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[3] ? '#3B82F6' : '#94A3B8' }}>블랙리스트</p>
                </div>
            </div>
            <div className='admin-members-filter'>
                <button
                    className='admin-members-filter-button'
                    style={{
                        display: navSelected[3] ? "none" : "flex",
                        background: !onlyBlacklist ? "#3B82F6" : "#1E293B"
                    }}
                    onClick={() => setOnlyBlacklist(false)}
                >
                    블랙리스트 제외
                </button>
                <button
                    className='admin-members-filter-button'
                    style={{
                        display: navSelected[3] ? "none" : "flex",
                        background: onlyBlacklist ? "#3B82F6" : "#1E293B"
                    }}
                    onClick={() => setOnlyBlacklist(true)}
                >
                    블랙리스트만 보기
                </button>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)} / {total}명</p>
            </div>
            <div className='admin-members-list'>
                <MemberListItem name='김태정' id='user01' role='student' email='user01@nexus.com' date='2025.04.01' score='93' isblack='false' />
                <MemberListItem name='김블랙' id='user02' role='student' email='user02@nexus.com' date='2025.04.04' score='11' isblack='true' />
                <MemberListItem name='이지경' id='user03' isStrm='true' role='instructor' email='inst99@nexus.com' date='2022.02.11' score='153' isblack='false' />
                <MemberListItem name='대상혁' id='user04' isPro='true' isStrm='true' role='instructor' email='faker@nexus.com' date='2016.04.01' score='939' isblack='false' />
                <MemberListItem name='블랙됨' id='user05' role='student' email='ban1919@nexus.com' date='2022.03.28' score='3' isblack='true' />
            </div>
            <div className='members-pagination'>
                <button className='members-page-button' onClick={() => handlePageNow(pagination[0] - 5)} disabled={!canClick[0]}><img src={right} alt="" width='5px' height='10px' style={{ transform: 'scaleX(-1)' }} /></button>
                <button className={pageSelected[0] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[0])} style={{ display: `${pagination[0] === 0 ? 'none' : 'flex'}` }}><p>{pagination[0]}</p></button>
                <button className={pageSelected[1] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[1])} style={{ display: `${pagination[1] === 0 ? 'none' : 'flex'}` }}><p>{pagination[1]}</p></button>
                <button className={pageSelected[2] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[2])} style={{ display: `${pagination[2] === 0 ? 'none' : 'flex'}` }}><p>{pagination[2]}</p></button>
                <button className={pageSelected[3] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[3])} style={{ display: `${pagination[3] === 0 ? 'none' : 'flex'}` }}><p>{pagination[3]}</p></button>
                <button className={pageSelected[4] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[4])} style={{ display: `${pagination[4] === 0 ? 'none' : 'flex'}` }}><p>{pagination[4]}</p></button>
                <button className='members-page-button' onClick={() => handlePageNow(pagination[0] + 5)} disabled={!canClick[1]}><img src={right} alt="" width='5px' height='10px' /></button>
            </div>
        </div>
    )
}

export default Members
