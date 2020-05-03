import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message.message,
        open: action.message.open
      };
    case alertConstants.ERROR:
      return {        
        type: 'alert-danger',
        message: action.message.message,
        open: action.message.open
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}