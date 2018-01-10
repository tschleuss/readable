import * as SortTypes from '../constants/sortTypes'

const parametersState = {
    sortTypes: [
        SortTypes.SORT_BY_DATE_DESC,
        SortTypes.SORT_BY_DATE_ASC,
        SortTypes.SORT_BY_SCORE_DESC,
        SortTypes.SORT_BY_SCORE_ASC
    ]
}

export const parameters = (state = parametersState, action) => {
    switch (action.type) {
        default: return { ...state }
    }
}
