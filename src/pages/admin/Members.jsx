import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Members.css'
import leftArrow from '../../assets/leftArrow.svg'
import search from '../../assets/searchIcon.svg'
import right from '../../assets/rightIcon.svg'
import MemberListItem from '../../components/admin/MemberListItem'
import { getUserList } from '../../service/MemberViewService'
import teemo from '../../assets/teemo.png'

function Members() {
    const [total, setTotal] = useState(27); //전체 데이터 수
    const [pageNow, setPageNow] = useState(1); //현재 선택된 페이지
    const [pages, setPages] = useState(1); //전체 페이지수
    const [pagination, setPagination] = useState([1, 0, 0, 0, 0]); //페이지네이션
    const [pageSelected, setPageSelected] = useState([true, false, false, false, false]) //페이지 아이템들 상태 관리(눌려있는지)
    const canClick = [pageNow > 1, pageNow < pages];

    const navigate = useNavigate(); //뒤로가기 연결

    const [navSelected, setNavSelected] = useState([true, false, false, false]); //navBar, 전체 | 수강생 | 강사 | 블랙리스트
    const [onlyBlacklist, setOnlyBlacklist] = useState(false); //false: 블랙리스트제외 | true : 블랙리스트만 보기
    const [onlyUnapproved, setOnlyUnapproved] = useState(false); // true : 미승인 강사만 보기
    const [inputValue, setInputValue] = useState(''); //검색창
    const [filterSelected, setFilterSelected] = useState([true, false]); //정렬 기준

    const [users, setUsers] = useState([]); //전체 유저 데이터
    const [filterUsers, setFilterUsers] = useState([]);//검색 또는 필터링에 걸린 유저들
    const [showUsers, setShowUsers] = useState([]); //필터링 이후 페이지네이션에 의해 표시할 유저 데이터

    //정렬순서 건드릴때 : 상태값 변경하고, 1페이지로 이동
    const handleFilter = (e) => {
        setFilterSelected(e.target.value);
        setPageNow(1);
        setInputValue('')
        console.log(e.target.value)
    }

    //navbar 건드릴때 : 상태값 변경하고, 1페이지로 이동
    const handleNav = (num) => {
        // 기존 코드 유지
        if (num === 3) {
            setOnlyBlacklist(true)
        } else if (onlyBlacklist && navSelected[3]) {
            setOnlyBlacklist(false)
        };

        setOnlyUnapproved(false);

        var temp = [false, false, false, false];
        temp[num] = true;
        setNavSelected(temp);
        setPageNow(1);
        setInputValue('');
    }

    //유저정보 불러오기(최초 1회 마운트 시점)
    useEffect(() => {
        const initiallize = async () => {
            var temp = await getUserList();
            var a = temp.filter((item) => item.role !== 'admin')
            setUsers(a);
            setTotal(a.length);
            setFilterUsers(a);
            console.log('?', a)
        }
        initiallize();
    }, [])

    //데이터 불러온 뒤, 총 회원수 알아낸거 바탕으로 페이지네이션 구성
    useEffect(() => {
        // setTotal(users.length);
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

    /*
    ❕검색 필터 관련❕
    처음엔 그냥 아래 기능들을 각각으로 분류했는데, 검색과 필터를 동시에 사용하였을때 두 조건의 교집합에서의 문제가 발생함.
    1) user 전체에서 필터링을 잡자니, 다른 조건이 반영이 안된다.
    2) filterUsers에서 잡자니, 어떤 조건A,B를 걸고 B를 취소하고 A를 취소하면 A&B는 filterUsers에서 영원히 빠짐.
    그래서 해결 -> useEffect의 의존성 배열에 세가지 모두 포함시킨다. -> 해결됨.
    정렬순서 및 navbar 선택 시 1페이지로 이동하게 하는 것은 onclick 이벤트에 추가함.
    */
    useEffect(() => {
        //[1]검색
        let filtered = users.filter((item) =>
            item.email.includes(inputValue) || item.userName.includes(inputValue)
        );

        //[2]정렬
        switch (filterSelected) {
            case "sortByName":
                filtered = [...filtered].sort((a, b) => a.userName.localeCompare(b.userName));
                break;
            case "sortByDate":
                filtered = [...filtered].sort((a, b) => b.createAt.toDate() - a.createAt.toDate());
                break;
        }

        //[3]navbar 필터
        const selectedIndex = navSelected.findIndex(item => item === true);
        switch (selectedIndex) {
            case 1:
                filtered = filtered.filter(item => item.role === 'student');
                break;
            case 2:
                filtered = filtered.filter(item => item.role === 'instructor');
                break;
            case 3:
                filtered = filtered.filter(item => item.isBlacklist === true);
                break;
        }

        //[4]블랙리스트만 보기
        if (onlyBlacklist) {
            filtered = filtered.filter(item => item.isBlacklist === true);
        }

        //[5]미승인 강사 필터 
        if (onlyUnapproved) {
            filtered = filtered.filter(
                item => item.role === 'instructor' && item.isApproval === false
            );
        }

        setFilterUsers(filtered);
        setTotal(filtered.length);
        setPageNow(1);

    }, [inputValue, filterSelected, navSelected, onlyBlacklist, onlyUnapproved]);




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

        //현재 페이지에 표시할 멤버리스트아이템 내역 관리
        var tempShow = filterUsers.slice(pageNow * 5 - 5, pageNow * 5);
        setShowUsers(tempShow);
    }, [pageNow, pages, filterUsers, users])

    return (
        <div className='admin-members-layout'>
            <div className='admin-members-header'>
                <div
                    className='admin-members-header-back'
                    onClick={() => navigate('/mypage')}
                >
                    <img src={leftArrow} style={{ width: '20px', height: '20px' }} />
                    <p>마이페이지로 돌아가기</p>
                </div>
                <div className='admin-members-header-title'>
                    <h2>회원 조회</h2>
                    <p>모든 회원 정보를 조회하고 관리합니다.</p>
                </div>
            </div>
            <div className='admin-members-search'>
                <div className='admin-members-search-box'>
                    <img src={search} width='20px' height='20px' />
                    <input
                        type="text"
                        placeholder='이름 또는 이메일로 검색...'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                <select name="member-filter" id="member-filter" onChange={(e) => handleFilter(e)}>
                    <option value="sortByDate">최근 가입 순</option>
                    <option value="sortByName">이름 순</option>
                </select>
            </div>
            <div className='admin-members-navbar'>
                <div
                    className='admin-members-navbar-all'
                    onClick={() => handleNav(0)}
                    style={{ borderBottom: navSelected[0] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[0] ? '#3B82F6' : '#94A3B8' }}>전체</p>
                </div>
                <div
                    className='admin-members-navbar-student'
                    onClick={() => handleNav(1)}
                    style={{ borderBottom: navSelected[1] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[1] ? '#3B82F6' : '#94A3B8' }}>수강생</p>
                </div>
                <div
                    className='admin-members-navbar-instructor'
                    onClick={() => handleNav(2)}
                    style={{ borderBottom: navSelected[2] ? '2px solid #3B82F6' : '' }}
                >
                    <p style={{ color: navSelected[2] ? '#3B82F6' : '#94A3B8' }}>강사</p>
                </div>
                <div
                    className='admin-members-navbar-blacklist'
                    onClick={() => handleNav(3)}
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
                        background: !onlyBlacklist && !onlyUnapproved ? "#3B82F6" : "#1E293B"
                    }}
                    onClick={() => {
                        setOnlyBlacklist(false);
                        setOnlyUnapproved(false);
                    }}
                >
                    전체 보기
                </button>
                <button
                    className='admin-members-filter-button'
                    style={{
                        display: navSelected[3] ? "none" : "flex",
                        background: onlyBlacklist ? "#3B82F6" : "#1E293B"
                    }}
                    onClick={() => {
                        setOnlyBlacklist(true);
                        setOnlyUnapproved(false);
                    }}
                >
                    블랙리스트만 보기
                </button>
                <button
                    className='admin-members-filter-button'
                    style={{
                        display: navSelected[2] ? "flex" : "none",
                        background: onlyUnapproved ? "#3B82F6" : "#1E293B"
                    }}
                    onClick={() => {
                        setOnlyUnapproved(true);
                        setOnlyBlacklist(false);
                    }}
                >
                    미승인 강사만 보기
                </button>
                <p>{Number(pageNow) * 5 - 4}-{Math.min(Number(pageNow) * 5, total)} / {total}명</p>
            </div>
            <div className='admin-members-list'>
                {showUsers.length !== 0 ? showUsers.map((user) => {
                    return (
                        <MemberListItem key={user.id} id={user.id} name={user.userName} birth={user.birthDate} role={user.role} email={user.email} date={user.createAt.toDate()} score={user.csScore} isblack={user.isBlacklist} isApproval={user.isApproval || undefined} />
                    )
                }) :
                    <div className='admin-members-nothing'>
                        <h1>검색된 정보가 없습니다.</h1>
                        <img src={teemo} width='300px' height='300px' />
                        <h6>조건이나 검색어를 변경해보세요.</h6>
                    </div>}
                { }
                {/* <MemberListItem name='김태정' id='user01' role='student' email='user01@nexus.com' date='2025.04.01' score='93' isblack='false' />
                <MemberListItem name='김블랙' id='user02' role='student' email='user02@nexus.com' date='2025.04.04' score='11' isblack='true' />
                <MemberListItem name='이지경' id='user03' isStrm='true' role='instructor' email='inst99@nexus.com' date='2022.02.11' score='153' isblack='false' />
                <MemberListItem name='대상혁' id='user04' isPro='true' isStrm='true' role='instructor' email='faker@nexus.com' date='2016.04.01' score='939' isblack='false' />
                <MemberListItem name='블랙됨' id='user05' role='student' email='ban1919@nexus.com' date='2022.03.28' score='3' isblack='true' /> */}
            </div>
            <div className='members-pagination'>
                <button className='members-page-button' onClick={() => handlePageNow(pagination[0] - 5)} disabled={!canClick[0]}><img src={right} width='5px' height='10px' style={{ transform: 'scaleX(-1)' }} /></button>
                <button className={pageSelected[0] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[0])} style={{ display: `${pagination[0] === 0 ? 'none' : 'flex'}` }}><p>{pagination[0]}</p></button>
                <button className={pageSelected[1] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[1])} style={{ display: `${pagination[1] === 0 ? 'none' : 'flex'}` }}><p>{pagination[1]}</p></button>
                <button className={pageSelected[2] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[2])} style={{ display: `${pagination[2] === 0 ? 'none' : 'flex'}` }}><p>{pagination[2]}</p></button>
                <button className={pageSelected[3] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[3])} style={{ display: `${pagination[3] === 0 ? 'none' : 'flex'}` }}><p>{pagination[3]}</p></button>
                <button className={pageSelected[4] ? 'members-page-button-selected' : 'members-page-button'} onClick={() => handlePageNow(pagination[4])} style={{ display: `${pagination[4] === 0 ? 'none' : 'flex'}` }}><p>{pagination[4]}</p></button>
                <button className='members-page-button' onClick={() => handlePageNow(pagination[0] + 5)} disabled={!canClick[1]}><img src={right} width='5px' height='10px' /></button>
            </div>
        </div>
    )
}

export default Members
