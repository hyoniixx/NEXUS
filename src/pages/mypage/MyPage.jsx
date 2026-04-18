import React, { useContext } from 'react'
import { userContext } from '../../App'
import './MyPage.css';
import MyPageInfo from './MyPageInfo';
import MyPageMenu from '../../components/mypage/MyPageMenu';
import Footer from '../../layout/Footer';



function MyPage() {
    const { userData } = useContext(userContext);


    const duoMenu = {
        title: '내 듀오',
        content: '듀오 파트너 찾기',
        url: 'my-duo'
    }

    const studnetMenu = {
        title: '내 신청 강의',
        content: '수강 신청한 강의 확인',
        url: 'student-lecture'
    }

    const instructorMenu = {
        title: '내 강의',
        content: '강의와 수강생 관리',
        url: 'instructor',
    }


    return (
        <div className='m-myPage'>
            <main className='m-myPage-main'>
                <MyPageInfo />
                {userData.role !== 'admin' &&
                    <section className='m-myPage-myMenu'>
                        <MyPageMenu menu={userData.role === 'student' ? studnetMenu : instructorMenu} />
                        <MyPageMenu menu={duoMenu} />
                    </section>}
            </main>
            <Footer />
        </div>
    )
}

export default MyPage
