import * as SortTypes from '../constants/sortTypes'

export const simpleSortComparator = sortType => (a, b) => {
    let result = 0
    if (sortType && sortType.type === SortTypes.SORT_ASC) {
        result = a[sortType.field] - b[sortType.field]
    } else if (sortType && sortType.type === SortTypes.SORT_DESC) {
        result = b[sortType.field] - a[sortType.field]
    }
    return result
}
