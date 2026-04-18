import { useReducer, useState } from "react";
import { getUserPuuid, getUserTier } from "../api/riotApi";
import setUserTier from "../reducer/TierReducer";


function useTierFetch(gameName, tagLine) {
    const [userTier, dispatch] = useReducer(setUserTier, {
        tier: '',
        rank: '',
        leaguePoints: '',
        freshBlood: false,
        veteran: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function fetchTier(gameName, tagLine) {
        setError(false)
        try {
            setLoading(true)
            const resPuuid = await getUserPuuid(gameName, tagLine)
            const resUserTier = await getUserTier(resPuuid.puuid)
            if (resUserTier.length > 0) {
                dispatch({ type: 'SUCESS', payload: resUserTier[0] });
            } else {
                dispatch({ type: 'UNRANKED' });
            }
        } catch (e) {
            dispatch({ type: 'ERROR' });
            if (e.status === 404) {
                setError("존재하지 않는 소환사예요");
            } else if (e.status === 429) {
                setError("잠시 후 다시 시도해주세요");
            } else if (e.status === 403) {
                setError("API 키가 만료됐어요");
            } else {
                setError("알 수 없는 에러가 발생했어요");
            }
        } finally {
            setLoading(false)
        }
    }

    return { userTier, fetchTier, loading, error }
}

export default useTierFetch;