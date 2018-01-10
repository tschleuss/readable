import * as SortTypes from '../constants/sortTypes'

export const postComparator = sortType => (a, b) => {
    switch (sortType) {
        case SortTypes.SORT_BY_DATE_ASC.value:
            return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0
        case SortTypes.SORT_BY_DATE_DESC.value:
            return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
        case SortTypes.SORT_BY_SCORE_ASC.value:
            return a.voteScore < b.voteScore ? -1 : a.voteScore > b.voteScore ? 1 : 0
        case SortTypes.SORT_BY_SCORE_DESC.value:
            return a.voteScore > b.voteScore ? -1 : a.voteScore < b.voteScore ? 1 : 0
        default:
            return 0
    }
}
