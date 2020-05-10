import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { scriptsList } from './script.reducer';
import { dataBaseList } from './database.reducer';
import { dataLoader } from './loader.reducer';
import { dataCompare } from './datacompare.reducer';

const rootReducer = combineReducers({
  alert,
  scriptsList,
  dataBaseList,
  dataLoader,
  dataCompare,
});

export default rootReducer;