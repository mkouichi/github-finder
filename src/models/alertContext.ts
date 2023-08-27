export type AlertReducerType = {
  type: string;
  msg: string;
} | null;

export type AlertContextType = {
  type?: string;
  msg?: string;
  alert: { type: string; msg: string } | null;
  setAlert: (type: string, msg: string) => void;
} | null;
