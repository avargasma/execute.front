import { scriptConstants } from '../_constants';
import { institucionService } from '../_services';
import { alertActions } from '.';

export const scriptActions = {
    Init, 
    Add,
    Update,
};


function Init() {
    return dispatch => {
        dispatch(success())
    };
    function success() { return { type: scriptConstants.STATEINIT_SUCCESS } }
}

function Add(script) {
    return dispatch => {
        dispatch(success(script))
    };
    function success(script) { return { type: scriptConstants.ADD_SUCCESS, script } }
}

function Update(pScript) {
    return dispatch => {
        dispatch(success(pScript));
    };
    function success(pScript) { return { type: scriptConstants.UPDATE_SUCCESS, pScript }}
}