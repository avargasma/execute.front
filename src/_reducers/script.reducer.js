import { scriptConstants } from '../_constants';

export function scriptsList(state ={}, action) {
    switch (action.type) {      
        case scriptConstants.STATEINIT_SUCCESS:
            return {
                items: []
            };
        case scriptConstants.ADD_SUCCESS:
            return {                
                ...state,
                items:[...state.items, action.script]
            };
        case scriptConstants.UPDATE_SUCCESS:
            return {                
                ...state,
                items: state.items.map(
                    (item, i) => i === 1 ? {...item, ErrorMessage: action.pScript.ErrorMessage}
                                            : item)};
        default:
            return state
    }
}