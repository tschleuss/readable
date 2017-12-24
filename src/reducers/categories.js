import * as ActionTypes from '../actions/actionTypes'

const categoriesState = {
    isFetching: false,
    lastUpdated: null,
    items: []
}

export const categories = (state = categoriesState, action) => {
    switch (action.type) {
        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.RECEIVE_CATEGORIES:
            return {
                isFetching: false,
                lastUpdated: action.receivedAt,
                items: action.categories
            }

        default:
            return { ...state }
    }
}
