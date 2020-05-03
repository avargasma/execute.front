import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { scriptsList } from './script.reducer';
import { dataBaseList } from './database.reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  scriptsList,
  dataBaseList,
});

export default rootReducer;