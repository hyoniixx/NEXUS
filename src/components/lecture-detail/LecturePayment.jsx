import React, { useContext, useEffect, useState } from 'react'
import './LecturePayment.css'
import './LecturePaymentModal.css'
import close from '../../assets/reviewModalClose.svg'
import { userContext } from '../../App';
import { createMoney } from '../../service/MoneyManagement';
import { updateUser } from '../../service/UserService';

function LecturePayment({ isModal, onClose, price, title, instructorId, instructorEmail, lectureId, onPaymentSuccess }) {
    const { userData } = useContext(userContext);
    const [step, setStep] = useState('main');

    // 모달 열릴 때마다 step 초기화
    useEffect(() => {
        if (isModal) setStep('main');
    }, [isModal])

    if (!isModal) return null;

    const handlePayment = async () => {
        try {
            await createMoney({
                price: price,
                student: userData.userName,
                studentEmail: userData.email,
                instructor: instructorId,
                instructorEmail: instructorEmail,
                title: title,
                createdAt: new Date().toISOString()
            });

            // 유저 lectures 배열에 강의 ID 추가
            await updateUser(userData.uid, {
                lectures: [...(userData.lectures || []), lectureId]
            });

            console.log("✅ 결제 완료");
            onPaymentSuccess();
            onClose();
        } catch (e) {
            console.error("❌ 결제 실패", e);
        }
    };

    return (
        <div className='payment-modal-background' onClick={() => setStep('cancelConfirm')}>
            <div className='payment-modal-box' onClick={(e) => e.stopPropagation()}>

                {step === 'main' && (
                    <>
                        <div className='payment-modal-header'>
                            <h1>수강 신청</h1>
                            <img src={close} width='20px' height='20px' onClick={() => setStep('cancelConfirm')} />
                        </div>
                        <div className='payment-modal-body'>
                            <div className='payment-modal-info'>
                                <p className='payment-modal-label'>강의명</p>
                                <p className='payment-modal-value'>{title}</p>
                            </div>
                            <div className='payment-modal-info'>
                                <p className='payment-modal-label'>결제 금액</p>
                                <h2 className='payment-modal-price'>{Number(price).toLocaleString()}원</h2>
                            </div>
                            <div className='payment-modal-notice'>
                                <p>결제 후 환불은 불가합니다.</p>
                            </div>
                        </div>
                        <div className='payment-modal-footer'>
                            <button className='payment-btn-cancel' onClick={() => setStep('cancelConfirm')}>취소</button>
                            <button className='payment-btn-primary' onClick={() => setStep('payConfirm')}>결제하기</button>
                        </div>
                    </>
                )}

                {step === 'cancelConfirm' && (
                    <>
                        <article className='c-modal-ct-custom '>
                            <h3>수강 신청 취소</h3>
                            <p>수강 신청을 취소하시겠습니까?</p>
                        </article>
                        <div className='payment-modal-footer'>
                            <button className='payment-btn-cancel' onClick={() => setStep('main')}>아니오</button>
                            <button className='payment-btn-primary' onClick={onClose}>예</button>
                        </div>
                    </>
                )}

                {step === 'payConfirm' && (
                    <>
                        <article className='c-modal-ct-custom '>
                            <h3>결제 확인</h3>
                            <p><span className='payment-modal-price-inline'>{Number(price).toLocaleString()}원</span>이 결제됩니다.<br />진행하시겠습니까?</p>
                        </article>
                        <div className='payment-modal-footer'>
                            <button className='payment-btn-cancel' onClick={() => setStep('main')}>취소</button>
                            <button className='payment-btn-primary' onClick={handlePayment}>확인</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LecturePayment