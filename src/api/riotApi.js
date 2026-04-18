const API_KEY = import.meta.env.VITE_RIOT_API_KEY

async function riotFetch(url) {
    console.log("API_KEY:", import.meta.env.VITE_RIOT_API_KEY);
    console.log("요청 URL:", `https://${url}?api_key=${API_KEY}`);

    const res = await fetch(`https://${url}?api_key=${API_KEY}`)

    if (!res.ok) {
        const err = await res.json().catch(() => { });
        const error = new Error(err?.status?.message || `HTTP ${res.status}`);
        error.status = res.status;
        throw error
    }

    return res.json();
}

{/*
    !res.ok는 정상응답이 아닌 경우에 이프문에 진입 
    await는 res.json()이 응답 body를 읽을 때까지 대기
    catch는 res.json()에서 오류가 터진 경우 빈 배열을 반환하기 위함
    return res.json()은 이 return을 받는 쪽에서 awiat를 사용해서 받기 때문에 awiat가 없음
*/}

export const getUserPuuid = (gameName, tagLine) => {
    return riotFetch(`asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
}

export const getUserTier = (puuid) => {
    return riotFetch(`kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`);
}