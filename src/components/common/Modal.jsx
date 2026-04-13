import './Modal.css';

function Modal({ isModal, closeModal, activeModal, title, content, type }) {
    if (!isModal) return null;

    return (

        <section className="c-modal-background" onClick={closeModal} >
            <div className="c-modal-ct" onClick={(e) => e.stopPropagation()}>
                <article>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </article>
                <article className='c-modal-btn-ct'>
                    {type === 'two' && <button onClick={activeModal} className='c-modal-btn-yes'>예</button>}
                    <button onClick={closeModal} className='c-modal-btn-no'>{type === 'one' ? '확인' : '아니오'}</button>
                </article>
            </div>
        </section>


    )
}

export default Modal;