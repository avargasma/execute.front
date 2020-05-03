import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { scriptsList } from './script.reducer';
import { dataBaseList } from './database.reducers';

const rootReducer = combineReducers({
  alert,
  scriptsList,
  dataBaseList,
});

export default rootReducer;