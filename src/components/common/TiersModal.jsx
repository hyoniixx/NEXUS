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

function TiersModal({ setIsModal }) {
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
                <article className='c-tiermodal-top'>
                    <div className='c-tiermodal-title'>
                        <img src={tier} /><h4>CS 등급표</h4>
                    </div>
                    <p>현재 등급: <span>{TIER_IMAGES[userData.csGrade].tier}</span> {`(${userData.csScore}점)`}</p>
                </article>
                <article className='c-tiermodal-middle'>
                    <p>CS 점수는 듀오 매칭에서 상대방에게 받는 평가로 점수가 올라가거나 내려가며, 점수에 따라 등급이 구분되는 평판 시스템입니다.</p>
                    <table className='c-tiermodal-table'>
                        <tr className='c-tiermodal-tr-head'>
                            <td>등급</td>
                            <td>배지</td>
                            <td>총 점수</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 1 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>미니언</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[1].img} /></td>
                            <td className='c-tiermodal-td-score'>0~30 (기본10)</td>
                        </tr>
                        <tr className='c-tiermodal-tr ' id={userData.csGrade === 2 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>탱크 미니언</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[2].img} /></td>
                            <td className='c-tiermodal-td-score'>31~50</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 3 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>바위게</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[3].img} /></td>
                            <td className='c-tiermodal-td-score'>51~70</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 4 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>돌거북</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[4].img} /></td>
                            <td className='c-tiermodal-td-score'>71~100</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 5 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>레드</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[5].img} /></td>
                            <td className='c-tiermodal-td-score'>101~200</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 6 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>드래곤</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[6].img} /></td>
                            <td className='c-tiermodal-td-score'>201~300</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 7 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>전령</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[7].img} /></td>
                            <td className='c-tiermodal-td-score'>301~500</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 8 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>바론</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[8].img} /></td>
                            <td className='c-tiermodal-td-score'>501~999</td>
                        </tr>
                        <tr className='c-tiermodal-tr' id={userData.csGrade === 9 && 'c-tiermodal-select'}>
                            <td className='c-tiermodal-td-tier'>장로 드래곤</td>
                            <td className='c-tiermodal-img'><img src={TIER_IMAGES[9].img} /></td>
                            <td className='c-tiermodal-td-score'>1000~</td>
                        </tr>
                    </table>
                </article>
                <article className='c-tiermodal-bottom'>
                    <button onClick={closeModal}>확인</button>
                </article>
            </div>
        </section>
    )
}

export default TiersModal
