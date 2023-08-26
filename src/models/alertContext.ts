export type AlertReducerType = {
  type?: string;
  msg?: string;
} | null;

export type AlertContextType = {
  type?: string;
  msg?: string;
  setAlert: (type: string, msg: string) => void;
} | null;
