import { databaseConstants } from '../_constants';
import { alertActions } from '.';

export const dataBaseActions = {
    loadAll,
    loadAllFirstConnection,
    loadAllSecondConnection,
};


function loadAll(dataBases) {
    return dispatch => {
        dispatch(success(dataBases))
    };
    function success(dataBases) { return { type: databaseConstants.LOADALL_SUCCESS,dataBases } }
}

function loadAllFirstConnection(dataBases) {
    return dispatch => {
        dispatch(success(dataBases))
    };
    function success(dataBases) { return { type: databaseConstants.LOADALL_FIRST_CONN_SUCCESS,dataBases } }
}

function loadAllSecondConnection(dataBases) {
    return dispatch => {
        dispatch(success(dataBases))
    };
    function success(dataBases) { return { type: databaseConstants.LOADALL_SECOND_CONN_SUCCESS,dataBases } }
}

