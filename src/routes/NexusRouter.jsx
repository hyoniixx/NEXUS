import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import NexusMainGuest from "../pages/NexusMainGuest";
import NexusMainStudent from "../pages/main/NexusMainStudent";
import NexusMainInstructor from "../pages/main/NexusMainInstructor";
import LectureList from "../pages/lecture/LectureList";
import CreateLecture from "../pages/lecture/CreateLecture";
import Duo from "../pages/duo/Duo";
import Gacha from "../pages/gacha/Gacha";
import NexusMainAdmin from "../pages/main/NexusMainAdmin";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import MyPage from "../pages/mypage/MyPage";
import EditProfile from "../pages/mypage/EditProfile";
import LectureDetail from "../pages/lecture/LectureDetail";
import Reviews from "../pages/lecture/review/Reviews";
import EditLecture from "../pages/lecture/EditLecture";
import Wish from "../pages/wish/Wish";
import MyDuos from "../pages/mypage/MyDuos";
import StudentMyLectures from "../pages/mypage/StudentMyLectures";
import InstructorMy from "../pages/mypage/InstructorMy";
import InstructorMyLectures from "../pages/mypage/InstructorMyLectures";
import InstructorMyStudents from "../pages/mypage/InstructorMyStudents";
import Chat from "../pages/chat/Chat";
import Money from "../pages/admin/Money";
import Members from "../pages/admin/Members";
import Deposit from "../pages/admin/Deposit";
import Payment from "../pages/admin/Payment";

export const NexusRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // 메인페이지
            {
                index: true,
                element: <NexusMainGuest />
            },
            {
                path: 'student',
                element: <NexusMainStudent />
            },
            {
                path: 'instructor',
                element: <NexusMainInstructor />
            },
            {
                path: 'admin',
                element: <NexusMainAdmin />
            },
            // 강의 전체 조회
            {
                path: 'lecture-list',
                element: <LectureList />
            },
            // 강의 상세 조회
            {
                path: 'lecture/:id',
                element: <LectureDetail />
            },
            {
                path: 'lecture/:id/reviews',
                element: <Reviews />
            },
            // 강의 등록 폼
            {
                path: 'create-lecture',
                element: <CreateLecture />
            },
            {
                path: 'edit-lecture/:id',
                element: <EditLecture />
            },
            // 찜목록
            {
                path: 'wish',
                element: <Wish />
            },
            // 듀오
            {
                path: 'duo',
                element: <Duo />
            },
            //뽑기
            {
                path: 'gacha',
                element: <Gacha />
            },
            //로그인,회원가입
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            //마이페이지
            {
                path: 'mypage',
                element: <MyPage />
            },
            {
                path: 'mypage/edit-profile',
                element: <EditProfile />
            },
            {
                path: 'mypage/my-duo',
                element: <MyDuos />
            },
            // 마이페이지 - instructor
            {
                path: 'mypage/instructor',
                element: <InstructorMy />,
                children: [
                    {
                        index: true,
                        element: <InstructorMyLectures />
                    },
                    {
                        path: 'students',
                        element: <InstructorMyStudents />
                    }
                ]
            },
            // 마이페이지 - student
            {
                path: 'mypage/student-lecture',
                element: <StudentMyLectures />
            },
            // 채팅
            {
                path: 'chat',
                element: <Chat />
            },
            // 관리자 기능들
            {
                path: 'admin/money',
                element: <Money />,
                children: [
                    {
                        path: 'deposit',
                        element: <Deposit />
                    },
                    {
                        path: 'payment',
                        element: <Payment />
                    }
                ]
            },
            {
                path: 'admin/members',
                element: <Members />
            }
        ]
    }
])