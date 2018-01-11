export const SORT_DESC = 'desc'
export const SORT_ASC = 'asc'

export const SORT_BY_DATE_DESC = { value: 'date_desc', label: 'New ones', type: SORT_DESC, field: 'timestamp' }
export const SORT_BY_DATE_ASC = { value: 'date_asc', label: 'Old ones', type: SORT_ASC, field: 'timestamp' }
export const SORT_BY_SCORE_DESC = { value: 'score_desc', label: 'High scores', type: SORT_DESC, field: 'voteScore' }
export const SORT_BY_SCORE_ASC = { value: 'score_asc', label: 'Low scores', type: SORT_ASC, field: 'voteScore' }
