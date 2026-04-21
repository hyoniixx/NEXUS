import React, { useContext } from 'react'
import { userContext } from '../../App';
import './TiersModal.css';
import tier1 from '../../assets/tier1.png'
import tier2 from '../../assets/tier2.png'
import tier3 from '../../assets/tier3.png'
import tier4 from '../../assets/tier4.png'
import tier5 from '../../assets/tier5.png'
import tier6 from '../../assets/tier6.png'
import tier7 from '../../assets/tier7.png'
import tier8 from '../../assets/tier8.png'
import tier9 from '../../assets/tier9.png'
import tier from '../../assets/tier.svg'

function TwoButtonModal({ setIsModal }) {
    const { userData } = useContext(userContext);

    const closeModal = () => {
        setIsModal(false);
    }

    const TIER_IMAGES = {
        1: { img: tier1, tier: '미니언' },
        2: { img: tier2, tier: '탱크 미니언' },
        3: { img: tier3, tier: '바위게' },
        4: { img: tier4, tier: '돌거북' },
        5: { img: tier5, tier: '레드' },
        6: { img: tier6, tier: '드래곤' },
        7: { img: tier7, tier: '전령' },
        8: { img: tier8, tier: '바론' },
        9: { img: tier9, tier: '장로 드래곤' },
    };





    return (
        <section className="c-modal-background" onClick={closeModal} >
            <div className="c-tier-modal-ct" onClick={(e) => e.stopPropagation()}>
                {/* 제목쪽 */}
                <article className='c-tiermodal-top'>
                    <div className='c-tiermodal-title'>
                        <img src={tier} /><h4>CS 등급표</h4>
                    </div>
                    <p>현재 등급: <span>{TIER_IMAGES[userData.csGrade].tier}</span> {`(${userData.csScore}점)`}</p>
                </article>
                <article className='c-tiermodal-middle'>
                    내용 들어갈 거
                </article>
                {/* 나가기 버튼 */}
                <article className='c-tiermodal-bottom'>
                    <button id='c-red-btn' onClick={closeModal}>확인</button>
                    <button onClick={closeModal}>확인</button>
                </article>
            </div>
        </section>
    )
}

export default TwoButtonModal

