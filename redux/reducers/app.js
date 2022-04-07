const app = (action, state) => {
    switch (action?.type) {
        case 'IS_LOADING_STATE':
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export default app