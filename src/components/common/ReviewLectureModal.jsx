import React, { useState } from 'react'
import './ReviewLectureModal.css'
import close from '../../assets/reviewModalClose.svg'
import empty from '../../assets/grayStar.svg'
import fill from '../../assets/filledStar.svg'

function ReviewLectureModal({ isModal, onClose, writer, type, before }) {
    if (!isModal) return null;
    //type : view, create, edit
    var header = '후기 조회';
    var btnColor = ['#EF4444', '#3B82F6'];
    var btnText = ["삭제", "수정"]
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

    const [star, setStar] = useState(0);
    const [text, setText] = useState(before !== '' || before !== null ? before : '')
    const handleText = (e) => {
        if (e.target.value.length <= 200) {
            setText(e.target.value)
        }
    }

    const closeModal = () => {
        setOpened(false);
    }

    return (
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
                            <p>{writer}</p>
                        </div>
                    </div>
                    <div className='review-modal-star'>
                        <p>별점</p>
                        <div className='review-modal-star-list'>
                            <img
                                src={star > 0 ? fill : empty}
                                width="32" height="32"
                                onClick={() => setStar(1)}
                            />
                            <img
                                src={star > 1 ? fill : empty}
                                width="32" height="32"
                                onClick={() => setStar(2)}
                            />
                            <img
                                src={star > 2 ? fill : empty}
                                width="32" height="32"
                                onClick={() => setStar(3)}
                            />
                            <img
                                src={star > 3 ? fill : empty}
                                width="32" height="32"
                                onClick={() => setStar(4)}
                            />
                            <img
                                src={star > 4 ? fill : empty}
                                width="32" height="32"
                                onClick={() => setStar(5)}
                            />
                            <p>{star === 0 ? '선택 안 됨' : `${star}점`}</p>
                        </div>
                    </div>
                    <div className='review-modal-content'>
                        <p>한줄평</p>
                        {type !== 'view' ? (
                            <textarea
                                value={text}
                                onChange={(e) => handleText(e)}
                                placeholder='수강평을 입력하세요'
                                rows='9'
                            >
                            </textarea>
                        ) : (
                            <div className='review-modal-content-text' style={{ height: '164.5px' }}>
                                {before}
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
                        >닫기</button>
                    ) : type === 'create' ? (
                        <>
                            <button
                                style={{ backgroundColor: btnColor[0], width: '193.293px' }}
                                onClick={onClose}
                            >취소</button>
                            <button
                                style={{ backgroundColor: btnColor[1], width: '193.293px' }}
                            >작성 완료</button>
                        </>
                    ) : (
                        <>
                            <button
                                style={{ backgroundColor: btnColor[0], width: '193.293px' }}
                                onClick={onClose}
                            >삭제</button>
                            <button
                                style={{ backgroundColor: btnColor[1], width: '193.293px' }}
                            >수정</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewLectureModal
