import { loaderConstants } from '../_constants';


export const loaderActions = {
    SetLoaderLoadScripts,
    SetLoaderExecuteScripts
};


function SetLoaderLoadScripts(dataLoadScripts) {
    return dispatch => {
        dispatch(success(dataLoadScripts))
    };
    function success(dataLoadScripts) { return { type: loaderConstants.SET_DATA_LOADSCRIPTS_SUCCESS, dataLoadScripts } }
}

function SetLoaderExecuteScripts(dataLoadExecuteScripts) {
    return dispatch => {
        dispatch(success(dataLoadExecuteScripts))
    };
    function success(dataLoadExecuteScripts) { return { type: loaderConstants.SET_DATA_EXECSRIPTS_SUCCESS, dataLoadExecuteScripts } }
}