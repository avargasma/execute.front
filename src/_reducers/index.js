import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { scriptsList } from './script.reducer';
import { dataBaseList } from './database.reducer';
import { dataLoader } from './loader.reducer';


const rootReducer = combineReducers({
  alert,
  scriptsList,
  dataBaseList,
  dataLoader,
});

export default rootReducer;