import { databaseConstants } from '../_constants';

export function dataBaseList(state ={}, action) {
    switch (action.type) {      
        case databaseConstants.LOADALL_SUCCESS:
            return {
                items: action.dataBases
            };
        default:
            return state
    }
}