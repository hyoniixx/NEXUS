import React, { useContext } from 'react'
import './TiersModal.css';
import icon from '../../assets/approve.png'
import tier from '../../assets/pleaseApprove.png'


function TwoButtonModal({ setIsModal, isModal, handleApproval, setOneButtonModal }) {

    const deny = () => { //그냥 닫히게
        setIsModal(false);
    }

    const accept = () => { //닫히면서 db건드리게
        setIsModal(false);
        handleApproval();
        setOneButtonModal(true);
    }


    if (!isModal) return;


    return (
        <section className="c-modal-background" onClick={deny} >
            <div className="c-tier-modal-ct" onClick={(e) => e.stopPropagation()}>
                {/* 제목쪽 */}
                <article className='c-tiermodal-top'>
                    <div className='c-tiermodal-title' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={icon} width='20px' height='20px' style={{ marginRight: '20px' }} /><h4>강사 승인</h4>
                    </div>
                </article>
                <article className='c-tiermodal-middle'>
                    <img src={tier} alt="asd" width='100%' height='100%' />
                </article>
                {/* 나가기 버튼 */}
                <article className='c-tiermodal-bottom'>
                    <button id='c-red-btn' onClick={deny}>닫기</button>
                    <button onClick={accept}>승인</button>
                </article>
            </div>
        </section>
    )
}

export default TwoButtonModal

