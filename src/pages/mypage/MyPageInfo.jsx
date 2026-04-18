import React, { useContext, useDebugValue } from 'react'
import { userContext } from '../../App';
import tier1 from '../../assets/tier1.png'
import tier2 from '../../assets/tier2.png'
import tier3 from '../../assets/tier3.png'
import tier4 from '../../assets/tier4.png'
import tier5 from '../../assets/tier5.png'
import tier6 from '../../assets/tier6.png'
import tier7 from '../../assets/tier7.png'
import tier8 from '../../assets/tier8.png'
import tier9 from '../../assets/tier9.png'
import myProfile from '../../assets/myPageProfile.svg'
import { useNavigate } from 'react-router-dom';

function MyPageInfo() {
    const { userData, dispatch } = useContext(userContext);
    const navigate = useNavigate();
    const TIER_IMAGES = {
        1: tier1,
        2: tier2,
        3: tier3,
        4: tier4,
        5: tier5,
        6: tier6,
        7: tier7,
        8: tier8,
        9: tier9,
    };

    return (
        <section className='m-myPage-myInfo'>
            <div className='m-myPage-img'>
                <img src={myProfile} />
            </div>
            <article >
                <div className='m-myPage-myInfo-top'>
                    <h4>{userData.userName}</h4>
                    <img src={TIER_IMAGES[userData.csGrade]} />
                    <button onClick={() => navigate('edit-profile')}>프로필 수정</button>
                </div>
                <div className='m-myPage-myInfo-bottom'>
                    <p>이메일: </p><span>{userData.email}</span>
                    <p>생년월일: </p><span>{userData.birthDate}</span>
                    <p>cs 점수: </p><span>{userData.csScore}</span>
                    <p>가입일: </p><span>{userData.createAt.toDate().toLocaleString()}</span>
                </div>
            </article>
        </section >
    )
}

export default MyPageInfo
