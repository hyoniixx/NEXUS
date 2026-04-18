function setUserTier(userTier, action) {
    switch (action.type) {
        case 'SUCESS':
            return {
                tier: action.payload.tier,
                rank: action.payload.rank,
                leaguePoints: action.payload.leaguePoints,
                freshBlood: action.payload.freshBlood,
                veteran: action.payload.veteran
            }
        case 'ERROR':
            return {
                tier: '',
                rank: '',
                leaguePoints: '',
                freshBlood: false,
                veteran: false
            }
        case 'UNRANKED':
            return {
                ...userTier,
                tier: 'unranked',
                rank: 'unranked',
            }
    }
}

export default setUserTier;
