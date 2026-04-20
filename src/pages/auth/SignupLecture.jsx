import React, { useContext, useEffect, useMemo } from 'react'
import ChangeInput from '../../components/auth/ChangeInput'
import FileInput from '../../components/auth/FileInput'
import useTierFetch from '../../hooks/useTierFetch';
import { UserFormContext } from '../../context/UserFormContext';

function SignupLecture() {

    const { userTier, fetchTier, loading, error } = useTierFetch();
    const { userInfo, dispatch } = useContext(UserFormContext)
    console.log(userInfo)
    console.log('TTTTTT', userTier);

    useEffect(() => {
        if (!userTier || !userTier.tier) return;

        ['DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'].find((tier) => userTier.tier === tier) ?
            dispatch({ type: 'CHANGEINPUT', payload: { name: 'instructorCertification', value: true } }) :
            dispatch({ type: 'CHANGEINPUT', payload: { name: 'instructorCertification', value: false } })
    }, [userTier])

    const tierBtn = useMemo(() => {
        if (userInfo.gameName.trim() && userInfo.gameTag.trim()) {
            return false;
        } else {
            return true;
        }
    }, [userInfo.gameName, userInfo.gameTag])


    return (
        <>
            <article className='a-instructor-add'>
                <h5>강사 인증 정보</h5>
                <p>강사로 활동하시려면 추가 인증이 필요합니다.</p>
            </article>
            <article className='a-instructor-first'>
                <div>
                    <ChangeInput mode='롤 게임 닉네임' message='롤 게임 닉네임을 입력해주세요.' />
                </div>
                <div>
                    <ChangeInput mode='태그라인' message='ex) kr1' />
                </div>
            </article>

            {
                userInfo.instructorCertification === 'undefined' || !userInfo.instructorCertification ?
                    <>
                        <p className='a-user-form-p'>{error || (userInfo.instructorCertification === 'undefined' ? '티어 인증을 진행해주세요.(DIAMOND 이상만 가능합니다.)' : userInfo.instructorCertification ? `인증되었습니다!` : `위 계정의 현재 티어: ${userTier.tier}`)}</p>
                        <button
                            disabled={tierBtn}
                            type='button'
                            className={
                                tierBtn ?
                                    'a-signup-btn-disabled' : 'a-signup-btn '}
                            onClick={
                                () => fetchTier(userInfo.gameName, userInfo.gameTag)}>
                            {loading ? '확인 중...' : '티어 인증'}
                        </button>
                    </>
                    :
                    <>
                        <FileInput mode='티어 인증 이미지' message='게임 내 티어를 확인할 수 있는 스크린샷을 첨부해주세요 (관리자 검토 후 승인)' />
                        <FileInput mode='프로/스트리머 인증(선택)' message='프로게이머 또는 스트리머라면 인증 자료를 첨부해주세요 (선택사항)' />
                    </>
            }

        </>
    )
}

export default SignupLecture
