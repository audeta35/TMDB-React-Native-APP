const initialState = {
    isLoading: true
}

const appReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "IS_LOADING_STATE":
            return { 
                isLoading: payload
            }
        default:
            return state
    }
}

export default appReducer
