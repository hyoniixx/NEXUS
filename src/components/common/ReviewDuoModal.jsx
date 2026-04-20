import React, { useContext, useEffect, useState } from 'react'
import './Modal.css';
import './ReviewDuoModal.css';
import { chatContext } from '../../pages/chat/Chat';
import { getUser, updateUser } from '../../service/UserService';

function ReviewDuo({ handleUpdateChat, clickEvent, setIsModal }) {
    const { currentChatInfo } = useContext(chatContext);
    const {
        currentChatId,
        currentChatOpponentId,
        currentChatOpponent
    } = currentChatInfo

    const [duoReview, setDuoReview] = useState('');
    const [opponentData, setOpponentData] = useState({})

    useEffect(() => {
        const fetchOpponentData = async () => {
            const data = await getUser(currentChatOpponentId)
            setOpponentData(data);
        }
    }, [])

    const handleClickReview = (e) => {
        setDuoReview(e.target.id)
    }

    const closeModal = () => {
        setIsModal(false);
    }

    const activeModal = () => {
        setIsModal(false);
    }

    const gradeByScore = (score) => {
        const grades = [
            { grade: 1, max: 30 },
            { grade: 2, max: 50 },
            { grade: 3, max: 70 },
            { grade: 4, max: 100 },
            { grade: 5, max: 200 },
            { grade: 6, max: 300 },
            { grade: 7, max: 500 },
            { grade: 8, max: 999 },
        ];

        const result = grades.find(g => score <= g.max);

        return result ? result.grade : 9;
    };

    const handleEditBtn = async () => {
        let score = opponentData.csScore;
        switch (duoReview) {
            case 'very good':
                score += 10;
                break;
            case 'good':
                score += 6;
                break;
            case 'soso':
                score = score;
                break;
            case 'bad':
                score -= 3;
                break;
            case 'very bad':
                score -= 5;
                break;
        }

        try {
            const updateData = {
                csScore: score,
                csScoreMax: Math.max(opponentData.csScoreMax, score),
                csGrade: gradeByScore(score),
                isBlacklist: score <= 0 ? true : false
            }
            const resultUser = await updateUser(currentChatOpponentId, updateData)
        } catch (error) {
            console.log('회원점수 수정 실패', error)
        }
    }



    return (
        <section className="c-modal-background" onClick={closeModal} >
            <div className="c-review-duo-modal-ct" onClick={(e) => e.stopPropagation()}>
                <article>
                    <h3>듀오 평가</h3>
                    <p>{currentChatOpponent.nickname}님과의 듀오 경험을 평가해주세요.</p>
                </article>
                <article className='c-review-duo-modal-select-ct'>
                    <div id='very bad' onClick={(e) => handleClickReview(e)} className={duoReview === 'very bad' && 'c-modal-btn-select'}>
                        <p>😞</p>
                        <p>정말 별로예요</p>
                    </div>
                    <div id='bad' onClick={(e) => handleClickReview(e)} className={duoReview === 'bad' && 'c-modal-btn-select'}>
                        <p>🙁</p>
                        <p>별로예요</p>
                    </div>
                    <div id='soso' onClick={(e) => handleClickReview(e)} className={duoReview === 'soso' && 'c-modal-btn-select'}>
                        <p>😐</p>
                        <p>보통이에요</p>
                    </div>
                    <div id='good' onClick={(e) => handleClickReview(e)} className={duoReview === 'good' && 'c-modal-btn-select'}>
                        <p>😊</p>
                        <p>좋아요</p>
                    </div>
                    <div id='very good' onClick={(e) => handleClickReview(e)} className={duoReview === 'very good' && 'c-modal-btn-select'}>
                        <p>🥰</p>
                        <p>정말 좋아요</p>
                    </div>
                </article>
                <article className='c-modal-btn-ct'>
                    <button onClick={closeModal} className='c-modal-btn-no'>취소</button>
                    <button disabled={!duoReview} onClick={() => { closeModal(); handleUpdateChat(clickEvent); }} className={duoReview ? 'c-modal-btn-yes-blue' : 'c-modal-btn-disable'}>평가완료</button>
                </article>
            </div>
        </section>
    )
}

export default ReviewDuo
