import { institucionConstants } from '../_constants';

export function registrationinstitucion(state = {}, action) {
  switch (action.type) {
    case institucionConstants.REGISTER_REQUEST:
      return { registering: true };
    case institucionConstants.REGISTER_SUCCESS:
      return {};
    case institucionConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}