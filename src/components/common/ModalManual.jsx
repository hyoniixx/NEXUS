import Modal from './Modal';
import useModal from '../../hooks/useModal';

function ModalManual() {

    const handleConfirm1 = () => {
        console.log("확인1");
    };

    //모달을 사용하기 위한 hook 위에서 작성한 모달에서 작동할 함수를 useModal에 전달해줘야 합니다.
    //원버튼 모달일 경우 함수 넘겨줄 필요 없습니다.
    const modal = useModal();
    const modal1 = useModal(handleConfirm1);

    return (
        <div>
            {/*모달이 열려야하는 버튼에 onClick={openModal}*/}
            <button onClick={modal.openModal}>모달 열기</button>
            <button onClick={modal1.openModal}>모달 열기1</button>

            {/*isModal, closeModal, activeModal은 그대로 넘겨주시고
             title, content는 상황에 맞춰 넘겨주세요.
             type은 one(원버튼 모달), two(투버튼 모달) 두가지 중 필요한거 사용하시면 됩니다.*/}
            <Modal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='듀오 거절'
                content={`안녕하세요\n안녕히계세요`}
                type='one'
            />
            <Modal
                isModal={modal1.isModal}
                closeModal={modal1.closeModal}
                activeModal={modal1.activeModal}
                title='듀오 거절1'
                content={`안녕하세요1안녕히계세요1`}
                type='two'
            />

        </div>
    )
}

export default ModalManual
