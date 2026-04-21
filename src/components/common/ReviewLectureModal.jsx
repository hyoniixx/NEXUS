import React, { useContext, useState } from 'react'
import './ReviewLectureModal.css'
import close from '../../assets/reviewModalClose.svg'
import empty from '../../assets/grayStar.svg'
import fill from '../../assets/filledStar.svg'
import { userContext } from '../../App'
import { createReview, updateReview, deleteReview } from '../../service/ReviewService';
import { useParams } from 'react-router-dom';
import Modal from './Modal'
import { updateUser } from '../../service/UserService'

function ReviewLectureModal({ isModal, onClose, review, type, triggerRefresh }) {
    const { id: lectureId } = useParams();
    if (!isModal) return null;
    //type : view | create | edit
    var header = '후기 조회';
    var btnColor = ['#EF4444', '#3B82F6'];
    var btnText = ["삭제", "수정"]
    const before = review?.content || '';
    const { userData } = useContext(userContext);
    const role = userData?.role;
    switch (type) {
        case 'view':
            header = '후기 조회'
            btnColor = ['#1E293B', '#FFF']
            break;
        case 'create':
            header = "후기 작성"
            btnColor = ['#1E293B', '#3B82F6'];
            btnText = ['취소', '작성 완료']
            break;
        case 'edit':
            header = '내 후기 조회'
            btnText = ["삭제", "수정"]
            btnColor = ['#EF4444', '#3B82F6'];
            break;
        default:
            header = '후기 조회';
            break;
    }

    const [star, setStar] = useState(review?.star || 0);
    const [text, setText] = useState(before || '');
    const handleText = (e) => {
        if (e.target.value.length <= 200) {
            setText(e.target.value)
        }
    }
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: '', // alert | confirm
        message: '',
        onConfirm: null
    });

    const handleCreate = async () => {
        if (star === 0 || text.trim() === '') {
            setModalState({
                isOpen: true,
                type: 'alert',
                message: '별점과 내용을 입력해주세요.',
                onConfirm: null
            });
            return;
        }

        try {
            await createReview(lectureId, {
                reviewId: Date.now(),
                uid: userData.uid,
                userName: userData.userName,
                profileImage: null,
                star,
                content: text
            });

            userData.lectures = userData.lectures.filter(l => l !== lectureId);
            updateUser(userData.uid, { ...userData });
            triggerRefresh();
            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateReview(lectureId, review.reviewId, star, text);
            triggerRefresh();
            onClose();
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = () => {
        setModalState({
            isOpen: true,
            type: 'confirm',
            message: '삭제하시겠습니까?',
            onConfirm: async () => {
                try {
                    await deleteReview(lectureId, review.reviewId);

                    // 🔥 1. 부모 리스트 갱신
                    triggerRefresh();

                    // 🔥 2. 리뷰 모달 닫기
                    onClose();

                    // 🔥 3. confirm → alert 전환
                    setModalState({
                        isOpen: true,
                        type: 'alert',
                        message: '해당 리뷰가 삭제되었습니다.',
                        onConfirm: () => {
                            setModalState(prev => ({ ...prev, isOpen: false }));
                        }
                    });

                } catch (e) {
                    console.log(e);
                }
            }
        });
    };

    return (
        <>
            <div className='review-modal-background' onClick={onClose}>
                <div className='review-modal-box' onClick={(e) => e.stopPropagation()}>
                    <div className='review-modal-header'>
                        <h1>{header}</h1>
                        <img
                            src={close}
                            width='20px'
                            height='20px'
                            onClick={onClose}
                        />
                    </div>
                    <div className='review-modal-body'>
                        <div className='review-modal-writer'>
                            <p>작성자</p>
                            <div className='review-modal-profile'>
                                <img src="" width='40px' height='40px' />
                                <p>{type === 'create' ? userData.userName : review?.userName}</p>
                            </div>
                        </div>
                        <div className='review-modal-star'>
                            <p>별점</p>
                            <div className='review-modal-star-list'>
                                <img
                                    src={star > 0 ? fill : empty}
                                    width="32" height="32"
                                    onClick={type === 'view' || role === 'instructor' ? undefined : () => setStar(1)}
                                />
                                <img
                                    src={star > 1 ? fill : empty}
                                    width="32" height="32"
                                    onClick={type === 'view' || role === 'instructor' ? undefined : () => setStar(2)}
                                />
                                <img
                                    src={star > 2 ? fill : empty}
                                    width="32" height="32"
                                    onClick={type === 'view' || role === 'instructor' ? undefined : () => setStar(3)}
                                />
                                <img
                                    src={star > 3 ? fill : empty}
                                    width="32" height="32"
                                    onClick={type === 'view' || role === 'instructor' ? undefined : () => setStar(4)}
                                />
                                <img
                                    src={star > 4 ? fill : empty}
                                    width="32" height="32"
                                    onClick={type === 'view' || role === 'instructor' ? undefined : () => setStar(5)}
                                />
                                <p>{star === 0 ? '선택 안 됨' : `${star}점`}</p>
                            </div>
                        </div>
                        <div className='review-modal-content'>
                            <p>한줄평</p>
                            {type !== 'view' && role !== 'instructor' ? (
                                <textarea
                                    value={text}
                                    onChange={(e) => handleText(e)}
                                    placeholder='수강평을 입력하세요'
                                    rows='9'
                                >
                                </textarea>
                            ) : (
                                <div className='review-modal-content-text' style={{ height: '164.5px' }}>
                                    {before || ''}
                                </div>
                            )}

                            <h6>{type !== 'view' ? `${text.length}/200` : ''}</h6>
                        </div>
                    </div>
                    <div className='review-modal-footer'>
                        {type === "view" ? (
                            <button
                                style={{ backgroundColor: '#1E293B', width: '398.572px' }}
                                onClick={onClose}
                            >
                                닫기
                            </button>
                        ) : role === 'admin' ? (
                            <button
                                style={{ backgroundColor: '#EF4444', width: '398.572px' }}
                                onClick={handleDelete}
                            >
                                삭제
                            </button>
                        ) : type === 'create' ? (
                            <>
                                <button
                                    style={{ backgroundColor: btnColor[0], width: '193.293px' }}
                                    onClick={onClose}
                                >
                                    취소
                                </button>
                                <button
                                    style={{ backgroundColor: btnColor[1], width: '193.293px' }}
                                    onClick={handleCreate}
                                >
                                    작성 완료
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    style={{ backgroundColor: btnColor[0], width: '193.293px' }}
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                                <button
                                    style={{ backgroundColor: btnColor[1], width: '193.293px' }}
                                    onClick={handleUpdate}
                                >
                                    수정
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isModal={modalState.isOpen}
                type={modalState.type === 'confirm' ? 'two' : 'one'}
                content={modalState.message}
                color={modalState.type === 'confirm' ? 'red' : 'blue'}
                closeModal={() => setModalState(prev => ({ ...prev, isOpen: false }))}
                activeModal={() => {
                    if (modalState.onConfirm) {
                        modalState.onConfirm();
                    }
                }}
            />
        </>
    )
}

export default ReviewLectureModal
