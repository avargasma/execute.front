import { databaseConstants } from '../_constants';

export function dataBaseList(state ={}, action) {
    switch (action.type) {      
        case databaseConstants.LOADALL_SUCCESS:
            return {
                items: action.dataBases
            };
        case databaseConstants.LOADALL_FIRST_CONN_SUCCESS:
            return {
                ...state,
                databasesFirstConnection: action.dataBases
            };
        case databaseConstants.LOADALL_SECOND_CONN_SUCCESS:
            return {
                ...state,
                databasesSecondConnection: action.dataBases
            };
        default:
            return state
    }
}