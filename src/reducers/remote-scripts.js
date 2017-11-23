const load = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_STARTED':
            return {
                script: action.name,
                loading: true,
                error: false,
                completed: false
            };

        case 'LOAD_FINISHED':
            return Object.assign({}, state, {
                loading: false,
                error: false,
                completed: true
            });

        case 'LOAD_FAILED':
            return Object.assign({}, state, {
                loading: false,
                error: true,
                completed: false
            });

        default:
            return state;
    }
};

export default load;
