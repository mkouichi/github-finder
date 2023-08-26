import { createContext, useReducer } from 'react';

import { AlertContextType } from '../../models/alertContext';
import alertReducer from './AlertReducer';

const AlertContext = createContext<AlertContextType>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set an alert
  const setAlert = (type: string, msg: string): void => {
    dispatch({
      type: 'SET_ALERT',
      payload: { type, msg },
    });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT' });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{ type: state?.type, msg: state?.msg, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
