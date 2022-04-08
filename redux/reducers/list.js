const initialState = {
    total_pages: 0,
    total_results: 0,
    results: []
}

const ListReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_LIST_MOVIE":
            // console.log('payload: ', payload?.results)
            return { ...state, results: payload?.results, total_pages: payload?.total_pages, total_results: payload?.total_results }
        default:
            return state
    }
}

export default ListReducers
