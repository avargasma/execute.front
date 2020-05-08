import { loaderConstants } from '../_constants';

export function dataLoader(state ={}, action) {
    switch (action.type) {      
        case loaderConstants.SET_DATA_LOADSCRIPTS_SUCCESS:
            return {
                dataLoaderScripts: action.dataLoadScripts
            };
        case loaderConstants.SET_DATA_EXECSRIPTS_SUCCESS:
            return {
                dataLoadExecuteScripts: action.dataLoadExecuteScripts                
            };
        default:
            return state
    }
}