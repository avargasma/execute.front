import { databaseConstants } from '../_constants';
import { alertActions } from '.';

export const dataBaseActions = {
    loadAll
};


function loadAll(dataBases) {
    return dispatch => {
        dispatch(success(dataBases))
    };
    function success(dataBases) { return { type: databaseConstants.LOADALL_SUCCESS,dataBases } }
}

