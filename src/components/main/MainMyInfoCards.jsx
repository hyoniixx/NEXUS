import profileIcon from '../../assets/profileIcon.svg'
import lectureIcon from '../../assets/lectureIcon.svg'
import duoIcon from '../../assets/duoIcon.svg'
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
        default:
            text = '내 프로필';
            image = profileIcon;
            link = 'mypage';
    }
    return (
        <div className='main-myInfo-cards' onClick={() => navigate(`/${link}`)}>
            <div className='main-myInfoCard-icon'>
                <img src={image} alt="" width='24px' height='24px' />
            </div>
            <p>{text}</p>
        </div >
    )
}

export default MainMyInfoCards