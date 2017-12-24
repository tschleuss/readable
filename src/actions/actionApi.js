import * as ReadableAPI from '../api/ReadableAPI'
import * as ActionCreators from './actionCreators'

export function getCategories() {
    return dispatch => {
        dispatch(ActionCreators.getCategories())
        return ReadableAPI.getCategories()
            .then(categories =>
                dispatch(ActionCreators.receiveCategories(categories)))
    }
}
