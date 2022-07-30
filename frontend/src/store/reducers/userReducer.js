
const initialState = 0;

export const userReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'student':
            console.log(action)
            return action.payload
        case 'tutor':
            console.log(action)
            return action.payload
        case 'admin':
            console.log(action)
            return action.payload
        default:
            return state
    }
}



export default userReducer