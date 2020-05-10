import { dataCompareConstants } from '../_constants';

export const dataCompareActions = {
    setFirstConnection,
    setSecondConnection,
    setObjectCompareFisrtConn,
    setObjectCompareSecondConn
};

function setFirstConnection(pData) {
    return dispatch => {
        dispatch(success(pData))
    };
    function success(pData) { return { type: dataCompareConstants.SET_FIRST_CONN_SUCCESS,pData } }
}

function setSecondConnection(pData) {
    return dispatch => {
        dispatch(success(pData))
    };
    function success(pData) { return { type: dataCompareConstants.SET_SECOND_CONN_SUCCESS,pData } }
}

function setObjectCompareFisrtConn(pData) {
    return dispatch => {
        dispatch(success(pData))
    };
    function success(pData) { return { type: dataCompareConstants.SET_OBJCOMPARE_FIRST_CONN_SUCCESS,pData } }
}

function setObjectCompareSecondConn(pData) {
    return dispatch => {
        dispatch(success(pData))
    };
    function success(pData) { return { type: dataCompareConstants.SET_OBJCOMPARE_SECOND_CONN_SUCCESS,pData } }
}

