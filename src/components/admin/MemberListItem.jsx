import React, { useState } from 'react'
import './MemberListItem.css'
import pro from '../../assets/memberProbadge.svg'
import strm from '../../assets/memberStrmbadge.svg'
import scoreBadge from '../../assets/memberScorebadge.svg'
import blackBadge from '../../assets/memberBlack.svg'
import whiteBadge from '../../assets/memberWhite.svg'
import { toggleBlackList, instructorApproval } from '../../service/MemberViewService'
import useModal from '../../hooks/useModal'
import Modal from '../common/Modal'
import TwoButtonModal from '../common/TwoButtonModal'

function MemberListItem({ id, name, birth, role, isPro = 'false', isStrm = 'false', email, date, score, isblack, isApproval }) {
    const [blackNow, setBlackNow] = useState(isblack)
    const [approvalNow, setApprovalNow] = useState(isApproval) // ✅ 추가: 승인 상태 관리

    const roleText = role === 'student' ? '수강생' : role === 'instructor' ? '강사' : role === 'admin' ? '관리자' : '알 수 없음';
    const roleColor = role === 'student' ? '#8B5CF6' : role === 'instructor' ? '#3B82F6' : role === 'admin' ? '#d034ef' : '#e52d2d';
    const buttonColor = blackNow === false ? ['rgba(239, 68, 68, 0.10)', '#EF4444'] : ['rgba(0, 201, 80, 0.10)', '#00C950'];
    const want = blackNow ? false : true;

    const modal = useModal();
    const modalText = `${name}님이 블랙리스트에${isblack === true ? "서 제거" : " 추가"}되었습니다.`

    const approvalModal = useModal(); // ✅ 추가: 승인 모달

    const handleBlackList = async () => {
        await toggleBlackList(id, want);
        modal.openModal('123');
        setBlackNow(!blackNow);
    }

    const handleApproval = async () => { // ✅ 추가: 승인 처리 함수
        await instructorApproval(id);
        setApprovalNow(true);
        approvalModal.openModal('approval');
    }

    //승인모달
    const [modalOn, setModalOn] = useState(false);
    const [oneButtonModal, setOneButtonModal] = useState(false);
    const approveComplete = () => {
        modal.closeModal();
        setOneButtonModal(false)
    }

    return (
        <>
            <Modal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='블랙리스트'
                content={modalText}
                type='one'
                color='red'
            />

            <Modal
                isModal={oneButtonModal}
                closeModal={approveComplete}
                activeModal={modal.activeModal}
                title='강사 승인'
                content='강사 승인이 완료되었습니다.'
                type='one'
                color='red'
            />

            <TwoButtonModal isModal={modalOn} setIsModal={setModalOn} handleApproval={handleApproval} setOneButtonModal={setOneButtonModal} />

            <div className='member-list-item'>
                <div className='member-list-item-profile'>
                    <img width="52px" height="52px" style={{ border: '1px solid black' }} />
                    <div className='member-list-item-name'>
                        <h6>{name}</h6>
                        <div className='member-list-badge'>
                            <div
                                className='member-list-probadge'
                                style={{ display: isPro == 'false' ? 'none' : 'flex' }}
                            >
                                <img src={pro} width="12" height="12" />
                                <p>PRO</p>
                            </div>
                            <div
                                className='member-list-strmbadge'
                                style={{ display: isStrm == 'false' ? 'none' : 'flex' }}
                            >
                                <img src={strm} width="12" height="12" />
                                <p>스트리머</p>
                            </div>
                        </div>
                        <p>{birth}</p>
                    </div>
                </div>

                <div className='member-list-item-info'>
                    <div className='member-list-item-role'>
                        <h6>직책 : </h6>
                        <p style={{ color: roleColor }}>{roleText}</p>
                    </div>
                    <div className='member-list-item-email'>
                        <h6>이메일 : </h6>
                        <p>{email}</p>
                    </div>
                </div>

                <div className='member-list-item-footer'>
                    <div className='member-list-item-date'>
                        <h6>가입일 : </h6>
                        <p>{date.toLocaleString()}</p>
                    </div>

                    <div className='member-list-item-manage'>
                        <div className='member-list-item-score'>
                            <img src={scoreBadge} width="32" height="32" />
                            <p>{score}점</p>
                        </div>
                        <div className='member-list-item-button-group'>
                            {/* ✅ 추가: 강사 승인 버튼 */}
                            {role === 'instructor' && !approvalNow && (
                                <button
                                    className='member-list-approval-button' // ✅ 추가: 클래스 네이밍
                                    style={{ display: 'inline', background: 'rgba(59, 130, 246, 0.10)' }} // ✅ inline
                                    onClick={() => setModalOn(true)}
                                >
                                    <p>승인</p>
                                </button>
                            )}

                            <button
                                className='member-list-black-button'
                                style={{ background: buttonColor[0] }}
                                onClick={handleBlackList}
                            >
                                <img src={blackNow === true ? whiteBadge : blackBadge} width="16" height="16" />
                                <p style={{ color: buttonColor[1] }}>{blackNow === false ? '차단' : '해제'}</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberListItem