import { dataCompareConstants } from '../_constants';

export function dataCompare(state ={}, action) {
    switch (action.type) {      
        case dataCompareConstants.SET_FIRST_CONN_SUCCESS:
            return {                
                ...state,
                dataConnectionFirst: action.pData
            };
        case dataCompareConstants.SET_SECOND_CONN_SUCCESS:
            return {
                ...state,
                dataConnectionSecond: action.pData
            };
        case dataCompareConstants.SET_OBJCOMPARE_FIRST_CONN_SUCCESS:
            return {
                ...state,
                listObjectsCompareFirstConn: action.pData
            };
        case dataCompareConstants.SET_OBJCOMPARE_SECOND_CONN_SUCCESS:
            return {
                ...state,
                listObjectsCompareSecondConn: action.pData
            };
        default:
            return state
    }
}