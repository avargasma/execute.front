import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { scriptsList } from './script.reducer';
import { dataBaseList } from './database.reducer';
import { dataLoader } from './loader.reducer';
import { dataCompare } from './datacompare.reducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  alert,
  scriptsList,
  dataBaseList,
  dataLoader,
  dataCompare,
})
