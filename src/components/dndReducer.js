

export const dndReducer = (state, action) => {

    switch(action.type){
        case 'DRAG_DROP':
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}