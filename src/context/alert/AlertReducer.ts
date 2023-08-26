import { AlertReducerType } from '../../models/alertContext';

type ACTIONTYPE =
  | { type: 'SET_ALERT'; payload: AlertReducerType }
  | { type: 'REMOVE_ALERT' };

const alertReducer = (state: AlertReducerType, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
