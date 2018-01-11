import * as SortTypes from '../constants/sortTypes'

export const postComparator = sortType => (a, b) => {

    const { timestamp: aTimestamp, voteScore: aVoteScore } = a
    const { timestamp: bTimestamp, voteScore: bVoteScore } = b

    switch (sortType) {
        case SortTypes.SORT_BY_DATE_ASC.value:
            return aTimestamp - bTimestamp
        case SortTypes.SORT_BY_DATE_DESC.value:
            return bTimestamp - aTimestamp
        case SortTypes.SORT_BY_SCORE_ASC.value:
            return aVoteScore - bVoteScore
        case SortTypes.SORT_BY_SCORE_DESC.value:
            return bVoteScore - aVoteScore
        default:
            return 0
    }
}

export const commentComparator = sortType => (a, b) => postComparator(sortType)(a, b)
