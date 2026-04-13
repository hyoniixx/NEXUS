import { useState } from "react"

function useModal(activefunc) {
    const [isModal, setIsModal] = useState(false);

    //모달 여는 함수 
    const openModal = () => {
        setIsModal(true);
    }

    //모달 닫히는 함수
    const closeModal = () => {
        setIsModal(false);
    }

    //모달이 실행될 때 일어나는 함수
    const activeModal = () => {
        setIsModal(false);
        activefunc();
    }

    return { openModal, closeModal, activeModal, isModal }
}

export default useModal