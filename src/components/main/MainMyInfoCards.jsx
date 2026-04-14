import profileIcon from '../../assets/profileIcon.svg'
import lectureIcon from '../../assets/lectureIcon.svg'
import duoIcon from '../../assets/duoIcon.svg'
import moneyIcon from '../../assets/moneyIcon.svg'
import listIcon from '../../assets/listIcon.svg'
import { useNavigate } from 'react-router-dom';
function MainMyInfoCards({ type }) {
    var text = '';
    var image = '';
    var link = '';
    const navigate = useNavigate();
    switch (type) {
        case "student-lecture":
            text = "강의"
            image = lectureIcon;
            link = 'mypage/student-lecture';
            break;
        case "instructor-lecture":
            text = "강의"
            image = lectureIcon;
            link = 'mypage/instructor';
            break;
        case "lecture-list":
            text = "전체 강의 조회"
            image = listIcon;
            link = 'lecture-list';
            break;
        case "duo":
            text = "듀오 찾기"
            image = duoIcon;
            link = 'duo';
            break;
        case "profile":
            text = '내 프로필';
            image = profileIcon;
            link = 'mypage';
            break;
        case "money":
            text = "정산 관리";
            image = moneyIcon;
            link = 'admin/money'
            break;
        case "member":
            text = "회원 관리"
            image = duoIcon;
            link = 'admin/members';
            break;
        default:
            text = '내 프로필';
            image = profileIcon;
            link = 'mypage';
    }
    return (
        <div className='main-myInfo-card' onClick={() => navigate(`/${link}`)}>
            <div className='main-myInfoCard-icon'>
                <img src={image} alt="" width='24px' height='24px' />
            </div>
            <p>{text}</p>
        </div >
    )
}

export default MainMyInfoCards